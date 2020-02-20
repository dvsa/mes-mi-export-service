import { saveTestResult } from '../rsis-repository';
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

  it('Should construct the insert statement correctly', async () => {
    const moqConn = Mock.ofType<Connection>();
    spyOn(database, 'execute');

    const expectedSql = `insert into dl25mes_holding (
      TEST1,TEST2,TEST3
    ) values (
      :0,:1,:2
    )`;
    const expectedValues = ['dummy', 1234, inputDate];

    await saveTestResult(moqConn.object, useRSISConfig, input, 1234);

    expect(database.execute).toHaveBeenCalledWith(moqConn.object, expectedSql, 1, 1234, expectedValues);
  });

  it('Should propogate any exceptions', async () => {
    const moqConn = Mock.ofType<Connection>();
    spyOn(database, 'execute').and.callFake(() => { throw new Error('Oops'); });

    try {
      await saveTestResult(moqConn.object, useRSISConfig, input, 1234);
      fail('Should have propogated the exception');
    } catch (err) {
      // expected
    }
  });

  it('Should catch if connection is undefined', async () => {
    const moqConn = Mock.ofType<Connection>();
    spyOn(database, 'execute');

    try {
      await saveTestResult(undefined, useRSISConfig, input, 1234);
      fail('Should have propogated the exception');
    } catch (err) {
      // expected
    }

    expect(database.execute).toHaveBeenCalledTimes(0);
  });

  it('Should just log the SQL if in stubbed mode', async () => {
    const moqConn = Mock.ofType<Connection>();
    spyOn(database, 'execute');
    spyOn(logger, 'info');

    await saveTestResult(moqConn.object, noRSISConfig, input, 1234);

    expect(database.execute).toHaveBeenCalledTimes(0);
    expect(logger.info).toHaveBeenCalledWith(
      jasmine.stringMatching(/^This is where we would be issuing the following SQL statement:*/));
  });
});
