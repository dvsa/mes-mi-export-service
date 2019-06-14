import { ResultUpload, InterfaceType } from '../../../application/result-client';
import * as commonMapper from '../common-mapper';
import * as catBMapper from '../cat-b-mapper';
import { DataField } from '../../../domain/mi-export-data';
import { mapDataForMIExport, MissingTestResultDataError } from '../data-mapper';
import { cloneDeep } from 'lodash';

describe('mapDataForMIExport', () => {

  const minimalInput: ResultUpload = {
    uploadKey: {
      applicationReference: 2222113,
      staffNumber: 1122,
      interfaceType: InterfaceType.RSIS,
    },
    testResult: {
      category: 'B',
      id: 'TBC',
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
        candidate: {
          candidateId: 1111,
        },
        applicationReference: {
          applicationId: 2222,
          bookingSequence: 11,
          checkDigit: 3,
        },
      },
      activityCode: '1',
    },
  };

  it('Should invoke both dummy mappers for a cat B test', () => {
    const dummyCommonMapping: DataField[] = [
      { col: 'COMMON1', val: 1234 },
    ];

    const dummyCatBMapping: DataField[] = [
      { col: 'CATB1', val: 'wibble' },
    ];

    spyOn(commonMapper, 'mapCommonData').and.returnValue(dummyCommonMapping);
    spyOn(catBMapper, 'mapCatBData').and.returnValue(dummyCatBMapping);

    const mapping = mapDataForMIExport(minimalInput);
    const expected: DataField[] = [
      { col: 'COMMON1', val: 1234 },
      { col: 'CATB1', val: 'wibble' },
    ];

    expect(mapping).toEqual(expected);
  });

  it('Should reject unsupported categories', () => {
    // Note: update this test as we deliver support for more test categories!
    const unsupportedInput = cloneDeep(minimalInput);
    unsupportedInput.testResult.category = 'B+E';

    spyOn(commonMapper, 'mapCommonData').and.returnValue([] as DataField[]);
    spyOn(catBMapper, 'mapCatBData').and.returnValue([] as DataField[]);

    expect(() => mapDataForMIExport(unsupportedInput)).toThrow(new Error('Unsupported Category: B+E'));
  });

  it('Should propogate missing data errors', () => {
    spyOn(commonMapper, 'mapCommonData').and.returnValue([] as DataField[]);
    spyOn(catBMapper, 'mapCatBData').and.callFake(() => { throw new MissingTestResultDataError('dummy'); });

    expect(() => mapDataForMIExport(minimalInput)).toThrow(new MissingTestResultDataError('dummy'));
  });

  it('Should catch if the same fields are mapped by multiple mappers', () => {
    // Note: this is a unit test to catch human error when maintaining the data mappers...
    const dummyCommonMapping: DataField[] = [
      { col: 'COL1', val: 1234 },
      { col: 'COL2', val: 'aaa' },
    ];

    const dummyCatBMapping: DataField[] = [
      { col: 'COL1', val: 'wibble' },
      { col: 'COL2', val: 5678 },
    ];

    spyOn(commonMapper, 'mapCommonData').and.returnValue(dummyCommonMapping);
    spyOn(catBMapper, 'mapCatBData').and.returnValue(dummyCatBMapping);

    expect(() => mapDataForMIExport(minimalInput)).toThrow(new Error('Duplicate columns mapped: COL1, COL2'));
  });
});
