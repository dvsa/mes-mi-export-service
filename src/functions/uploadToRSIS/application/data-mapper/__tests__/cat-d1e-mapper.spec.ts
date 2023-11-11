import { DataField } from '../../../domain/mi-export-data';
import { mapCatD1EData } from '../cat-d1e-mapper';
import { getCatDEMinimalDataFields } from '../__mocks__/cat-de/data-fields/minimal-data-fields';
import {
  getFullyPopulatedDrivingFaults,
  getFullyPopulatedSeriousFaults,
  getFullyPopulatedDangerousFaults,
} from '../__mocks__/cat-de/inputs/fully-populated-inputs';
import {
  getCatDEFullyPopulatedDangerousDataFields, getCatDEFullyPopulatedDrivingDataFields,
  getCatDEFullyPopulatedSeriousDataFields,
} from '../__mocks__/cat-de/data-fields/fully-populated-data-fields';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { getMinimalInput } from '../__mocks__/cat-de/inputs/minimal-inputs';
import { doesResultMatchExpectations } from '../__mocks__/result-comparer';

describe('mapCatD1EData', () => {

  it('Should map a minimally populated test result (test terminated early as possible)', () => {
    const minimalInput = getMinimalInput(TestCategory.D1E);

    const expected = getCatDEMinimalDataFields();

    const result = mapCatD1EData(minimalInput);
    // expect no faults, serious or dangerous...
    const arraysMatched: boolean = doesResultMatchExpectations(result, expected);
    expect(arraysMatched).toEqual(true);
  });

  it('Should map a fully populated regular test result (every possible driving fault)', () => {
    const fullyPopulated = getFullyPopulatedDrivingFaults(getMinimalInput(TestCategory.D1E));
    const expected: DataField[] =  getCatDEFullyPopulatedDrivingDataFields();
    const result = mapCatD1EData(fullyPopulated);
    const arraysMatched: boolean = doesResultMatchExpectations(result, expected);
    expect(arraysMatched).toEqual(true);
  });

  it('Should map a fully populated regular test result (every possible serious fault)', () => {
    const fullyPopulated = getFullyPopulatedSeriousFaults(getMinimalInput(TestCategory.D1E));
    const expected = getCatDEFullyPopulatedSeriousDataFields();
    // expect all serious, no faults or dangerous
    const arraysMatched: boolean = doesResultMatchExpectations(mapCatD1EData(fullyPopulated), expected);
    expect(arraysMatched).toEqual(true);
  });

  it('Should map a fully populated regular test result (every possible dangerous fault)', () => {
    const fullyPopulated = getFullyPopulatedDangerousFaults(getMinimalInput(TestCategory.D1E));
    const expected = getCatDEFullyPopulatedDangerousDataFields();
    // expect all dangerous, no faults or serious
    const arraysMatched: boolean = doesResultMatchExpectations(mapCatD1EData(fullyPopulated), expected);
    expect(arraysMatched).toEqual(true);
  });
});
