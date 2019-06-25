import { info, error } from '../../../common/application/utils/logger';
import {
  getNextUploadBatch,
  InterfaceType,
  ProcessingStatus,
  updateUploadStatus,
  ResultUpload,
  UploadKey,
} from '../application/result-client';
import { mapDataForMIExport } from '../application/data-mapper/data-mapper';
import { Config } from '../framework/config/config';
import { createConnection } from '../framework/repo/database';
import { Connection } from 'oracledb';
import { saveTestResult } from '../framework/repo/rsis-repository';

/**
 * Upload a batch of test results to RSIS MI.
 * @param config The configuration to use
 * @returns Whether the batch was able to be processed, if ``false`` then fail the Lambda execution.
 */
export async function uploadRSISBatch(config: Config): Promise<boolean> {
  let connection: Connection | undefined = undefined;
  let batch: ResultUpload[] | undefined = undefined;
  try {
    batch = await getNextUploadBatch(InterfaceType.RSIS, config.batchSize);
    // if error, return failure
    info(`successfully read a batch of ${batch.length}`);

    try {
      connection = await createConnection(config);
    } catch (err) {
      error(err);

      // error after reading the batch, so set all results in the batch to failed
      for (const resultUpload of batch) {
        const completed = await updateStatus(resultUpload.uploadKey, ProcessingStatus.Failed);
        if (!completed) {
          // abort setting the rest of failed
          error('error processing, so aborting the batch');
          return false;
        }
      }
      return true;
    }

    for (const resultUpload of batch) {
      const completed = await processResult(connection, resultUpload);
      if (!completed) {
        // abort the rest of the batch
        error('error processing, so aborting the batch');
        return false;
      }
    }
    info('batch processed...');

  } catch (err) {
    error(err);
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
 * @param connection The RSIS MI DB connection
 * @param resultUpload The test result
 * @returns Whether the result was able to be processed, if ``false`` then abort the rest of the batch
 */
export async function processResult(connection: Connection, resultUpload: ResultUpload): Promise<boolean> {
  try {
    // map MES test result to RSIS data fields
    info(`Mapping data fields for ${JSON.stringify(resultUpload.uploadKey)}`);
    const miData = mapDataForMIExport(resultUpload);

    info(`Mapped to ${miData.length} columns, saving to DB...`);

    // insert into staging table and commit
    await saveTestResult(connection, miData);

    info(`Save successful, setting to Accepted...`);

    // update test result as accepted
    return await updateStatus(resultUpload.uploadKey, ProcessingStatus.Accepted);

  } catch (err) {
    error(err);
    info(`Save error, setting to Failed...`);

    // mapping or upload error, so update test result as failed
    return await updateStatus(resultUpload.uploadKey, ProcessingStatus.Failed);
  }
}

/**
 * Updates the status of a test result.
 * @param uploadKey Identifies the test result
 * @param status The new status to set
 * @returns Whether the status was successfully updated
 */
async function updateStatus(uploadKey: UploadKey, status: ProcessingStatus): Promise<boolean> {
  try {
    await updateUploadStatus(InterfaceType.RSIS, uploadKey, status);
    return true;

  } catch (err) {
    const message = `Error updating status to ${status} for result ${JSON.stringify(uploadKey)}`;
    error(message);
    return false;
  }
}
