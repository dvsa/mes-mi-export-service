import { info, error } from '@dvsa/mes-microservice-common/application/utils/logger';
import {
  getNextUploadBatch,
  InterfaceType,
  ProcessingStatus,
  updateUploadStatus,
  ResultUpload,
  UploadKey,
} from './result-client';
import { mapDataForMIExport, MissingTestResultDataError } from '../application/data-mapper/data-mapper';
import { Config } from '../framework/config/config';
import { createConnection } from '../framework/repo/database';
import { Connection } from 'oracledb';
import { saveTestResult } from '../framework/repo/rsis-repository';
import { formatApplicationReference } from '@dvsa/mes-microservice-common/domain/tars';

/**
 * Upload a batch of test results to RSIS MI.
 * @param config The configuration to use
 * @returns Whether the batch was able to be processed
 */
export async function uploadRSISBatch(config: Config): Promise<boolean> {
  let connection: Connection | undefined = undefined;
  let batch: ResultUpload[] | undefined = undefined;
  try {
    batch = await getNextUploadBatch(config.testResultsBaseUrl, InterfaceType.RSIS, config.batchSize);
    info('successfully read a batch of ', batch.length);

    if (batch.length > 0) {
      try {
        connection = await createConnection(config);
      } catch (err) {
        // error after reading the batch, so set all results in the batch to failed
        for (const resultUpload of batch) {
          const errorMessage = `Unable to connect to RSIS MI DB: ${JSON.stringify(err)}`;
          const completed = await updateStatus(config, resultUpload.uploadKey, ProcessingStatus.FAILED, errorMessage);
          if (!completed) {
            // abort setting the rest of failed
            return false;
          }
        }
        return true;
      }

      for (const resultUpload of batch) {
        const completed = await processResult(config, connection, resultUpload);
        if (!completed) {
          // abort the rest of the batch
          return false;
        }
      }
      info('batch processed...');

    } else {
      info('Nothing to process');
    }

  } catch (err) {
    error(err as string);
    return true;

  } finally {
    // close DB connection
    if (connection) {
      info('Closing the DB connection');
      connection.close;
    }
  }
  return true;
}

/**
 * Process a single test result, uploading to RSIS MI and setting status accordingly.
 * @param config The app config
 * @param connection The RSIS MI DB connection
 * @param resultUpload The test result
 * @returns Whether the result was able to be processed, if ``false`` then abort the rest of the batch
 */
export async function processResult(config: Config, connection: Connection | undefined, resultUpload: ResultUpload):
Promise<boolean> {
  try {
    // map MES test result to RSIS data fields
    info('Mapping data fields for ', resultUpload.uploadKey);
    const miData = mapDataForMIExport(resultUpload);

    info(`Mapped to ${miData.length} columns, saving to DB...`);

    resultUpload.testResult.journalData.applicationReference;
    const appRef = formatApplicationReference(resultUpload.testResult.journalData.applicationReference);
    const { category } = resultUpload.testResult;
    // insert into staging table and commit
    await saveTestResult(connection, config, miData, appRef, category);

    info('Save successful, setting to Accepted...');

    // update test result as accepted
    return await updateStatus(config, resultUpload.uploadKey, ProcessingStatus.ACCEPTED, null);

  } catch (err) {
    let errorMessage = null;
    if (err instanceof MissingTestResultDataError) {
      errorMessage = `Error mapping data for ${JSON.stringify(resultUpload.uploadKey)}: ${err.message}`;
    } else if (err instanceof Error) {
      errorMessage = `Error saving data for ${JSON.stringify(resultUpload.uploadKey)}: ${err.message}`;
    } else {
      errorMessage = `Error processing data for ${JSON.stringify(resultUpload.uploadKey)}: ${JSON.stringify(err)}`;
    }
    error(errorMessage);

    return await updateStatus(config, resultUpload.uploadKey, ProcessingStatus.FAILED, errorMessage);
  }
}

/**
 * Updates the status of a test result.
 * @param config The app config
 * @param uploadKey Identifies the test result
 * @param status The new status to set
 * @param errorMessage The error message to set, if any
 * @returns Whether the status was successfully updated
 */
async function updateStatus(config: Config, uploadKey: UploadKey, status: ProcessingStatus,
                            errorMessage: string | null): Promise<boolean> {
  try {
    // retry count is always zero, we never retry an RSIS DB failure
    await updateUploadStatus(config.testResultsBaseUrl, InterfaceType.RSIS, uploadKey, status, 0, errorMessage);
    return true;

  } catch (err) {
    return false;
  }
}
