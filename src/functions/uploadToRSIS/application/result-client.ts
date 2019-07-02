import { info, error, debug } from '../../../common/application/utils/logger';
import { StandardCarTestCATBSchema, ApplicationReference } from '@dvsa/mes-test-schema/categories/B';
import axios, { AxiosError } from 'axios';
import * as zlib from 'zlib';
import { formatApplicationReference } from '../domain/tars';

// Needs to kept in sync with the PROCESSING_STATUS table
export enum ProcessingStatus {
  PROCESSING,
  ACCEPTED,
  FAILED,
}

// Needs to be kept in sync with the INTERFACE_TYPE table
export enum InterfaceType {
  TARS,
  RSIS,
  NOTIFY,
}

// Needs to be kept in sync with the UPLOAD_QUEUE table
export type UploadKey = {
  applicationReference: ApplicationReference,
  staffNumber: string,
  interfaceType: InterfaceType,
};

export type ResultUpload = {
  uploadKey: UploadKey,
  testResult: StandardCarTestCATBSchema,
};

type UpdateUploadStatusPayload = {
  staff_number: string,
  interface: InterfaceType,
  state: ProcessingStatus,
  retry_count: number,
  error_message: string | null,
};

const axiosInstance = axios.create();

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
  info(`Calling getNextUpdateBatch for ${interfaceType}, batch size of ${batchSize}`);

  const url = `${baseUrl}?interface=${interfaceType}&batch_size=${batchSize}`;
  info(`calling ${url}`);
  return new Promise((resolve, reject) => {
    const result = axiosInstance.get(url);
    result.then((response) => {
      if (!response.data) {
        debug('Empty batch returned, nothing waiting to be processed');
        resolve([]);
        return;
      }

      const resultList: ResultUpload[] = [];
      const parseResult = response.data;
      parseResult.forEach((element: string) => {
        let uncompressedResult: string = '';
        let test: StandardCarTestCATBSchema;

        try {
          uncompressedResult = zlib.gunzipSync(new Buffer(element, 'base64')).toString();
        } catch (e) {
          error(`failed decompressing test result: ${e}`);
          reject(new Error('failed decompressing test result'));
        }

        try {
          test = JSON.parse(uncompressedResult);

          // convert to a ResultUpload instance
          const resultToUpload: ResultUpload = {
            uploadKey: {
              applicationReference: test.journalData.applicationReference,
              staffNumber: test.journalData.examiner.staffNumber,
              interfaceType: InterfaceType.RSIS,
            },
            testResult: test,
          };

          resultList.push(resultToUpload);
        } catch (e) {
          error(`failed parsing test result: ${e}`);
          reject(new Error('failed parsing test result'));
        }
      });
      debug(`Batch of ${resultList.length} test results to upload`);
      resolve(resultList);
    }).catch((err) => {
      error(`Get Next Upload Batch API call error: ${err}`);
      reject(mapHTTPErrorToDomainError(err));
    });
  });
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
  info(`Calling updateUploadStatus for ${interfaceType} and ${key}, to set status to ${status}`);
  const url = `${baseUrl}/${formatApplicationReference(key.applicationReference)}/upload`;
  info(`calling ${url}`);

  const payload: UpdateUploadStatusPayload = {
    staff_number: key.staffNumber,
    interface: key.interfaceType,
    state: status,
    retry_count: retryCount,
    error_message: errorMessage && errorMessage.length > 0 ? errorMessage : null,
  };

  return new Promise((resolve, reject) => {
    const result = axiosInstance.put(url, payload);
    result.then((response) => {
      debug('Status updated');
      resolve();
    }).catch((err) => {
      error(`Update Upload Status API call error: ${err}`);
      reject(mapHTTPErrorToDomainError(err));
    });
  });
};

const mapHTTPErrorToDomainError = (err: AxiosError): Error => {
  const { request, response } = err;
  if (response) {
    return new Error(err.message);
  }
  // Request was made, but no response received
  if (request) {
    return new Error(`no response received ${err.message}`);
  }
  // Failed to setup the request
  return new Error(err.message);
};
