import { info, error, debug } from '@dvsa/mes-microservice-common/application/utils/logger';
import { ApplicationReference } from '@dvsa/mes-test-schema/categories/common';
import { TestResultSchemasUnion } from '@dvsa/mes-test-schema/categories';
import axios, { AxiosError } from 'axios';
import * as zlib from 'zlib';
import { formatApplicationReference } from '@dvsa/mes-microservice-common/domain/tars';
import { BooleanAsNumber } from '../domain/mi-export-data';
import { get } from 'lodash';
import * as moment from 'moment';

// Needs to kept in sync with the PROCESSING_STATUS table
export enum ProcessingStatus {
  PROCESSING = 'PROCESSING',
  ACCEPTED = 'ACCEPTED',
  FAILED = 'FAILED',
}

// Needs to be kept in sync with the INTERFACE_TYPE table
export enum InterfaceType {
  TARS = 'TARS',
  RSIS = 'RSIS',
  NOTIFY = 'NOTIFY',
}

// Needs to be kept in sync with the UPLOAD_QUEUE table
export type UploadKey = {
  applicationReference: ApplicationReference,
  staffNumber: string,
  interfaceType: InterfaceType,
};

export type ResultUpload = {
  uploadKey: UploadKey,
  testResult: TestResultSchemasUnion,
  autosaved: BooleanAsNumber,
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

  const url = `${baseUrl}/upload?interface=${interfaceType}&batch_size=${batchSize}`;
  debug(`calling ${url}`);
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
        let test: TestResultSchemasUnion;

        try {
          uncompressedResult = zlib.gunzipSync(Buffer.from(element, 'base64')).toString();
        } catch (e) {
          error(`failed decompressing test result: ${e}`);
          reject(new Error('failed decompressing test result'));
        }

        try {
          test = JSON.parse(uncompressedResult);

          // verify autosaved record
          const isAutosaved = isRecordAutosaved(test);

          // convert to a ResultUpload instance
          const resultToUpload: ResultUpload = {
            uploadKey: {
              applicationReference: test.journalData.applicationReference,
              staffNumber: test.journalData.examiner.staffNumber,
              interfaceType: InterfaceType.RSIS,
            },
            testResult: test,
            autosaved: isAutosaved,
          };

          resultList.push(resultToUpload);
        } catch (e) {
          error(`failed parsing test result: ${e}`);
          reject(new Error('failed parsing test result'));
        }
      });
      debug(`Received batch`);
      resolve(resultList);
    }).catch((err) => {
      const ex = mapHTTPErrorToDomainError(err);
      // tslint:disable-next-line:max-line-length
      error(`Failed to get next upload batch for interface ${interfaceType} and batch size ${batchSize} with error: `, err);
      error(ex.message);
      reject(ex);
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
  info(`Calling updateUploadStatus - status ${status} for ${interfaceType} and key ${JSON.stringify(key)}`);
  const url = `${baseUrl}/${formatApplicationReference(key.applicationReference)}/upload`;

  const payload: UpdateUploadStatusPayload = {
    staff_number: key.staffNumber,
    interface: key.interfaceType,
    state: status,
    retry_count: retryCount,
    error_message: errorMessage && errorMessage.length > 0 ? errorMessage : null,
  };

  debug(`calling ${url} with body ${JSON.stringify(payload)}`);

  return new Promise((resolve, reject) => {
    const result = axiosInstance.put(`${url}tom`, payload);
    result.then((response) => {
      debug('Status successfully updated');
      resolve();
    }).catch((err) => {
      const ex = mapHTTPErrorToDomainError(err);
      // tslint:disable-next-line:max-line-length
      error(`Failed to update upload status for app ref ${formatApplicationReference(key.applicationReference)} to status of ${status} and interface type of ${interfaceType} with upload key of ${JSON.stringify(key)}, error returned from API call is: `, err);
      reject(ex);
    });
  });
};

const mapHTTPErrorToDomainError = (err: AxiosError): Error => {
  const { request, response } = err;
  if (response) {
    return new Error(JSON.stringify(response.data));
  }
  // Request was made, but no response received
  if (request) {
    return new Error(`no response received ${err.message}`);
  }
  // Failed to setup the request
  return new Error(err.message);
};

export const isRecordAutosaved = (test: TestResultSchemasUnion): BooleanAsNumber => {
  const testDate = moment(new Date(test.journalData.testSlotAttributes.start));

  // Two weeks or older is always flagged as autosave
  if (moment().diff(testDate, 'days') >= 14) {
    return 1;
  }

  // We assume that when these properties are null then the test is autosaved
  return (
      get(test, 'testSummary.candidateDescription', false) &&
      get(test, 'testSummary.identification', false) &&
      get(test, 'testSummary.independentDriving', false) &&
      get(test, 'testSummary.routeNumber', false) &&
      get(test, 'testSummary.weatherConditions', false)
  ) ? 0 : 1;
};
