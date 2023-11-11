import { DataField } from '../../../domain/mi-export-data';
import { mapCatFData } from '../cat-f-mapper';
import { getMinimalInput } from '../__mocks__/cat-home-tests/inputs/minimal-inputs';
import {
  getFullyPopulatedDrivingFaults,
  getFullyPopulatedSeriousFaults,
  getFullyPopulatedDangerousFaults,
} from '../__mocks__/cat-home-tests/inputs/fully-populated-inputs';
import {
  getCatHomeTestsFullyPopulatedSeriousDataFields,
  getCatHomeTestsFullyPopulatedDangerousDataFields, getCatHomeTestsDrivingFaultDataFields,
} from '../__mocks__/cat-home-tests/data-fields/fully-populated-data-fields';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { getCatHomeTestsMinimalDataFields } from '../__mocks__/cat-home-tests/data-fields/minimal-data-fields';
import { doesResultMatchExpectations } from '../__mocks__/result-comparer';

describe('mapCatFData', () => {

  it('Should map a minimally populated test result (test terminated early as possible)', () => {
    const minimalInput = getMinimalInput(TestCategory.F);

    const expected = getCatHomeTestsMinimalDataFields();
    const result = mapCatFData(minimalInput);
    // expect no faults, serious or dangerous...
    const arraysMatched:boolean = doesResultMatchExpectations(result, expected);
    expect(arraysMatched).toEqual(true);
  });

  it('Should map a fully populated regular test result (every possible driving fault)', () => {
    const fullyPopulated = getFullyPopulatedDrivingFaults(getMinimalInput(TestCategory.F));
    const expected: DataField[] = getCatHomeTestsDrivingFaultDataFields();
    // expect the right number of faults, with no serious or dangerous
    const result = mapCatFData(fullyPopulated);
    const arraysMatched:boolean = doesResultMatchExpectations(result, expected);
    expect(arraysMatched).toEqual(true);
  });

  it('Should map a fully populated regular test result (every possible serious fault)', () => {
    const fullyPopulated = getFullyPopulatedSeriousFaults(getMinimalInput(TestCategory.F));
    const expected = getCatHomeTestsFullyPopulatedSeriousDataFields();
    // expect all serious, no faults or dangerous
    const arraysMatched: boolean = doesResultMatchExpectations(mapCatFData(fullyPopulated), expected);
    expect(arraysMatched).toEqual(true);
  });

  it('Should map a fully populated regular test result (every possible dangerous fault)', () => {
    const fullyPopulated = getFullyPopulatedDangerousFaults(getMinimalInput(TestCategory.F));
    const expected = getCatHomeTestsFullyPopulatedDangerousDataFields();
    // expect all dangerous, no faults or serious
    const arraysMatched: boolean = doesResultMatchExpectations(mapCatFData(fullyPopulated), expected);
    expect(arraysMatched).toEqual(true);
  });
});
