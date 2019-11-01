import { ResultUpload, InterfaceType } from '../../../application/result-client';
import * as commonMapper from '../common-mapper';
import * as catBMapper from '../cat-b-mapper';
import { DataField, BooleanAsNumber } from '../../../domain/mi-export-data';
import {
  formatQuestionFault,
  formatQuestionSerious,
  mapDataForMIExport,
  MissingTestResultDataError,
  formatQuestionDangerous,
  getCompetencyComments,
} from '../data-mapper';
import { cloneDeep } from 'lodash';
import { QuestionOutcome } from '@dvsa/mes-test-schema/categories/common';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';

describe('data mapper', () => {

  const minimalInput: ResultUpload = {
    uploadKey: {
      applicationReference: {
        applicationId: 2222,
        bookingSequence: 11,
        checkDigit: 3,
      },
      staffNumber: '1122',
      interfaceType: InterfaceType.RSIS,
    },
    testResult: {
      version: '0.0.1',
      category: 'B',
      rekey: false,
      changeMarker: false,
      examinerBooked: 12345678,
      examinerConducted: 12345678,
      examinerKeyed: 12345678,
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
          vehicleTypeCode: 'C',
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
    autosaved: 0, //  false
  };

  describe('mapDataForMIExport', () => {

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

  describe('formatQuestionFault', () => {
    it('Should return 0 if no faults', () => {
      testFormatQuestionFault(null, null, 0);
    });

    it('Should return 1 if one fault', () => {
      testFormatQuestionFault('DF', null, 1);
    });

    it('Should return 1 if two faults', () => {
      testFormatQuestionFault('DF', 'DF', 1);
    });

    it('Should return 1 if one fault, one pass', () => {
      testFormatQuestionFault('DF', 'P', 1);
    });

    it('Should return 1 if one fault, one dangerous', () => {
      testFormatQuestionFault('DF', 'D', 1);
    });

    it('Should return 0 if pass and serious', () => {
      testFormatQuestionFault('P', 'S', 0);
    });

    const testFormatQuestionFault = (showMeOutcome: QuestionOutcome | null,
                                     tellMeOutcome: QuestionOutcome | null,
                                     expected: BooleanAsNumber) => {
      const input = cloneDeep(minimalInput);
      if (showMeOutcome || tellMeOutcome) {
        // TODO - when new categories are added this will need refactoring
        //        to populate the different vehicle check types
        const vehicleChecks: CatBUniqueTypes.VehicleChecks = {};

        if (showMeOutcome) {
          vehicleChecks.showMeQuestion = {
            outcome: showMeOutcome,
          };
        }

        if (tellMeOutcome) {
          vehicleChecks.tellMeQuestion = {
            outcome: tellMeOutcome,
          };
        }
        input.testResult.testData = {
          vehicleChecks,
        };
      }

      expect(formatQuestionFault(input.testResult.testData)).toEqual(expected);
    };
  });

  describe('formatQuestionSerious', () => {
    it('Should return 0 if no serious', () => {
      testFormatQuestionSerious(null, null, 0);
    });

    it('Should return 1 if one serious', () => {
      testFormatQuestionSerious('S', null, 1);
    });

    it('Should return 1 if two serious', () => {
      testFormatQuestionSerious('S', 'S', 1);
    });

    it('Should return 1 if one serious, one pass', () => {
      testFormatQuestionSerious('S', 'P', 1);
    });

    it('Should return 1 if one serious, one dangerous', () => {
      testFormatQuestionSerious('S', 'D', 1);
    });

    it('Should return 0 if pass and dangerous', () => {
      testFormatQuestionSerious('P', 'D', 0);
    });

    const testFormatQuestionSerious = (showMeOutcome: QuestionOutcome | null,
                                       tellMeOutcome: QuestionOutcome | null,
                                       expected: BooleanAsNumber) => {
      const input = cloneDeep(minimalInput);
      if (showMeOutcome || tellMeOutcome) {
        // TODO - when new categories are added this will need refactoring
        //        to populate the different vehicle check types
        const vehicleChecks: CatBUniqueTypes.VehicleChecks = {};

        if (showMeOutcome) {
          vehicleChecks.showMeQuestion = {
            outcome: showMeOutcome,
          };
        }

        if (tellMeOutcome) {
          vehicleChecks.tellMeQuestion = {
            outcome: tellMeOutcome,
          };
        }
        input.testResult.testData = {
          vehicleChecks,
        };
      }

      expect(formatQuestionSerious(input.testResult.testData)).toEqual(expected);
    };
  });

  describe('formatQuestionDangerous', () => {
    it('Should return 0 if no dangerous', () => {
      testFormatQuestionDangerous(null, null, 0);
    });

    it('Should return 1 if one dangerous', () => {
      testFormatQuestionDangerous('D', null, 1);
    });

    it('Should return 1 if two dangerous', () => {
      testFormatQuestionDangerous('D', 'D', 1);
    });

    it('Should return 1 if one dangerous, one pass', () => {
      testFormatQuestionDangerous('D', 'P', 1);
    });

    it('Should return 1 if one fault, one dangerous', () => {
      testFormatQuestionDangerous('DF', 'D', 1);
    });

    it('Should return 0 if pass and serious', () => {
      testFormatQuestionDangerous('P', 'S', 0);
    });

    const testFormatQuestionDangerous = (showMeOutcome: QuestionOutcome | null,
                                         tellMeOutcome: QuestionOutcome | null,
                                         expected: BooleanAsNumber) => {
      const input = cloneDeep(minimalInput);
      if (showMeOutcome || tellMeOutcome) {
        // TODO - when new categories are added this will need refactoring
        //        to populate the different vehicle check types
        const vehicleChecks: CatBUniqueTypes.VehicleChecks = {};

        if (showMeOutcome) {
          vehicleChecks.showMeQuestion = {
            outcome: showMeOutcome,
          };
        }

        if (tellMeOutcome) {
          vehicleChecks.tellMeQuestion = {
            outcome: tellMeOutcome,
          };
        }
        input.testResult.testData = {
          vehicleChecks,
        };
      }

      expect(formatQuestionDangerous(input.testResult.testData)).toEqual(expected);
    };
  });

  describe('formatQuestionDangerous', () => {
    it('Should return the dangerous comment if set', () => {
      const input = cloneDeep(minimalInput);
      input.testResult.testData = {
        drivingFaults: {
          precautionsComments: 'Precautions fault comment',
        },
        seriousFaults: {
          precautionsComments: 'Precautions serious comment',
        },
        dangerousFaults: {
          precautionsComments: 'Precautions dangerous comment',
        },
      };

      expect(getCompetencyComments(input.testResult.testData, 'precautionsComments'))
        .toEqual('Precautions dangerous comment');
    });

    it('Should return the serious comment if set', () => {
      const input = cloneDeep(minimalInput);
      input.testResult.testData = {
        drivingFaults: {
          precautionsComments: 'Precautions fault comment',
        },
        seriousFaults: {
          precautionsComments: 'Precautions serious comment',
        },
        // no dangerous comment
      };

      expect(getCompetencyComments(input.testResult.testData, 'precautionsComments'))
        .toEqual('Precautions serious comment');
    });

    it('Should return the fault comment if set', () => {
      const input = cloneDeep(minimalInput);
      input.testResult.testData = {
        drivingFaults: {
          precautionsComments: 'Precautions fault comment',
        },
        // no serious or dangerous comment
      };

      expect(getCompetencyComments(input.testResult.testData, 'precautionsComments'))
        .toEqual('Precautions fault comment');
    });

    it('Should return null if nothing set', () => {
      const input = cloneDeep(minimalInput);
      input.testResult.testData = { }; // no fault, serious or dangerous comment

      expect(getCompetencyComments(input.testResult.testData, 'precautionsComments')).toBeNull();
    });
  });
});
