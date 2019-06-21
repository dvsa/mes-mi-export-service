import { execute } from './database';
import { Connection } from 'oracledb';
import { DataField } from '../../domain/mi-export-data';
import { range } from 'lodash';

/**
 * Saves a test result to the RSIS MI DB, by populating a staging table.
 * @param testResult The test result to save
 */
export const saveTestResult = async (connection: Connection, mappedFields: DataField[]): Promise<void> => {

  const insertSql = `insert into dl25mes_holding (
    ${mappedFields.map(field => field.col).join(',')}
    ) values (
    ${range(0, mappedFields.length).map(index => `:${index}`).join(',')}
    )`;

  const params = mappedFields.map(field => field.val);
  await execute(connection, insertSql, 1, params);
};
