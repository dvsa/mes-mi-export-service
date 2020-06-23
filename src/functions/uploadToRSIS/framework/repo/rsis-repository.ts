import { execute } from './database';
import { Connection } from 'oracledb';
import { DataField } from '../../domain/mi-export-data';
import { range } from 'lodash';
import { Config } from '../config/config';
import { info, error } from '@dvsa/mes-microservice-common/application/utils/logger';
import { CategoryCode } from '@dvsa/mes-test-schema/categories/common';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

/**
 * Saves a test result to the RSIS MI DB, by populating a staging table.
 * @param connection The database connection to use (``undefined`` if in mock mode)
 * @param config The app configuration to use
 * @param testResult The test result to save
 * @throws Various raw exceptions if insert error
 */
export const saveTestResult = async (
    connection: Connection | undefined,
    config: Config,
    mappedFields: DataField[],
    appRef: number,
    testCategory: CategoryCode): Promise<void> => {

  const table = getTableNameByTestCategory(testCategory);

  const insertSql = `insert into ${table} (
      ${mappedFields.map(field => field.col).join(',')}
    ) values (
      ${range(0, mappedFields.length).map(index => `:${index}`).join(',')}
    )`;

  const params = mappedFields.map(field => field.val);

  if (config.useRSIS) {
    if (connection === undefined) {
      const message = 'Not in mock mode, but connection is undefined';
      error(message);
      throw new Error(message);
    }
    // issue the SQL insert statement
    await execute(connection, insertSql, 1, appRef, params);

  } else {
    // simply log what would have happened
    info(`This is where we would be issuing the following SQL statement:\n${insertSql}\nUsing params:\n${params}`);
  }
};

export const getTableNameByTestCategory = (testCategory: CategoryCode): string => {
  const category = testCategory as TestCategory;
  return ([TestCategory.CCPC, TestCategory.DCPC].indexOf(category) >= 0 ? 'cpc4_holding' : 'dl25mes_holding');
};
