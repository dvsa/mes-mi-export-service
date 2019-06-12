import { info } from '../../../common/application/utils/logger';
import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';

// Needs to kept in sync with the PROCESSING_STATUS table
export enum ProcessingStatus {
  Processing = 0,
  Accepted = 1,
  Failed = 2,
}

// Needs to be kept in sync with the INTERFACE_TYPE table
export enum InterfaceType {
  TARS = 0,
  RSIS = 1,
  NOTIFY = 2,
}

// Needs to be kept in sync with the UPLOAD_QUEUE table
export type UploadKey = {
  applicationReference: number,
  staffNumber: number,
  interfaceType: InterfaceType,
};

export type ResultUpload = {
  uploadKey: UploadKey,
  testResult: StandardCarTestCATBSchema,
};

export const getNextUploadBatch = async (interfaceType: InterfaceType, batchSize: number): Promise<ResultUpload[]> => {
  info(`This is where we should call getNextUpdateBatch for ${interfaceType} and ${batchSize} results`);
  // calls HTTP GET, decompresses and unmarshalls the result, return an array of test result JSON...
  const dummy: ResultUpload[] = [];

  return Promise.resolve(dummy);
};

export const updateUploadStatus = async (interfaceType: InterfaceType, key: UploadKey, status: ProcessingStatus) => {
  info(`This is where we should call updateUploadStatus for ${interfaceType} and ${key} - state is ${status}`);
};
