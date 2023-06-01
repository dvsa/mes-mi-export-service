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
  formatSingleFaultOutcomeBySeverity,
  optionalIsRightBoolean,
  optionalIsLeftBoolean,
  getCatAM2SafetyAndBalanceFaultCount,
  formatMultipleManoeuvreFaults,
} from '../data-mapper';
import { cloneDeep } from 'lodash';
import { QuestionOutcome, TestData, TestResultCommonSchema } from '@dvsa/mes-test-schema/categories/common';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { getCatBMinimalInput } from './helpers/cat-b/inputs/minimal-inputs';
import { getCatAM1MinimalInput } from './helpers/cat-a-mod1/inputs/minimal-inputs';
import { getCatAM1FullyPopulatedSingleFaultCompetencies } from './helpers/cat-a-mod1/inputs/fully-populated-inputs';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import {
  TestData as CatAMod1TestData,
  TestResultCatAM1Schema,
} from '@dvsa/mes-test-schema/categories/AM1';
import { getFullyPopulatedDrivingFaults } from './helpers/cat-a-mod2/inputs/fully-populated-inputs';
import { getCatAMod2MinimalInput } from './helpers/cat-a-mod2/inputs/minimal-inputs';
import { getCatADI2MinimalInput } from './helpers/cat-adi2/inputs/minimal-inputs';
import {
  getADI2FullyPopulatedDrivingFaults,
  getADI2FullyPopulatedSeriousFaults,
  getADIFullyPopulatedDangerousFaults,
} from './helpers/cat-adi2/inputs/fully-populated-inputs';
import { CatADI2UniqueTypes } from '@dvsa/mes-test-schema/categories/ADI2';

