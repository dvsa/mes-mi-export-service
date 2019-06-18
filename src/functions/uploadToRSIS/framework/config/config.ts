import { throwIfNotPresent } from '../../../../common/framework/config/config-helpers';

export type Config = {
  rsisDatabaseHostname: string;
  rsisDatabaseUsername: string;
  rsisDatabasePassword: string;
};

let configuration: Config;
export const bootstrapConfig = async (): Promise<void> => {
  configuration = {
    rsisDatabaseHostname: throwIfNotPresent(
      process.env.RSIS_DB_HOST_NAME,
      'rsisDatabaseHostname',
    ),
    rsisDatabaseUsername: throwIfNotPresent(
      process.env.RSIS_DB_USERNAME,
      'rsisDatabaseUsername',
    ),
    rsisDatabasePassword: throwIfNotPresent(
      process.env.RSIS_DB_PASSWORD,
      'rsisDatabasePassword',
    ),
  };
};

export const config = (): Config => configuration;
