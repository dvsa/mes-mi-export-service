import { DataField } from '../../../domain/mi-export-data';
import { mapCatDEData } from '../cat-de-mapper';
import { getMinimalInput, getMinimalInputWithPassCompletion } from './helpers/cat-de/inputs/minimal-inputs';
import { getCatDEMinimalDataFields } from './helpers/cat-de/data-fields/minimal-data-fields';
import {
  getFullyPopulatedDrivingFaults,
  getFullyPopulatedSeriousFaults,
  getFullyPopulatedDangerousFaults,
} from './helpers/cat-de/inputs/fully-populated-inputs';
import {
  getCatDEFullyPopulatedSeriousDataFields,
  getCatDEFullyPopulatedDangerousDataFields,
  getCatDEFullyPopulatedDrivingDataFields,
} from './helpers/cat-de/data-fields/fully-populated-data-fields';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { doesResultMatchExpectations } from './helpers/result-comparer';

describe('mapCatDEData', () => {

  it('Should map a minimally populated test result (test terminated early as possible)', () => {
    const minimalInput = getMinimalInput(TestCategory.DE);
    const expected = getCatDEMinimalDataFields();
    const result = mapCatDEData(minimalInput);
    // expect no faults, serious or dangerous...
    const arraysMatched: boolean = doesResultMatchExpectations(result, expected);
    expect(arraysMatched).toEqual(true);
  });

  it('Should map a minimally populated test result with pass completion and override license type', () => {
    const minimalInput = getMinimalInputWithPassCompletion(TestCategory.DE);
    const result = mapCatDEData(minimalInput);
    // expect licence type to be overriden to manual for CAT DE, Automatic and Code78 false
    const licenceType =  result.find(field => field.col === 'AUTOMATIC_TEST');
    if (licenceType === undefined) {
      fail();
    } else {
      expect(licenceType.val).toEqual(0);
    }
  });

  it('Should map a fully populated regular test result (every possible driving fault)', () => {
    const fullyPopulated = getFullyPopulatedDrivingFaults(getMinimalInput(TestCategory.DE));
    const expected: DataField[] =  getCatDEFullyPopulatedDrivingDataFields();
    const result = mapCatDEData(fullyPopulated);
    expect(result).toEqual(expected);
    const arraysMatched: boolean = doesResultMatchExpectations(result, expected);
    expect(arraysMatched).toEqual(true);
  });

  it('Should map a fully populated regular test result (every possible serious fault)', () => {
    const fullyPopulated = getFullyPopulatedSeriousFaults(getMinimalInput(TestCategory.DE));
    const expected = getCatDEFullyPopulatedSeriousDataFields();
    const arraysMatched: boolean = doesResultMatchExpectations(mapCatDEData(fullyPopulated), expected);
    expect(arraysMatched).toEqual(true);
  });

  it('Should map a fully populated regular test result (every possible dangerous fault)', () => {
    const fullyPopulated = getFullyPopulatedDangerousFaults(getMinimalInput(TestCategory.DE));
    const expected = getCatDEFullyPopulatedDangerousDataFields();
    const arraysMatched: boolean = doesResultMatchExpectations(mapCatDEData(fullyPopulated), expected);
    expect(arraysMatched).toEqual(true);

  });
});
