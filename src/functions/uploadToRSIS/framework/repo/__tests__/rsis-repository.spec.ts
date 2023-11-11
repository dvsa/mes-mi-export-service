import { getTableNameByTestCategory, saveTestResult } from '../rsis-repository';
import * as database from '../database';
import * as logger from '@dvsa/mes-microservice-common/application/utils/logger';
import { Mock } from 'typemoq';
import { Connection } from 'oracledb';
import { DataField } from '../../../domain/mi-export-data';
import { Config } from '../../config/config';

describe('saveTestResult', () => {

  const inputDate = new Date('2019-01-30');
  const input: DataField[] = [
    { col: 'TEST1', val: 'dummy' },
    { col: 'TEST2', val: 1234 },
    { col: 'TEST3', val: inputDate },
  ];

  const appRef = 1234;

  const category = 'B';

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

  beforeEach(() => {
    jest.spyOn(database, 'execute').mockImplementation(() => Promise.resolve());
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Should construct the insert statement correctly', async () => {
    const moqConn = Mock.ofType<Connection>();

    const expectedSql = `insert into dl25mes_holding (
      TEST1,TEST2,TEST3
    ) values (
      :0,:1,:2
    )`;
    const expectedValues = ['dummy', appRef, inputDate];

    await saveTestResult(moqConn.object, useRSISConfig, input, appRef, category);

    expect(database.execute).toHaveBeenCalledWith(moqConn.object, expectedSql, 1, appRef, expectedValues);
  });

  it('Should propagate any exceptions', async () => {
    const moqConn = Mock.ofType<Connection>();
    jest.spyOn(database, 'execute').mockImplementation(() => { throw new Error('Oops'); });

    try {
      await saveTestResult(moqConn.object, useRSISConfig, input, appRef, category);
      fail('Should have propogated the exception');
    } catch (err) {
      // expected
    }
  });

  it('Should catch if connection is undefined', async () => {
    try {
      await saveTestResult(undefined, useRSISConfig, input, appRef, category);
      fail('Should have propogated the exception');
    } catch (err) {
      // expected
    }

    expect(database.execute).toHaveBeenCalledTimes(0);
  });

  it('Should just log the SQL if in stubbed mode', async () => {
    const moqConn = Mock.ofType<Connection>();
    jest.spyOn(logger, 'info');

    await saveTestResult(moqConn.object, noRSISConfig, input, appRef, category);

    expect(database.execute).toHaveBeenCalledTimes(0);
    expect(logger.info).toHaveBeenCalledWith(
      expect.stringMatching(/^This is where we would be issuing the following SQL statement:*/));
  });
});

describe('getTableNameByTestCategory', () => {
  it('should return the correct table for a CCPC test', () => {
    const table = getTableNameByTestCategory('CCPC');
    expect(table).toEqual('cpc4_holding');
  });
  it('should return the correct table for a DCPC test', () => {
    const table = getTableNameByTestCategory('DCPC');
    expect(table).toEqual('cpc4_holding');
  });
  it('should return the correct table for ADI3', () => {
    const table = getTableNameByTestCategory('ADI3');
    expect(table).toEqual('adi3_holding');
  });
  it('should return the correct table for other tests', () => {
    const table = getTableNameByTestCategory('B');
    expect(table).toEqual('dl25mes_holding');
  });
});
