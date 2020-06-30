import { DataField } from '../../../domain/mi-export-data';
import { mapCatD1Data } from '../cat-d1-mapper';
import { getMinimalInput } from './helpers/cat-d/inputs/minimal-inputs';
import {
  getFullyPopulatedDrivingFaults,
  getFullyPopulatedSeriousFaults,
  getFullyPopulatedDangerousFaults,
} from './helpers/cat-d/inputs/fully-populated-inputs';
import {
  getCatDFullyPopulatedSeriousDataFields,
  getCatDFullyPopulatedDangerousDataFields, getCatDFullyPopulatedDrivingDataFields,
} from './helpers/cat-d/data-fields/fully-populated-data-fields';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { getCatDMinimalDataFields } from './helpers/cat-d/data-fields/minimal-data-fields';
import { doesResultMatchExpectations } from './helpers/result-comparer';

describe('mapCatD1Data', () => {

  it('Should map a minimally populated test result (test terminated early as possible)', () => {
    const minimalInput = getMinimalInput(TestCategory.D1);

    const expected = getCatDMinimalDataFields();
    const result = mapCatD1Data(minimalInput);
    // expect no faults, serious or dangerous...
    const arraysMatched: boolean = doesResultMatchExpectations(result, expected);
    expect(arraysMatched).toEqual(true);
  });

  it('Should map a fully populated regular test result (every possible driving fault)', () => {
    const fullyPopulated = getFullyPopulatedDrivingFaults(getMinimalInput(TestCategory.D1));
    const expected: DataField[] = getCatDFullyPopulatedDrivingDataFields();
    // expect the right number of faults, with no serious or dangerous
    const result = mapCatD1Data(fullyPopulated);
    const arraysMatched: boolean = doesResultMatchExpectations(result, expected);
    expect(arraysMatched).toEqual(true);
  });

  it('Should map a fully populated regular test result (every possible serious fault)', () => {
    const fullyPopulated = getFullyPopulatedSeriousFaults(getMinimalInput(TestCategory.D1));
    const expected = getCatDFullyPopulatedSeriousDataFields();
    // expect all serious, no faults or dangerous
    const arraysMatched: boolean = doesResultMatchExpectations(mapCatD1Data(fullyPopulated), expected);
    expect(arraysMatched).toEqual(true);
  });

  it('Should map a fully populated regular test result (every possible dangerous fault)', () => {
    const fullyPopulated = getFullyPopulatedDangerousFaults(getMinimalInput(TestCategory.D1));
    const expected = getCatDFullyPopulatedDangerousDataFields();
    // expect all dangerous, no faults or serious
    const arraysMatched: boolean = doesResultMatchExpectations(mapCatD1Data(fullyPopulated), expected);
    expect(arraysMatched).toEqual(true);
  });
});
