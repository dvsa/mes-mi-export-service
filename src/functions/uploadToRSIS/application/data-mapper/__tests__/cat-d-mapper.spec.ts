import { DataField } from '../../../domain/mi-export-data';
import { mapCatDData } from '../cat-d-mapper';
import { getPcvDoorExerciseCompetencyComments } from '../cat-d-common-mapper';
import { getMinimalInput, getMinimalInputWithPassCompletion } from '../__mocks__/cat-d/inputs/minimal-inputs';
import {
  getFullyPopulatedDrivingFaults,
  getFullyPopulatedSeriousFaults,
  getFullyPopulatedDangerousFaults, getFullyPopulatedDelegatedTest,
} from '../__mocks__/cat-d/inputs/fully-populated-inputs';
import {
  getCatDFullyPopulatedSeriousDataFields,
  getCatDFullyPopulatedDangerousDataFields, getCatDFullyPopulatedDrivingDataFields, getCatDFullyPopulatedDelegatedTest,
} from '../__mocks__/cat-d/data-fields/fully-populated-data-fields';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { CatDUniqueTypes } from '@dvsa/mes-test-schema/categories/D';
import { getCatDMinimalDataFields } from '../__mocks__/cat-d/data-fields/minimal-data-fields';
import { doesResultMatchExpectations } from '../__mocks__/result-comparer';

describe('mapCatDData', () => {

  it('Should map a minimally populated test result (test terminated early as possible)', () => {
    const minimalInput = getMinimalInput(TestCategory.D);

    const expected = getCatDMinimalDataFields();
    const result = mapCatDData(minimalInput);
    // expect no faults, serious or dangerous...
    const arraysMatched: boolean = doesResultMatchExpectations(result, expected);
    expect(arraysMatched).toEqual(true);
  });

  it('Should map a minimally populated test result with pass completion and override license type', () => {
    const minimalInput = getMinimalInputWithPassCompletion(TestCategory.D);
    const result = mapCatDData(minimalInput);
    // expect licence type to be overriden to manual for CAT D, Automatic and Code78 false
    const licenceType = result.find(field => field.col === 'AUTOMATIC_TEST');
    if (licenceType === undefined) {
      fail();
    } else {
      expect(licenceType.val).toEqual(0);
    }
  });

  it('Should map a fully populated regular test result (every possible driving fault)', () => {
    const fullyPopulated = getFullyPopulatedDrivingFaults(getMinimalInput(TestCategory.D));
    const expected: DataField[] = getCatDFullyPopulatedDrivingDataFields();
    // expect the right number of faults, with no serious or dangerous
    const result = mapCatDData(fullyPopulated);
    const arraysMatched: boolean = doesResultMatchExpectations(result, expected);
    expect(arraysMatched).toEqual(true);
  });

  it('Should map a fully populated regular test result (every possible serious fault)', () => {
    const fullyPopulated = getFullyPopulatedSeriousFaults(getMinimalInput(TestCategory.D));
    const expected = getCatDFullyPopulatedSeriousDataFields();
    // expect all serious, no faults or dangerous
    const arraysMatched: boolean = doesResultMatchExpectations(mapCatDData(fullyPopulated), expected);
    expect(arraysMatched).toEqual(true);
  });

  it('Should map a fully populated regular test result (every possible dangerous fault)', () => {
    const fullyPopulated = getFullyPopulatedDangerousFaults(getMinimalInput(TestCategory.D));
    const expected = getCatDFullyPopulatedDangerousDataFields();
    // expect all dangerous, no faults or serious
    const arraysMatched: boolean = doesResultMatchExpectations(mapCatDData(fullyPopulated), expected);
    expect(arraysMatched).toEqual(true);
  });

  it('Should map a fully populated delegated test', () => {
    const fullyPopulated = getFullyPopulatedDelegatedTest(getMinimalInput(TestCategory.D));
    const expected = getCatDFullyPopulatedDelegatedTest();

    const arraysMatched: boolean = doesResultMatchExpectations(mapCatDData(fullyPopulated), expected);
    expect(arraysMatched).toEqual(true);
  });
});

describe('getPcvDoorExerciseCompetencyComments', () => {
  it('should return a comment with all 3 fault descriptions', () => {
    const td: CatDUniqueTypes.TestData = {
      pcvDoorExercise: {
        dangerousFaultComments: 'some dangerous comment',
        seriousFaultComments: 'some serious comment',
        drivingFaultComments: 'some driving comment',
      },
    };
    const comment = getPcvDoorExerciseCompetencyComments(td, 'pcvDoorExercise');
    expect(comment)
      // eslint-disable-next-line max-len
      .toEqual('Dangerous fault comment: some dangerous comment, Serious fault comment: some serious comment, Driving fault comment: some driving comment');
  });

  it('should return a comment with 2 fault descriptions', () => {
    const td: CatDUniqueTypes.TestData = {
      pcvDoorExercise: {
        seriousFaultComments: 'some serious comment',
        drivingFaultComments: 'some driving comment',
      },
    };
    const comment = getPcvDoorExerciseCompetencyComments(td, 'pcvDoorExercise');
    expect(comment)
      .toEqual('Serious fault comment: some serious comment, Driving fault comment: some driving comment');
  });

  it('should return the driving comment as only one comment recorded', () => {
    const td: CatDUniqueTypes.TestData = {
      pcvDoorExercise: {
        drivingFaultComments: 'some driving comment',
      },
    };
    const comment = getPcvDoorExerciseCompetencyComments(td, 'pcvDoorExercise');
    expect(comment)
      .toEqual('Driving fault comment: some driving comment');
  });

  it('should return null as there were no comments in the pcvDoorExercise object', () => {
    const td: CatDUniqueTypes.TestData = {};
    const comment = getPcvDoorExerciseCompetencyComments(td, 'pcvDoorExercise');
    expect(comment).toEqual(null);
  });
});