describe('data mapper', () => {

  const minimalInput = getCatBMinimalInput();

  const catAM1MinimalInput = getCatAM1MinimalInput(TestCategory.EUAMM1);
  const catAM1InputWithSingleFaultOutcomes =
    getCatAM1FullyPopulatedSingleFaultCompetencies(catAM1MinimalInput);

  const catADI2MinimalInput = getCatADI2MinimalInput();
  const catADI2InputWithSingleFaultOutcomes =
    getADI2FullyPopulatedDrivingFaults(catADI2MinimalInput);
  const catADI2InputWithSeriousOutcomes =
    getADI2FullyPopulatedSeriousFaults(catADI2MinimalInput);
  const catADI2InputWithDangerousOutcomes =
    getADIFullyPopulatedDangerousFaults(catADI2MinimalInput);

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
      unsupportedInput.testResult.category = 'A';

      spyOn(commonMapper, 'mapCommonData').and.returnValue([] as DataField[]);
      spyOn(catBMapper, 'mapCatBData').and.returnValue([] as DataField[]);

      expect(() => mapDataForMIExport(unsupportedInput)).toThrow(new Error('Unsupported Category: A'));
    });

    it('Should propogate missing data errors', () => {
      spyOn(commonMapper, 'mapCommonData').and.returnValue([] as DataField[]);
      spyOn(catBMapper, 'mapCatBData').and.callFake(() => {
        throw new MissingTestResultDataError('dummy');
      });

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

  describe('formatMultipleManoeuvreFaults', () => {

    const singleFault = (
      catADI2InputWithSingleFaultOutcomes.testResult as TestResultCommonSchema
    ).testData as CatADI2UniqueTypes.TestData;
    const seriousFault = (
      catADI2InputWithSeriousOutcomes.testResult as TestResultCommonSchema
    ).testData as CatADI2UniqueTypes.TestData;
    const dangerousFault = (
      catADI2InputWithDangerousOutcomes.testResult as TestResultCommonSchema
    ).testData as CatADI2UniqueTypes.TestData;

    it('Should return 0 if no manoeuvres of specified type for DF', () => {
      const output = formatMultipleManoeuvreFaults(singleFault,
                                                   'reverseParkRoad.controlFault',
                                                   'DF');
      expect(output).toEqual(0);
    });

    it('Should return 1 if first manoeuvre of specified type for DF', () => {
      const output = formatMultipleManoeuvreFaults(singleFault,
                                                   'reverseLeft.controlFault',
                                                   'DF');
      expect(output).toEqual(1);
    });

    it('Should return 1 if second manoeuvre of specified type for DF', () => {
      const output = formatMultipleManoeuvreFaults(singleFault,
                                                   'reverseParkCarpark.controlFault',
                                                   'DF');
      expect(output).toEqual(1);
    });

    it('Should return 0 if no manoeuvres of specified type for S', () => {
      const output = formatMultipleManoeuvreFaults(seriousFault,
                                                   'reverseParkRoad.controlFault',
                                                   'S');
      expect(output).toEqual(0);
    });

    it('Should return 1 if a manoeuvre exists of specified type for S', () => {
      const output = formatMultipleManoeuvreFaults(seriousFault,
                                                   'reverseParkCarpark.controlFault',
                                                   'S');
      expect(output).toEqual(1);
    });

    it('Should return 0 if no manoeuvres of specified type for D', () => {
      const output = formatMultipleManoeuvreFaults(dangerousFault,
                                                   'reverseLeft.controlFault',
                                                   'D');
      expect(output).toEqual(0);
    });

    it('Should return 1 if a manoeuvre exists of specified type for D', () => {
      const output = formatMultipleManoeuvreFaults(dangerousFault,
                                                   'reverseParkCarpark.controlFault',
                                                   'D');
      expect(output).toEqual(1);
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
        ((input.testResult as TestResultCommonSchema).testData as CatBUniqueTypes.TestData) = {
          vehicleChecks,
        };
      }

      expect(formatQuestionFault((input.testResult as TestResultCommonSchema).testData as TestData))
        .toEqual(expected);
    };
  });

  describe('getCatAM2SafetyAndBalanceFaultCount', () => {
    it('should return the total number of safety and balance questions marked as riding fauls', () => {
      const testData = (
        getFullyPopulatedDrivingFaults(getCatAMod2MinimalInput()).testResult as TestResultCommonSchema
      ).testData;
      expect(getCatAM2SafetyAndBalanceFaultCount(testData as TestData)).toEqual(1);
    });
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
        ((input.testResult as TestResultCommonSchema).testData as CatBUniqueTypes.TestData) = {
          vehicleChecks,
        };
      }

      expect(formatQuestionSerious((input.testResult as TestResultCommonSchema).testData as TestData))
        .toEqual(expected);
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
        ((input.testResult as TestResultCommonSchema).testData as CatBUniqueTypes.TestData) = {
          vehicleChecks,
        };
      }

      expect(formatQuestionDangerous((input.testResult as TestResultCommonSchema).testData as TestData))
        .toEqual(expected);
    };
  });

  describe('formatQuestionDangerous', () => {
    it('Should return the dangerous comment if set', () => {
      const input = cloneDeep(minimalInput);
      (input.testResult as TestResultCommonSchema).testData = {
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

      expect(getCompetencyComments((input.testResult as TestResultCommonSchema).testData, 'precautionsComments'))
        // eslint-disable-next-line max-len
        .toEqual('Dangerous fault comment: Precautions dangerous comment, Serious fault comment: Precautions serious comment, Driving fault comment: Precautions fault comment');
    });

    it('Should return the serious comment if set', () => {
      const input = cloneDeep(minimalInput);
      (input.testResult as TestResultCommonSchema).testData = {
        drivingFaults: {
          precautionsComments: 'Precautions fault comment',
        },
        seriousFaults: {
          precautionsComments: 'Precautions serious comment',
        },
        // no dangerous comment
      };

      expect(getCompetencyComments((input.testResult as TestResultCommonSchema).testData, 'precautionsComments'))
        // eslint-disable-next-line max-len
        .toEqual('Serious fault comment: Precautions serious comment, Driving fault comment: Precautions fault comment');
    });

    it('Should return the fault comment if set', () => {
      const input = cloneDeep(minimalInput);
      (input.testResult as TestResultCommonSchema).testData = {
        drivingFaults: {
          precautionsComments: 'Precautions fault comment',
        },
        // no serious or dangerous comment
      };

      expect(getCompetencyComments((input.testResult as TestResultCommonSchema).testData, 'precautionsComments'))
        .toEqual('Driving fault comment: Precautions fault comment');
    });

    it('Should return null if nothing set', () => {
      const input = cloneDeep(minimalInput);
      (input.testResult as TestResultCommonSchema).testData = {}; // no fault, serious or dangerous comment

      expect(getCompetencyComments((input.testResult as TestResultCommonSchema).testData, 'precautionsComments'))
        .toBeNull();
    });
  });
  describe('formatSingleFaultOutcomeBySeverity', () => {
    it('should return 1 if outcome is of specified severity', () => {
      const catAM1InputWithSingleFaultOutcomes =
        getCatAM1FullyPopulatedSingleFaultCompetencies(catAM1MinimalInput);
      const input: CatAMod1TestData = cloneDeep(
        (catAM1InputWithSingleFaultOutcomes.testResult as TestResultCommonSchema).testData) as CatAMod1TestData;
      if (input.singleFaultCompetencies) {
        input.singleFaultCompetencies.useOfStand = 'D';
      }
      expect(formatSingleFaultOutcomeBySeverity(input, 'singleFaultCompetencies.useOfStand', 'D')).toEqual(1);
    });
    it('should return 0 if outcome is NOT of specified severity', () => {
      const input: CatAMod1TestData = cloneDeep(
        (catAM1InputWithSingleFaultOutcomes.testResult as TestResultCommonSchema).testData,
      ) as CatAMod1TestData;
      if (input.singleFaultCompetencies) {
        input.singleFaultCompetencies.useOfStand = 'DF';
      }
      expect(formatSingleFaultOutcomeBySeverity(input, 'singleFaultCompetencies.useOfStand', 'D')).toEqual(0);
    });
  });
  describe('optionalIsLeftBoolean', () => {
    const input: TestResultCatAM1Schema =
      cloneDeep(catAM1InputWithSingleFaultOutcomes.testResult) as TestResultCatAM1Schema;
    it('should return 1 if value is left', () => {
      if (input.testSummary) {
        input.testSummary.circuit = 'Left';
      }
      expect(optionalIsLeftBoolean(input)).toEqual(1);
    });
    it('should return 0 if value is NOT left', () => {
      if (input.testSummary) {
        input.testSummary.circuit = 'Right';
      }
      expect(optionalIsLeftBoolean(input)).toEqual(0);
    });
  });
  describe('optionalIsRightBoolean', () => {
    const input: TestResultCatAM1Schema =
      cloneDeep(catAM1InputWithSingleFaultOutcomes.testResult) as TestResultCatAM1Schema;
    it('should return 1 if value is right', () => {
      if (input.testSummary) {
        input.testSummary.circuit = 'Right';
      }
      expect(optionalIsRightBoolean(input)).toEqual(1);
    });
    it('should return 0 if value is NOT right', () => {
      input.testSummary = {};
      expect(optionalIsRightBoolean(input)).toEqual(0);
    });
  });
  describe('getCompetencyComments', () => {
    it('should concatenate a comment for a competency with all severity of faults', () => {
      const td = {
        dangerousFaults: { useOfStand: 'Very bad by candidate' },
        seriousFaults: { useOfStand: 'Very bad by candidate' },
        drivingFaults: { useOfStand: 'Very bad by candidate' },
      };
      expect(getCompetencyComments(td as TestData, 'useOfStand'))
        // eslint-disable-next-line max-len
        .toEqual('Dangerous fault comment: Very bad by candidate, Serious fault comment: Very bad by candidate, Driving fault comment: Very bad by candidate');
    });
    it('should return null when none of specified comment is found in any fault', () => {
      const td = {
        dangerousFaults: { other: '' },
        seriousFaults: { other: '' },
        drivingFaults: { other: '' },
      };
      expect(getCompetencyComments(td as TestData, 'useOfStand')).toEqual(null);
    });
    it('should return a string that has more than one fault of the same type', () => {
      const td = {
        dangerousFaults: { controlsAcceleratorComments: 'comment was written' },
        seriousFaults: {},
        drivingFaults: { controlsAcceleratorComments: 'more was detailed' },
      };
      expect(getCompetencyComments(td as TestData, 'controlsAcceleratorComments'))
        .toEqual('Dangerous fault comment: comment was written, Driving fault comment: more was detailed');
    });
    it('should return only one fault comment as only one fault type recorded against competency', () => {
      const td = {
        dangerousFaults: { controlsAcceleratorComments: 'comment was written' },
        seriousFaults: { controlsFootbrakeComments: 'poor breaking' },
        drivingFaults: { controlsAcceleratorComments: 'more was detailed' },
      };
      expect(getCompetencyComments(td as TestData, 'controlsFootbrakeComments'))
        .toEqual('Serious fault comment: poor breaking');
    });
  });
});
