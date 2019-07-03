import { throwIfNotPresent, defaultIfNotPresent, getSecrets } from '../../../../common/framework/config/config-helpers';
import { debug } from '../../../../common/application/utils/logger';

export type Config = {
  batchSize: number;
  rsisDatabaseConnectString: string;
  rsisDatabaseUsername: string;
  rsisDatabasePassword: string;
  testResultsBaseUrl: string;
  useRSIS: boolean;
};

let configuration: Config;
export const bootstrapConfig = async (): Promise<void> => {
  const secretName = process.env.MI_EXPORT_SERVICE_SECRET_NAME;
  if (!secretName) {
    throw new Error('Environment variable RSIS_SECRET_NAME not set');
  }
  debug(`Loading secrets for ${secretName}`);
  const secrets = await getSecrets(secretName, ['USERNAME', 'PASSWORD']);

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
      secrets.get('USERNAME'),
      'rsisDatabaseUsername',
    ),
    rsisDatabasePassword: throwIfNotPresent(
      secrets.get('PASSWORD'),
      'rsisDatabasePassword',
    ),
    testResultsBaseUrl: throwIfNotPresent(
      process.env.TEST_RESULTS_BASE_URL,
      'testResultsBaseUrl',
    ),
    useRSIS: Boolean(defaultIfNotPresent(
      process.env.USE_RSIS,
      'false',
    )),
  };
};

export const config = (): Config => configuration;
