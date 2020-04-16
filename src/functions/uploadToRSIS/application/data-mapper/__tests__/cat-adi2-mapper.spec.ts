import { doesResultMatchExpectations } from './helpers/result-comparer';
import { getCatADI2MinimalInput } from './helpers/cat-adi2/inputs/minimal-inputs';
import { mapCatADI2Data } from '../cat-adi2-mapper';
import { getADI2MinimalDataField } from './helpers/cat-adi2/data-fields/minimal-data-fields';
import {
  getADI2FullyPopulatedDrivingFaults,
  getADI2FullyPopulatedSeriousFaults, getADIFullyPopulatedDangerousFaults,
} from './helpers/cat-adi2/inputs/fully-populated-inputs';
import {
  getADI2FullyPopulatedFaultDataFields,
  getADIFullyPopulatedDangerousDataFields,
  getADIFullyPopulatedSeriousDataFields,
} from './helpers/cat-adi2/data-fields/fully-populated-data-fields';

describe('mapCatADI2Data', () => {

  it('Should map a minially populated test result (test terminated early as possible)', () => {
    const minimalInput = getCatADI2MinimalInput();

    const expected = getADI2MinimalDataField();
    const result = mapCatADI2Data(minimalInput);

    // expect no faults, serious or dangerous...
    const arraysMatched: boolean = doesResultMatchExpectations(result, expected);
    expect(arraysMatched).toEqual(true);
  });

  it('Should map a fully populated regular test result (every possible driving fault)', () => {
    const fullyPopulated = getADI2FullyPopulatedDrivingFaults(getADI2MinimalDataField());
    const result = mapCatADI2Data(fullyPopulated);

    // expect the right number of faults, with no serious or dangerous
    const arraysMatched: boolean = doesResultMatchExpectations(result, getADI2FullyPopulatedFaultDataFields());
    expect(arraysMatched).toEqual(true);
  });

  it('Should map a fully populated regular test result (every possible serious fault)', () => {
    const fullyPopulated = getADI2FullyPopulatedSeriousFaults(getCatADI2MinimalInput());
    const expected = getADIFullyPopulatedSeriousDataFields();

    // expect all serious, no faults or dangerous
    const arraysMatched: boolean = doesResultMatchExpectations(mapCatADI2Data(fullyPopulated), expected);
    expect(arraysMatched).toEqual(true);
  });

  it('Should map a fully populated regular test result (every possible dangerous fault)', () => {
    const fullyPopulated = getADIFullyPopulatedDangerousFaults(getCatADI2MinimalInput());
    const expected = getADIFullyPopulatedDangerousDataFields();

    // expect all dangerous, no faults or serious
    const arraysMatched: boolean = doesResultMatchExpectations(mapCatADI2Data(fullyPopulated), expected);
    expect(arraysMatched).toEqual(true);
  });
});
