import { info, error } from '../../../common/application/utils/logger';
import {
  getNextUploadBatch,
  InterfaceType,
  ProcessingStatus,
  updateUploadStatus,
} from '../application/result-client';
import { mapDataForMIExport } from '../application/data-mapper/data-mapper';

/**
 * Upload a batch of test results to RSIS MI.
 * @param batchSize The number of results to process
 */
export async function uploadRSISBatch(batchSize: number) {
  try {
    const batch = await getNextUploadBatch(InterfaceType.RSIS, 500);

    // connect to RSIS MI DB
    // if error, set all test results in the batch to failed

    for (const resultUpload of batch) {
      // map MES test result to RSIS data fields
      const miData = mapDataForMIExport(resultUpload);

      // insert into staging table and commit

      // update test result as accepted
      await updateUploadStatus(InterfaceType.RSIS, resultUpload.uploadKey, ProcessingStatus.Accepted);

      // or failed if error
      // await updateUploadStatus(InterfaceType.RSIS, resultUpload.uploadKey, ProcessingStatus.Failed);
    }

    info('batch processed...');

  } catch (err) {
    // TODO: work out error handling!
    error(err);
  }
}
