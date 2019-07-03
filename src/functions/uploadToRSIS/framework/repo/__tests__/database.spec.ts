import * as oracledb from 'oracledb';
import { Config } from '../../config/config';
import { createConnection } from '../database';

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

  it('Should create the connection correctly', async () => {
    spyOn(oracledb, 'getConnection');

    const conn = await createConnection(useRSISConfig);

    expect(oracledb.getConnection).toHaveBeenCalled();
  });

  it('Should propogate any exceptions', async () => {
    spyOn(oracledb, 'getConnection').and.callFake(() => { throw new Error('Oops'); });

    try {
      await createConnection(useRSISConfig);
      fail('Should have propogated the exception');
    } catch (err) {
      // expected
    }
  });

  it('Should return undefined if in stubbed mode', async () => {
    spyOn(oracledb, 'getConnection');

    const conn = await createConnection(noRSISConfig);

    expect(oracledb.getConnection).toHaveBeenCalledTimes(0);
    expect(conn).toBeUndefined();
  });
});
