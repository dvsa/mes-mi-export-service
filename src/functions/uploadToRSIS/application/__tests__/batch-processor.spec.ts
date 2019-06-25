import * as repository from '../../framework/repo/rsis-repository';
import * as dataMapper from '../../application/data-mapper/data-mapper';
import * as resultClient from '../../application/result-client';
import * as database from '../../framework/repo/database';
import { Mock } from 'typemoq';
import { Connection } from 'oracledb';
import { processResult, uploadRSISBatch } from '../batch-processor';
import { Config } from '../../framework/config/config';

describe('batch-processor', () => {

  const dummyKey1: resultClient.UploadKey = {
    interfaceType: resultClient.InterfaceType.RSIS,
    applicationReference: 1234,
    staffNumber: 4321,
  };

  const dummyResult1: resultClient.ResultUpload = {
    uploadKey: dummyKey1,
    testResult: {
      category: 'B',
      journalData: {
        examiner: {
          staffNumber: '001122',
        },
        testCentre: {
          centreId: 1234,
          costCode: 'CC1',
        },
        testSlotAttributes: {
          slotId: 1234,
          start: '2019-06-10T09:30:00',
          vehicleSlotType: 'B57mins',
          welshTest: false,
          specialNeeds: false,
          extendedTest: false,
        },
        candidate: { },
        applicationReference: {
          applicationId: 2222,
          bookingSequence: 11,
          checkDigit: 3,
        },
      },
      activityCode: '1',
    },
  };

  const dummyConfig: Config = {
    batchSize: 10,
    rsisDatabaseConnectString: 'aaa',
    rsisDatabaseUsername: 'bbb',
    getNextBatchUrl: 'ccc',
    updateUploadStatusUrl: 'ddd',
  };

  const moqConn = Mock.ofType<Connection>();

  describe('upload-result', () => {
    it('Should process a successful batch of 1', async () => {
      spyOn(resultClient, 'getNextUploadBatch').and.returnValue([dummyResult1]);
      spyOn(database, 'createConnection').and.returnValue(moqConn);
      spyOn(dataMapper, 'mapDataForMIExport').and.returnValue([]);
      spyOn(repository, 'saveTestResult');
      spyOn(resultClient, 'updateUploadStatus');

      const result = await uploadRSISBatch(dummyConfig);
      expect(result).toBe(true); // processed successfully
      expect(repository.saveTestResult).toHaveBeenCalledTimes(1);
      expect(resultClient.updateUploadStatus).toHaveBeenCalledTimes(1);
    });

    it('Should process a successful batch of 3', async () => {
      spyOn(resultClient, 'getNextUploadBatch').and.returnValue([dummyResult1, dummyResult1, dummyResult1]);
      spyOn(database, 'createConnection').and.returnValue(moqConn);
      spyOn(dataMapper, 'mapDataForMIExport').and.returnValue([]);
      spyOn(repository, 'saveTestResult');
      spyOn(resultClient, 'updateUploadStatus');

      const result = await uploadRSISBatch(dummyConfig);
      expect(result).toBe(true); // processed successfully
      expect(repository.saveTestResult).toHaveBeenCalledTimes(3);
      expect(resultClient.updateUploadStatus).toHaveBeenCalledTimes(3);
    });

    it('Should abort a batch if uanble to update status', async () => {
      spyOn(resultClient, 'getNextUploadBatch').and.returnValue([dummyResult1, dummyResult1, dummyResult1]);
      spyOn(database, 'createConnection').and.returnValue(moqConn);
      spyOn(dataMapper, 'mapDataForMIExport').and.returnValue([]);
      spyOn(repository, 'saveTestResult');
      spyOn(resultClient, 'updateUploadStatus').and.throwError('oops');

      const result = await uploadRSISBatch(dummyConfig);
      expect(result).toBe(false); // processed unsuccessfully
      expect(repository.saveTestResult).toHaveBeenCalledTimes(1); // only once, rest of batch aborted
      expect(resultClient.updateUploadStatus).toHaveBeenCalledTimes(1); // only once, rest of batch aborted
    });

    it('Should set whole batch to failed if uanble to connect to DB', async () => {
      spyOn(resultClient, 'getNextUploadBatch').and.returnValue([dummyResult1, dummyResult1, dummyResult1]);
      spyOn(database, 'createConnection').and.throwError('oops');
      spyOn(dataMapper, 'mapDataForMIExport').and.returnValue([]);
      spyOn(repository, 'saveTestResult');
      spyOn(resultClient, 'updateUploadStatus');

      const result = await uploadRSISBatch(dummyConfig);
      expect(result).toBe(true); // processed successfully
      expect(repository.saveTestResult).toHaveBeenCalledTimes(0); // never called
      expect(resultClient.updateUploadStatus).toHaveBeenCalledTimes(3); // called for whole batch
    });

    it('Should abort if unable to set whole batch to failed after uanble to connect to DB', async () => {
      spyOn(resultClient, 'getNextUploadBatch').and.returnValue([dummyResult1, dummyResult1, dummyResult1]);
      spyOn(database, 'createConnection').and.throwError('oops');
      spyOn(dataMapper, 'mapDataForMIExport').and.returnValue([]);
      spyOn(repository, 'saveTestResult');
      spyOn(resultClient, 'updateUploadStatus').and.throwError('oops');

      const result = await uploadRSISBatch(dummyConfig);
      expect(result).toBe(false); // processed unsuccessfully
      expect(repository.saveTestResult).toHaveBeenCalledTimes(0); // never called
      expect(resultClient.updateUploadStatus).toHaveBeenCalledTimes(1); // only once, rest of batch aborted
    });
  });

  describe('upload-result', () => {
    it('Should set successful mapping and upload to accepted', async () => {
      spyOn(dataMapper, 'mapDataForMIExport').and.returnValue([]);
      spyOn(repository, 'saveTestResult');
      spyOn(resultClient, 'updateUploadStatus');

      const result = await processResult(moqConn.object, dummyResult1);
      expect(result).toBe(true); // processed successfully
      expect(dataMapper.mapDataForMIExport).toHaveBeenCalled();
      expect(repository.saveTestResult).toHaveBeenCalled();
      expect(resultClient.updateUploadStatus).toHaveBeenCalledWith(resultClient.InterfaceType.RSIS,
                                                                   dummyKey1,
                                                                   resultClient.ProcessingStatus.Accepted);
    });

    it('Should set upload error to failed', async () => {
      spyOn(dataMapper, 'mapDataForMIExport').and.returnValue([]);
      spyOn(repository, 'saveTestResult').and.throwError('Oops');
      spyOn(resultClient, 'updateUploadStatus');

      const result = await processResult(moqConn.object, dummyResult1);
      expect(result).toBe(true); // processed successfully
      expect(dataMapper.mapDataForMIExport).toHaveBeenCalled();
      expect(repository.saveTestResult).toHaveBeenCalled();
      expect(resultClient.updateUploadStatus).toHaveBeenCalledWith(resultClient.InterfaceType.RSIS,
                                                                   dummyKey1,
                                                                   resultClient.ProcessingStatus.Failed);
    });

    it('Should set mapping error to failed', async () => {
      spyOn(dataMapper, 'mapDataForMIExport')
        .and.callFake(() => { throw new dataMapper.MissingTestResultDataError('oops'); });
      spyOn(repository, 'saveTestResult');
      spyOn(resultClient, 'updateUploadStatus');

      const result = await processResult(moqConn.object, dummyResult1);
      expect(result).toBe(true); // processed successfully
      expect(dataMapper.mapDataForMIExport).toHaveBeenCalled();
      expect(repository.saveTestResult).toHaveBeenCalledTimes(0); // not called
      expect(resultClient.updateUploadStatus).toHaveBeenCalledWith(resultClient.InterfaceType.RSIS,
                                                                   dummyKey1,
                                                                   resultClient.ProcessingStatus.Failed);
    });

    it('Should abort batch if update status fails', async () => {
      spyOn(dataMapper, 'mapDataForMIExport').and.returnValue([]);
      spyOn(repository, 'saveTestResult');
      spyOn(resultClient, 'updateUploadStatus').and.throwError('oops');

      const result = await processResult(moqConn.object, dummyResult1);
      expect(result).toBe(false); // abort batch
      expect(dataMapper.mapDataForMIExport).toHaveBeenCalled();
      expect(repository.saveTestResult).toHaveBeenCalled();
      expect(resultClient.updateUploadStatus).toHaveBeenCalledWith(resultClient.InterfaceType.RSIS,
                                                                   dummyKey1,
                                                                   resultClient.ProcessingStatus.Accepted);
    });
  });
});
