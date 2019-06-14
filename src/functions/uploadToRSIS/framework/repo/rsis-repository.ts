import { execute } from './database';
import { Connection } from 'oracledb';
import { DataField } from '../../domain/mi-export-data';

/**
 * Saves a test result to the RSIS MI DB, by populating a staging table.
 * @param testResult The test result to save
 */
export const saveTestResult = async (connection: Connection, mappedFields: DataField[]): Promise<void> => {

  const insertSql = `insert into dl25_holding (
    ${mappedFields.map(field => field.col).join(',')}
    ) values (
    ${mappedFields.map(_ => '?').join(',')}
    )`;

  const params = mappedFields.map(field => field.val);
  await execute(connection, insertSql, 1, params);
};
