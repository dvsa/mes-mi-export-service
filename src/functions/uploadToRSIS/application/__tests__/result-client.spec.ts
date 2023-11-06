// import {It, Mock} from 'typemoq';
// import {TestResultSchemasUnion} from '@dvsa/mes-test-schema/categories';
// import * as zlib from 'zlib';
// import {gzipSync} from 'zlib';
// import {
//   axiosInstance,
//   getNextUploadBatch,
//   InterfaceType,
//   isRecordAutosaved,
//   ProcessingStatus,
//   updateUploadStatus,
// } from '../result-client';
// import * as MockAdapter from 'axios-mock-adapter';
// import {failAllDangerous, failAllFaults, failAllSerious, pass, rekeyPass} from '../__mocks__/result-uploads.mock';
// import {ApplicationReference} from '@dvsa/mes-test-schema/categories/common';
// import moment = require('moment');
//
// describe('result-client', () => {
//   let mockAxios: MockAdapter;
//   const moqZlib = Mock.ofInstance(zlib.gunzipSync);
//
//   beforeEach(() => {
//     mockAxios = new MockAdapter(axiosInstance);
//     moqZlib
//       .setup(x => x(It.isAnyString()))
//       .returns(() => Buffer.from('hello'));
//   });
//
//   afterEach(() => {
//     moqZlib.reset();
//     mockAxios.reset();
//   });
//
//   describe('getNextUploadBatch', () => {
//     it('should handle a successful response with data', async () => {
//       mockAxios.onGet().reply(200, [
//         gzipSync(JSON.stringify(pass.testResult)),
//         gzipSync(JSON.stringify(failAllFaults.testResult)),
//         gzipSync(JSON.stringify(failAllSerious.testResult)),
//         gzipSync(JSON.stringify(failAllDangerous.testResult)),
//         gzipSync(JSON.stringify(rekeyPass.testResult)),
//       ]);
//
//       // Act
//       const result = await getNextUploadBatch('base-url', InterfaceType.RSIS, 100);
//
//       // Assert
//       expect(result).toBeDefined();
//       expect(result.length).toEqual(5);
//     });
//     it('should handle a successful response with no data', async () => {
//       mockAxios.onGet().reply(200, null);
//
//       // Act
//       const result = await getNextUploadBatch('base-url', InterfaceType.RSIS, 100);
//
//       // Assert
//       expect(result).toBeDefined();
//       expect(result.length).toEqual(0);
//     });
//     it('should handle a successful response but throw if invalid test hash', async () => {
//       mockAxios.onGet().reply(200, [
//         'invalid buffer string',
//       ]);
//
//       try {
//         // Act
//         await getNextUploadBatch('base-url', InterfaceType.RSIS, 100);
//       } catch (err) {
//         // Assert
//         expect((err as Error).message).toEqual('failed decompressing test result');
//       }
//     });
//     it('should handle a unsuccessful response', async () => {
//       mockAxios.onGet().reply(500, 'Something went horribly wrong');
//
//       // Act
//       try {
//         await getNextUploadBatch('base-url', InterfaceType.RSIS, 100);
//       } catch (err) {
//         // Assert
//         expect((err as Error).message).toEqual('"Something went horribly wrong"');
//       }
//     });
//   });
//   describe('updateUploadStatus', () => {
//     it('should resolve successfully', async () => {
//       mockAxios.onPut().reply(200, {});
//
//       await expectAsync(updateUploadStatus(
//         'base-url',
//         InterfaceType.RSIS,
//         {
//           applicationReference: {applicationId: 1, bookingSequence: 2, checkDigit: 3},
//           staffNumber: '1234567',
//           interfaceType: InterfaceType.RSIS,
//         },
//         ProcessingStatus.PROCESSING,
//         1,
//         null
//       )).toBeResolved();
//     });
//     it('should reject', async () => {
//       mockAxios.onPut().reply(500, new Error('Internal server error'));
//
//       await expectAsync(updateUploadStatus(
//         'base-url',
//         InterfaceType.RSIS,
//         {
//           applicationReference: {applicationId: 1, bookingSequence: 2, checkDigit: 3},
//           staffNumber: '1234567',
//           interfaceType: InterfaceType.RSIS,
//         },
//         ProcessingStatus.PROCESSING,
//         1,
//         null
//       )).toBeRejected();
//     });
//   });
//   describe('isRecordAutosaved', () => {
//     it('should be an autosave when test summary data not provided', () => {
//       // ARRANGE
//       const mockData: Partial<TestResultSchemasUnion> = {
//         category: 'B',
//         activityCode: '1',
//         journalData: {
//           testSlotAttributes: {
//             slotId: 12345,
//             vehicleTypeCode: 'C',
//             start: moment().subtract(15, 'days').toString(),
//             welshTest: false,
//             extendedTest: false,
//             specialNeeds: false,
//           },
//           examiner: { staffNumber: '12345' },
//           testCentre: { centreId: 1, costCode: '12345' },
//           candidate: {},
//           applicationReference: {
//             applicationId: 123,
//             bookingSequence: 1,
//             checkDigit: 2,
//           },
//         },
//         testSummary: {
//           D255: true,
//         },
//       };
//
//       // ASSERT
//       expect(isRecordAutosaved(mockData as TestResultSchemasUnion)).toBe(1);
//     });
//
//     describe('test over two weeks old', () => {
//       it('should be an autosave with test summary missing', () => {
//         const mockData: Partial<TestResultSchemasUnion> = {
//           category: 'B',
//           activityCode: '1',
//           journalData: {
//             testSlotAttributes: {
//               slotId: 12345,
//               vehicleTypeCode: 'C',
//               start: moment().subtract(15, 'days').toString(),
//               welshTest: false,
//               extendedTest: false,
//               specialNeeds: false,
//             },
//             examiner: { staffNumber: '12345' },
//             testCentre: { centreId: 1, costCode: '12345' },
//             candidate: {},
//             applicationReference: {
//               applicationId: 123,
//               bookingSequence: 1,
//               checkDigit: 2,
//             },
//           },
//           testSummary: {
//             D255: true,
//           },
//         };
//
//         // ASSERT
//         expect(isRecordAutosaved(mockData as TestResultSchemasUnion)).toBe(1);
//       });
//
//       it('should be an autosave even with test summary', () => {
//         const mockData: Partial<TestResultSchemasUnion> = {
//           category: 'B',
//           activityCode: '1',
//           journalData: {
//             testSlotAttributes: {
//               slotId: 12345,
//               vehicleTypeCode: 'C',
//               start: moment().subtract(14, 'days').format().toString(),
//               welshTest: false,
//               extendedTest: false,
//               specialNeeds: false,
//             },
//             examiner: { staffNumber: '12345' },
//             testCentre: { centreId: 1, costCode: '12345' },
//             candidate: {},
//             applicationReference: {
//               applicationId: 123,
//               bookingSequence: 1,
//               checkDigit: 2,
//             },
//           },
//           testSummary: {
//             D255: true,
//             routeNumber: 123456,
//             additionalInformation: 'Information',
//             candidateDescription: 'Tall guy',
//             independentDriving: 'Sat nav',
//             weatherConditions: ['Showers'],
//             identification: 'Licence',
//           },
//         };
//
//         // ASSERT
//         expect(isRecordAutosaved(mockData as TestResultSchemasUnion)).toBe(1);
//       });
//     });
//
//     it('should not be an autosave when route number is provided', () => {
//       // ARRANGE
//       const mockData: Partial<TestResultSchemasUnion> = {
//         category: 'B',
//         activityCode: '1',
//         journalData: {
//           testSlotAttributes: {
//             slotId: 12345,
//             vehicleTypeCode: 'C',
//             start: moment().subtract(11, 'days').toString(),
//             welshTest: false,
//             extendedTest: false,
//             specialNeeds: false,
//           },
//           examiner: { staffNumber: '12345' },
//           testCentre: { centreId: 1, costCode: '12345' },
//           candidate: {},
//           applicationReference: {
//             applicationId: 123,
//             bookingSequence: 1,
//             checkDigit: 2,
//           },
//         },
//         testSummary: {
//           D255: true,
//           routeNumber: 123456,
//           additionalInformation: 'Information',
//           candidateDescription: 'Tall guy',
//           independentDriving: 'Sat nav',
//           weatherConditions: ['Showers'],
//           identification: 'Licence',
//         },
//       };
//
//       // ASSERT
//       expect(isRecordAutosaved(mockData as TestResultSchemasUnion)).toBe(0);
//     });
//
//   });
// });
