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
import { doesResultMatchExpectations } from './helpers/result-comparer';
import { prependFaultCommentMessage } from '../data-mapper';

describe('mapCatBData', () => {

  it('Should map a minially populated test result (test terminated early as possible)', () => {
    const minimalInput = getCatBMinimalInput();

    const expected = prependFaultCommentMessage(getMinimalDataField(), 'Driving');

    // expect no faults, serious or dangerous...
    expect(mapCatBData(minimalInput)).toEqual(expected);
    const arraysMatched: boolean = doesResultMatchExpectations(mapCatBData(minimalInput), expected);
    expect(arraysMatched).toEqual(true);
  });

  it('Should map a fully populated regular test result (every possible driving fault)', () => {
    const fullyPopulated = getFullyPopulatedDrivingFaults(getCatBMinimalInput());

    const expected = getFullyPopulatedFaultDataFields();

    // expect the right number of faults, with no serious or dangerous
    const arraysMatched: boolean = doesResultMatchExpectations(mapCatBData(fullyPopulated), expected);
    expect(arraysMatched).toEqual(true);
  });

  it('Should map a fully populated regular test result (every possible serious fault)', () => {
    const fullyPopulated = getFullyPopulatedSeriousFaults(getCatBMinimalInput());

    const expected = getFullyPopulatedSeriousDataFields();

    // expect all serious, no faults or dangerous
    const arraysMatched: boolean = doesResultMatchExpectations(mapCatBData(fullyPopulated), expected);
    expect(arraysMatched).toEqual(true);
  });

  it('Should map a fully populated regular test result (every possible dangerous fault)', () => {
    const fullyPopulated = getFullyPopulatedDangerousFaults(getCatBMinimalInput());

    const expected = getFullyPopulatedDangerousDataFields();

    // expect all dangerous, no faults or serious
    const arraysMatched: boolean = doesResultMatchExpectations(mapCatBData(fullyPopulated), expected);
    expect(arraysMatched).toEqual(true);
  });
});
