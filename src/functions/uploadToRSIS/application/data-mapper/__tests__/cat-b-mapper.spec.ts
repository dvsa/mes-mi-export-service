import { mapCatBData } from '../cat-b-mapper';
import { getCatBMinimalInput } from './helpers/cat-b/inputs/minimal-inputs';
import {
  getFullyPopulatedDrivingFaults,
  getFullyPopulatedSeriousFaults,
  getFullyPopulatedDangerousFaults,
 } from './helpers/cat-b/inputs/fully-populated-inputs';
import { getMinimalDataField } from './helpers/cat-b/data-fields/minimal-data-fields';
import {
  getFullyPopulatedFaultDataFields,
  getFullyPopulatedSeriousDataFields,
  getFullyPopulatedDangerousDataFields,
} from './helpers/cat-b/data-fields/fully-populated-data-fields';

describe('mapCatBData', () => {

  it('Should map a minially populated test result (test terminated early as possible)', () => {
    const minimalInput = getCatBMinimalInput();

    const expected = getMinimalDataField();

    // expect no faults, serious or dangerous...
    expect(mapCatBData(minimalInput)).toEqual(expected);
  });

  it('Should map a fully populated regular test result (every possible driving fault)', () => {
    const fullyPopulated = getFullyPopulatedDrivingFaults(getCatBMinimalInput());

    const expected = getFullyPopulatedFaultDataFields();

    // expect the right number of faults, with no serious or dangerous
    expect(mapCatBData(fullyPopulated)).toEqual(expected);
  });

  it('Should map a fully populated regular test result (every possible serious fault)', () => {
    const fullyPopulated = getFullyPopulatedSeriousFaults(getCatBMinimalInput());

    const expected = getFullyPopulatedSeriousDataFields();

    // expect all serious, no faults or dangerous
    expect(mapCatBData(fullyPopulated)).toEqual(expected);
  });

  it('Should map a fully populated regular test result (every possible dangerous fault)', () => {
    const fullyPopulated = getFullyPopulatedDangerousFaults(getCatBMinimalInput());

    const expected = getFullyPopulatedDangerousDataFields();

    // expect all dangerous, no faults or serious
    expect(mapCatBData(fullyPopulated)).toEqual(expected);
  });
});
