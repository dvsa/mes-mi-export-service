import { saveTestResult } from '../rsis-repository';
import * as database from '../database';
import { Mock } from 'typemoq';
import { Connection } from 'oracledb';
import { DataField } from '../../../domain/mi-export-data';

describe('saveTestResult', () => {

  const inputDate = new Date('2019-01-30');
  const input: DataField[] = [
    { col: 'TEST1', val: 'dummy' },
    { col: 'TEST2', val: 1234 },
    { col: 'TEST3', val: inputDate },
  ];

  it('Should construct the insert statement correctly', async () => {
    const moqConn = Mock.ofType<Connection>();
    spyOn(database, 'execute');

    const expectedSql = 'insert into dl25mes_holding (\n    TEST1,TEST2,TEST3\n    ) values (\n    :0,:1,:2\n    )';
    const expectedValues = ['dummy', 1234, inputDate];

    await saveTestResult(moqConn.object, input);

    expect(database.execute).toHaveBeenCalledWith(moqConn.object, expectedSql, 1, expectedValues);
  });

  it('Should propogate any exceptions', async () => {
    const moqConn = Mock.ofType<Connection>();
    spyOn(database, 'execute').and.callFake(() => { throw new Error('Oops'); });

    try {
      await saveTestResult(moqConn.object, input);
      fail('Should have propogated the exception');
    } catch (err) {
      // expected
    }
  });
});
