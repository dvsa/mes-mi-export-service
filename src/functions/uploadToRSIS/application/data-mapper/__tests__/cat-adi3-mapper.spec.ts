import { doesResultMatchExpectations } from './helpers/result-comparer';
import { getCatADI3MinimalInput } from './helpers/cat-adi3/inputs/minimal-inputs';
import { getADI3MinimalDataField } from './helpers/cat-adi3/data-fields/minimal-data-fields';
import { mapCatADI3Data } from '../cat-adi3-mapper';
import { getADI3FullyPopulated } from './helpers/cat-adi3/inputs/fully-populated-inputs';
import { getADI3FullyPopulatedFaultDataFields } from './helpers/cat-adi3/data-fields/fully-populated-data-fields';

describe('mapCatADI3Data', () => {

  it('Should map a minimally populated test result (test terminated early as possible)', () => {
    const minimalInput = getCatADI3MinimalInput();

    const expected = getADI3MinimalDataField();
    const result = mapCatADI3Data(minimalInput);
    const arraysMatched: boolean = doesResultMatchExpectations(result, expected);
    expect(arraysMatched).toEqual(true);
  });

  it('Should map a fully populated regular test result', () => {
    const fullyPopulated = getADI3FullyPopulated(getCatADI3MinimalInput());
    const result = mapCatADI3Data(fullyPopulated);

    const arraysMatched: boolean = doesResultMatchExpectations(result, getADI3FullyPopulatedFaultDataFields());
    expect(arraysMatched).toEqual(true);
  });

});
