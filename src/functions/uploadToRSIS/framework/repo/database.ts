import { Connection, getConnection } from 'oracledb';
import { debug, info, error } from '@dvsa/mes-microservice-common/application/utils/logger';
import { Config } from '../config/config';

/**
 * Create a new database connection.
 * @param config The RSIS DB config to use
 * @returns The connection, or ``undefined`` if in mock mode
 * @throws Various errors that must be caught and logged
 */
export const createConnection = async (config: Config): Promise<Connection | undefined> => {
  if (config.useRSIS) {
    const connectionString = config.rsisDatabaseConnectString;
    info('Opening database connection to ', connectionString);

    let connection: Connection;

    try {
      connection = await getConnection({
        user: config.rsisDatabaseUsername,
        password: config.rsisDatabasePassword,
        connectString: connectionString,
      });
      info('Connection successfully created');
    } catch (err) {
      error(`Failed to connect to RSIS DB using connection string ${connectionString} with error: `, err);
      throw err;
    }
    return connection;
  }
  debug('In mock mode');
  return undefined;
};

/**
 * Executes a SQL statement (e.g. an insert or update). Auto-Commit mode is set to true.
 * @param connection   The Connection to use
 * @param sqlQuery    The SQL update to run
 * @param expectedRows The number of rows that should be updated
 * @param appRef The app ref of the test
 * @param bindValues   The bind variables values
 * @throws Various errors that must be caught and logged, including if expected rows proved to be different
 */
export const execute = async (
  connection: Connection,
  sqlQuery: string,
  expectedRows: number,
  appRef: number,
  bindValues?: any,
): Promise<void> => {
  debug(`Executing statement: \n***\n${sqlQuery}\n***`);

  let result;
  try {
    result = await connection.execute(sqlQuery, bindValues || {}, { autoCommit: true });

    debug(`${result.rowsAffected} rows updated`);

    if (result.rowsAffected !== expectedRows) {
      const err = `Error executing SQL query, expected ${expectedRows} rows ` +
        `to be updated, but got ${result.rowsAffected}, with app ref of ${appRef}`;
      throw new Error(err);
    }
  } catch (err) {
    error('Failed to execute sql query with errors: ', err);
    throw(err);
  }
};
