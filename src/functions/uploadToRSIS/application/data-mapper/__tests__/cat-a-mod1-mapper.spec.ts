import { getCatAM1MinimalInput } from '../__mocks__/cat-a-mod1/inputs/minimal-inputs';
import { getCatAMod1MinimalDataFields } from '../__mocks__/cat-a-mod1/data-fields/minimal-data-fields';
import {
  getCatAMod1FullyPopulatedDFaultDataFields,
} from '../__mocks__/cat-a-mod1/data-fields/fully-populated-driving-faults';
import { mapCatAMod1Data } from '../cat-a-mod1-mapper';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import {
  getCatAM1FullyPopulatedDangerousFaults,
  getCatAM1FullyPopulatedDrivingFaults, getCatAM1FullyPopulatedSeriousFaults,
  getCatAM1FullyPopulatedSingleFaultCompetencies,
} from '../__mocks__/cat-a-mod1/inputs/fully-populated-inputs';
import {
  getCatAMod1FullyPopulatedSingleFaultDataFields,
} from '../__mocks__/cat-a-mod1/data-fields/fully-populated-single-fault-competencies';
import {
  getCatAMod1FullyPopulatedSeriousFaultDataFields,
} from '../__mocks__/cat-a-mod1/data-fields/fully-populated-serious-faults';
import {
  getCatAMod1FullyPopulatedDangerousFaultDataFields,
} from '../__mocks__/cat-a-mod1/data-fields/fully-populated-dangerous-faults';
import { doesResultMatchExpectations } from '../__mocks__/result-comparer';

describe('mapCatAMod1Data', () => {
  it('Should map a minimally populated test result', () => {
    const minimalInput = getCatAM1MinimalInput(TestCategory.EUAMM1);
    const expected = getCatAMod1MinimalDataFields();
    const result = mapCatAMod1Data(minimalInput);
    const arraysMatched: boolean = doesResultMatchExpectations(result, expected);
    expect(arraysMatched).toEqual(true);
  });
  it('should map a fully populated regular test with every possible driving fault', () => {
    const fullyPopulatedWithDrivingFaults
      = getCatAM1FullyPopulatedDrivingFaults(getCatAM1MinimalInput(TestCategory.EUAMM1));
    const expected = getCatAMod1FullyPopulatedDFaultDataFields();
    const result = mapCatAMod1Data(fullyPopulatedWithDrivingFaults);
    const arraysMatched: boolean = doesResultMatchExpectations(result, expected);
    expect(arraysMatched).toEqual(true);
  });
  it('should map a fully populated regular test with every possible serious fault', () => {
    const fullyPopulatedWithSeriousFaults
      = getCatAM1FullyPopulatedSeriousFaults(getCatAM1MinimalInput(TestCategory.EUAMM1));
    const expected = getCatAMod1FullyPopulatedSeriousFaultDataFields();
    const result = mapCatAMod1Data(fullyPopulatedWithSeriousFaults);
    const arraysMatched: boolean = doesResultMatchExpectations(result, expected);
    expect(arraysMatched).toEqual(true);
  });
  it('should map a fully populated regular test with every possible dangerous fault', () => {
    const fullyPopulatedWithDangerousFaults
      = getCatAM1FullyPopulatedDangerousFaults(getCatAM1MinimalInput(TestCategory.EUAMM1));
    const expected = getCatAMod1FullyPopulatedDangerousFaultDataFields();
    const result = mapCatAMod1Data(fullyPopulatedWithDangerousFaults);
    const arraysMatched: boolean = doesResultMatchExpectations(result, expected);
    expect(arraysMatched).toEqual(true);
  });
  it('should correctly map single fault competencies', () => {
    const fullyPopulatedWithSingleFaultCompetencies
      = getCatAM1FullyPopulatedSingleFaultCompetencies(getCatAM1MinimalInput(TestCategory.EUAMM1));
    const expected = getCatAMod1FullyPopulatedSingleFaultDataFields();
    const result = mapCatAMod1Data(fullyPopulatedWithSingleFaultCompetencies);
    const arraysMatched: boolean = doesResultMatchExpectations(result, expected);
    expect(arraysMatched).toEqual(true);
  });
});
