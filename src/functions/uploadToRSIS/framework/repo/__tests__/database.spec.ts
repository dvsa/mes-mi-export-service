import * as oracledb from 'oracledb';
import { Config } from '../../config/config';
import { createConnection } from '../database';

describe.only('createConnection', () => {

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
    jest.spyOn(oracledb, 'getConnection').mockImplementation(() => Promise.resolve({} as oracledb.Connection));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Should create the connection correctly', async () => {
    await createConnection(useRSISConfig);

    expect(oracledb.getConnection as unknown as Promise<oracledb.Connection>).toHaveBeenCalledWith({
      user: 'bbb',
      password: 'ccc',
      connectString: 'aaa',
    });
  });

  it('Should propogate any exceptions', async () => {
    jest.spyOn(oracledb, 'getConnection').mockImplementation(() => { throw new Error('Oops'); });

    try {
      await createConnection(useRSISConfig);
      fail('Should have propogated the exception');
    } catch (err) {
      // expected
    }
  });

  it('Should return undefined if in stubbed mode', async () => {
    const conn = await createConnection(noRSISConfig);

    expect(oracledb.getConnection).toHaveBeenCalledTimes(0);
    expect(conn).toBeUndefined();
  });
});
