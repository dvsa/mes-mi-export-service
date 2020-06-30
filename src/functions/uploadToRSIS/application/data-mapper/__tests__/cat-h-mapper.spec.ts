import { DataField } from '../../../domain/mi-export-data';
import { mapCatHData } from '../cat-h-mapper';
import { getMinimalInput } from './helpers/cat-home-tests/inputs/minimal-inputs';
import {
  getFullyPopulatedDrivingFaults,
  getFullyPopulatedSeriousFaults,
  getFullyPopulatedDangerousFaults,
} from './helpers/cat-home-tests/inputs/fully-populated-inputs';
import {
  getCatHomeTestsFullyPopulatedSeriousDataFields,
  getCatHomeTestsFullyPopulatedDangerousDataFields, getCatHomeTestsDrivingFaultDataFields,
} from './helpers/cat-home-tests/data-fields/fully-populated-data-fields';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { getCatHomeTestsMinimalDataFields } from './helpers/cat-home-tests/data-fields/minimal-data-fields';
import { doesResultMatchExpectations } from './helpers/result-comparer';

describe('mapCatHData', () => {

  it('Should map a minimally populated test result (test terminated early as possible)', () => {
    const minimalInput = getMinimalInput(TestCategory.H);

    const expected = getCatHomeTestsMinimalDataFields();
    const result = mapCatHData(minimalInput);
    // expect no faults, serious or dangerous...
    const arraysMatched:boolean = doesResultMatchExpectations(result, expected);
    expect(arraysMatched).toEqual(true);
  });

  it('Should map a fully populated regular test result (every possible driving fault)', () => {
    const fullyPopulated = getFullyPopulatedDrivingFaults(getMinimalInput(TestCategory.H));
    const expected: DataField[] = getCatHomeTestsDrivingFaultDataFields();
    // expect the right number of faults, with no serious or dangerous
    const result = mapCatHData(fullyPopulated);
    const arraysMatched:boolean = doesResultMatchExpectations(result, expected);
    expect(arraysMatched).toEqual(true);
  });

  it('Should map a fully populated regular test result (every possible serious fault)', () => {
    const fullyPopulated = getFullyPopulatedSeriousFaults(getMinimalInput(TestCategory.H));
    const expected = getCatHomeTestsFullyPopulatedSeriousDataFields();
    // expect all serious, no faults or dangerous
    const arraysMatched: boolean = doesResultMatchExpectations(mapCatHData(fullyPopulated), expected);
    expect(arraysMatched).toEqual(true);
  });

  it('Should map a fully populated regular test result (every possible dangerous fault)', () => {
    const fullyPopulated = getFullyPopulatedDangerousFaults(getMinimalInput(TestCategory.H));
    const expected = getCatHomeTestsFullyPopulatedDangerousDataFields();
    // expect all dangerous, no faults or serious
    const arraysMatched: boolean = doesResultMatchExpectations(mapCatHData(fullyPopulated), expected);
    expect(arraysMatched).toEqual(true);
  });
});
