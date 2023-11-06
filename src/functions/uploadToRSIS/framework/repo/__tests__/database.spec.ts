import * as oracledb from 'oracledb';
import * as logger from '@dvsa/mes-microservice-common/application/utils/logger';
import { Config } from '../../config/config';
import {createConnection, execute} from '../database';

describe('database', () => {
  describe('createConnection', () => {
    const noRSISConfig: Config = {
      batchSize: 10,
      rsisDatabaseConnectString: 'aaa',
      rsisDatabaseUsername: 'bbb',
      rsisDatabasePassword: 'ccc',
      testResultsBaseUrl: 'ddd',
      useRSIS: false,
    };

    const useRSISConfig: Config = {
      batchSize: 10,
      rsisDatabaseConnectString: 'aaa',
      rsisDatabaseUsername: 'bbb',
      rsisDatabasePassword: 'ccc',
      testResultsBaseUrl: 'ddd',
      useRSIS: true,
    };

    it('should create the connection correctly', async () => {
      spyOn(oracledb, 'getConnection');

      await createConnection(useRSISConfig);

      expect(oracledb.getConnection as unknown as Promise<oracledb.Connection>).toHaveBeenCalledWith({
        user: 'bbb',
        password: 'ccc',
        connectString: 'aaa',
      });
    });

    it('should propogate any exceptions', async () => {
      spyOn(oracledb, 'getConnection').and.callFake(() => { throw new Error('Oops'); });

      try {
        await createConnection(useRSISConfig);
      } catch (err) {
        // expected
        expect(err).toEqual(new Error('Oops'));
      }
    });

    it('should return undefined if in stubbed mode', async () => {
      spyOn(oracledb, 'getConnection');

      const conn = await createConnection(noRSISConfig);

      expect(oracledb.getConnection).toHaveBeenCalledTimes(0);
      expect(conn).toBeUndefined();
    });
  });

  describe('execute', () => {
    let mockConnection: any;
    const sqlQuery = 'UPDATE my_table SET column = :value WHERE id = :id';
    const appRef = 123456;
    const bindValues = { value: 'newValue', id: 1 };
    const expectedRows = 1;

    beforeEach(() => {
      spyOn(logger, 'debug');
      spyOn(logger, 'error');
      mockConnection = {
        execute: jasmine.createSpy('execute').and.returnValue(Promise.resolve({ rowsAffected: expectedRows })),
      };
    });

    it('should execute the query and log the correct number of affected rows', async () => {
      await execute(mockConnection, sqlQuery, expectedRows, appRef, bindValues);

      expect(logger.debug).toHaveBeenCalledWith(`Executing statement: \n***\n${sqlQuery}\n***`);
      expect(logger.debug).toHaveBeenCalledWith(`${expectedRows} rows updated`);
      expect(mockConnection.execute).toHaveBeenCalledWith(sqlQuery, bindValues, { autoCommit: true });
    });

    it('should throw an error if the number of affected rows does not match the expected number', async () => {
      mockConnection.execute.and.returnValue(Promise.resolve({ rowsAffected: 0 }));

      try {
        await execute(mockConnection, sqlQuery, expectedRows, appRef, bindValues);
      } catch (e) {
        expect((e as Error).message).toContain('expected 1 rows to be updated, but got 0');
        expect(logger.error).toHaveBeenCalled();
      }
    });

    it('should throw and log an error when the query execution fails', async () => {
      const testError = new Error('Test Error');
      mockConnection.execute.and.returnValue(Promise.reject(testError));

      try {
        await execute(mockConnection, sqlQuery, expectedRows, appRef, bindValues);
      } catch (e) {
        expect(e).toBe(testError);
        expect(logger.error).toHaveBeenCalledWith('Failed to execute sql query with errors: ', testError);
      }
    });
  });
});
