import { throwIfNotPresent, defaultIfNotPresent } from '../../../../common/framework/config/config-helpers';

export type Config = {
  batchSize: number;
  rsisDatabaseConnectString: string;
  rsisDatabaseUsername: string;
  getNextBatchUrl: string;
  updateUploadStatusUrl: string;
};

let configuration: Config;
export const bootstrapConfig = async (): Promise<void> => {
  configuration = {
    batchSize: Number(defaultIfNotPresent(
      process.env.BATCH_SIZE,
      '500',
    )),
    rsisDatabaseConnectString: throwIfNotPresent(
      process.env.RSIS_DB_ORACLE_EASY_CONNECT,
      'rsisDatabaseConnectString',
    ),
    rsisDatabaseUsername: throwIfNotPresent(
      process.env.RSIS_DB_USERNAME,
      'rsisDatabaseUsername',
    ),
    getNextBatchUrl: throwIfNotPresent(
      process.env.TEST_RESULT_ENDPOINT,
      'getNextBatchUrl',
    ),
    updateUploadStatusUrl: throwIfNotPresent(
      process.env.OUTCOME_REPORTING_URL_TEMPLATE,
      'updateUploadStatusUrl',
    ),
  };
};

export const config = (): Config => configuration;
