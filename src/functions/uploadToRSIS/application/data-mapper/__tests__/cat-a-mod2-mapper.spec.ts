import { mapCatAMod2Data } from '../cat-a-mod2-mapper';
import { getCatAMod2MinimalInput } from '../__mocks__/cat-a-mod2/inputs/minimal-inputs';
import { getMinimalDataField } from '../__mocks__/cat-a-mod2/data-fields/minimal-data-fields';
import {
  getFullyPopulatedDangerousFaults,
  getFullyPopulatedDrivingFaults,
  getFullyPopulatedSeriousFaults,
} from '../__mocks__/cat-a-mod2/inputs/fully-populated-inputs';
import {
  getFullyPopulatedDangerousDataFields,
  getFullyPopulatedFaultDataFields,
  getFullyPopulatedSeriousDataFields,
} from '../__mocks__/cat-a-mod2/data-fields/fully-populated-data-fields';
import { doesResultMatchExpectations } from '../__mocks__/result-comparer';

describe('mapCatAMod2Data', () => {

  it('Should map a minimally populated test result (test terminated early as possible)', () => {
    const minimalInput = getCatAMod2MinimalInput();
    const expected = getMinimalDataField();
    const arraysMatched: boolean = doesResultMatchExpectations(mapCatAMod2Data(minimalInput), expected);
    // expect no faults, serious or dangerous...
    expect(arraysMatched).toEqual(true);
  });

  it('Should map a fully populated regular test result (every possible driving fault)', () => {
    const fullyPopulated = getFullyPopulatedDrivingFaults(getCatAMod2MinimalInput());
    const expected = getFullyPopulatedFaultDataFields();
    const arraysMatched: boolean = doesResultMatchExpectations(mapCatAMod2Data(fullyPopulated), expected);
    // expect the right number of faults, with no serious or dangerous
    expect(arraysMatched).toEqual(true);
  });

  it('Should map a fully populated regular test result (every possible serious fault)', () => {
    const fullyPopulated = getFullyPopulatedSeriousFaults(getCatAMod2MinimalInput());
    const expected = getFullyPopulatedSeriousDataFields();
    const arraysMatched: boolean = doesResultMatchExpectations(mapCatAMod2Data(fullyPopulated), expected);
    // expect all serious, no faults or dangerous
    expect(arraysMatched).toEqual(true);
  });

  it('Should map a fully populated regular test result (every possible dangerous fault)', () => {
    const fullyPopulated = getFullyPopulatedDangerousFaults(getCatAMod2MinimalInput());
    const expected = getFullyPopulatedDangerousDataFields();
    const arraysMatched: boolean = doesResultMatchExpectations(mapCatAMod2Data(fullyPopulated), expected);
    // expect all dangerous, no faults or serious
    expect(arraysMatched).toEqual(true);
  });
});
