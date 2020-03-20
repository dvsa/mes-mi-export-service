import { mapCatAMod2Data } from '../cat-a-mod2-mapper';
import { getCatAMod2MinimalInput } from './helpers/cat-a-mod2/inputs/minimal-inputs';
import { getMinimalDataField } from './helpers/cat-a-mod2/data-fields/minimal-data-fields';
import {
  getFullyPopulatedDangerousFaults,
  getFullyPopulatedDrivingFaults,
  getFullyPopulatedSeriousFaults,
} from './helpers/cat-a-mod2/inputs/fully-populated-inputs';
import {
  getFullyPopulatedDangerousDataFields,
  getFullyPopulatedFaultDataFields,
  getFullyPopulatedSeriousDataFields,
} from './helpers/cat-a-mod2/data-fields/fully-populated-data-fields';

describe('mapCatAMod2Data', () => {

  it('Should map a minimally populated test result (test terminated early as possible)', () => {
    const minimalInput = getCatAMod2MinimalInput();

    const expected = getMinimalDataField();

    // expect no faults, serious or dangerous...
    expect(mapCatAMod2Data(minimalInput)).toEqual(expected);
  });

  it('Should map a fully populated regular test result (every possible driving fault)', () => {
    const fullyPopulated = getFullyPopulatedDrivingFaults(getCatAMod2MinimalInput());
    const expected = getFullyPopulatedFaultDataFields();
    // expect the right number of faults, with no serious or dangerous
    expect(mapCatAMod2Data(fullyPopulated)).toEqual(expected);
  });

  it('Should map a fully populated regular test result (every possible serious fault)', () => {
    const fullyPopulated = getFullyPopulatedSeriousFaults(getCatAMod2MinimalInput());
    const expected = getFullyPopulatedSeriousDataFields();
    // expect all serious, no faults or dangerous
    expect(mapCatAMod2Data(fullyPopulated)).toEqual(expected);
  });

  it('Should map a fully populated regular test result (every possible dangerous fault)', () => {
    const fullyPopulated = getFullyPopulatedDangerousFaults(getCatAMod2MinimalInput());
    const expected = getFullyPopulatedDangerousDataFields();
    // expect all dangerous, no faults or serious
    expect(mapCatAMod2Data(fullyPopulated)).toEqual(expected);
  });
});
