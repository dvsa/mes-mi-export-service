// In order to use this mock just swap the imports in the batch-processor.ts
// and import everything from here.

// This code has some mock data for test results so that the lambda does not have to fetch
// the test results externally

import { info } from '@dvsa/mes-microservice-common/application/utils/logger';
import { ProcessingStatus, InterfaceType, UploadKey, ResultUpload } from '../result-client';
import { pass, failAllFaults, failAllSerious, failAllDangerous, rekeyPass } from './result-uploads.mock';

/**
 * Call the Get Next Upload Batch API, for the specified interface.
 * @param baseUrl The base of the API URL
 * @param interfaceType The type of interface being processed
 * @param batchSize The maximum number of test results to return
 * @returns A list of test results to upload, possibly empty
 * @throws Error API call failed
 */
export const getNextUploadBatch = async (baseUrl: string, interfaceType: InterfaceType, batchSize: number):
    Promise<ResultUpload[]> => {
  info(`STUBBED: Calling getNextUpdateBatch for ${interfaceType}, batch size of ${batchSize}`);

  const batch: ResultUpload[] = [
    pass, failAllFaults, failAllSerious, failAllDangerous, rekeyPass,
    pass, failAllFaults, failAllSerious, failAllDangerous, rekeyPass,
    pass, failAllFaults, failAllSerious, failAllDangerous, rekeyPass,
    pass, failAllFaults, failAllSerious, failAllDangerous, rekeyPass,
    pass, failAllFaults, failAllSerious, failAllDangerous, rekeyPass,
    pass, failAllFaults, failAllSerious, failAllDangerous, rekeyPass,
    pass, failAllFaults, failAllSerious, failAllDangerous, rekeyPass,
    pass, failAllFaults, failAllSerious, failAllDangerous, rekeyPass,
    pass, failAllFaults, failAllSerious, failAllDangerous, rekeyPass,
    pass, failAllFaults, failAllSerious, failAllDangerous, rekeyPass,
  ];
  return Promise.resolve(batch);
};

/**
 * Call the Update Upload Status API, for the specified test result.
 * @param baseUrl The base of the API URL
 * @param interfaceType The type of interface being uploaded
 * @param key The primary key of the upload record
 * @param status The new status to set
 * @param retryCount The number of times upload has been retried
 * @param errorMessage The latest error message (if any)
 * @throws Error API call failed
 */
export const updateUploadStatus = async (baseUrl: string, interfaceType: InterfaceType, key: UploadKey,
                                         status: ProcessingStatus, retryCount: number, errorMessage: string | null) => {
  info(`STUBBED: Calling updateUploadStatus for ${interfaceType} and ${key}, to set status to ${status}`);
};
