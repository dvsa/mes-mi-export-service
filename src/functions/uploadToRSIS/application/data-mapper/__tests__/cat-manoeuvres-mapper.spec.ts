import { mapCatManoeuvresData } from '../cat-manoeuvres-mapper';
import { getMinimalInput } from './helpers/cat-manoeurves/inputs/minimal-inputs';
import {
  getFullyPopulatedSeriousFaults,
  getFullyPopulatedDangerousFaults, getFullyPopulatedExtendedDangerousFaults, getFullyPopulatedExtendedSeriousFaults,
} from './helpers/cat-manoeurves/inputs/fully-populated-inputs';
import {
  getCatManoeuvreFullyPopulatedSeriousDataFields,
  getCatManoeuvreFullyPopulatedDangerousDataFields,
  getCatManoeuvreExtendedFullyPopulatedSeriousDataFields,
  getCatManoeuvreExtendedFullyPopulatedDangerousDataFields,
} from './helpers/cat-manoeurves/data-fields/fully-populated-data-fields';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import {
  getCatManoeuvreExtendedMinimalDataFields,
  getCatManoeuvreMinimalDataFields,
} from './helpers/cat-manoeurves/data-fields/minimal-data-fields';
import { doesResultMatchExpectations } from './helpers/result-comparer';

describe('mapCatManoeuvresData', () => {
  describe('non-extended', () => {
    it('Should map a minimally populated test result (test terminated early as possible)', () => {
      const minimalInput = getMinimalInput(TestCategory.CM);

      const expected = getCatManoeuvreMinimalDataFields();
      const result = mapCatManoeuvresData(minimalInput);
      // expect no faults, serious or dangerous...
      const arraysMatched:boolean = doesResultMatchExpectations(result, expected);
      expect(arraysMatched).toEqual(true);
    });

    it('Should map a fully populated regular test result (every possible serious fault)', () => {
      const fullyPopulated = getFullyPopulatedSeriousFaults(getMinimalInput(TestCategory.CM));
      const expected = getCatManoeuvreFullyPopulatedSeriousDataFields();
      // expect all serious, no faults or dangerous
      const arraysMatched: boolean = doesResultMatchExpectations(mapCatManoeuvresData(fullyPopulated), expected);
      expect(arraysMatched).toEqual(true);
    });

    it('Should map a fully populated regular test result (every possible dangerous fault)', () => {
      const fullyPopulated = getFullyPopulatedDangerousFaults(getMinimalInput(TestCategory.CM));
      const expected = getCatManoeuvreFullyPopulatedDangerousDataFields();
      // expect all dangerous, no faults or serious
      const arraysMatched: boolean = doesResultMatchExpectations(mapCatManoeuvresData(fullyPopulated), expected);
      expect(arraysMatched).toEqual(true);
    });
  });
  describe('extended', () => {
    it('Should map a minimally populated test result (test terminated early as possible)', () => {
      const minimalInput = getMinimalInput(TestCategory.DEM);

      const expected = getCatManoeuvreExtendedMinimalDataFields();
      const result = mapCatManoeuvresData(minimalInput);
      // expect no faults, serious or dangerous...
      const arraysMatched: boolean = doesResultMatchExpectations(result, expected);
      expect(arraysMatched).toEqual(true);
    });

    it('Should map a fully populated regular test result (every possible serious fault)', () => {
      const fullyPopulated = getFullyPopulatedExtendedSeriousFaults(getMinimalInput(TestCategory.DEM));
      const expected = getCatManoeuvreExtendedFullyPopulatedSeriousDataFields();
      // expect all serious, no faults or dangerous
      const arraysMatched: boolean = doesResultMatchExpectations(mapCatManoeuvresData(fullyPopulated), expected);
      expect(arraysMatched).toEqual(true);
    });

    it('Should map a fully populated regular test result (every possible dangerous fault)', () => {
      const fullyPopulated = getFullyPopulatedExtendedDangerousFaults(getMinimalInput(TestCategory.DEM));
      const expected = getCatManoeuvreExtendedFullyPopulatedDangerousDataFields();
      // expect all dangerous, no faults or serious
      const arraysMatched: boolean = doesResultMatchExpectations(mapCatManoeuvresData(fullyPopulated), expected);
      expect(arraysMatched).toEqual(true);
    });
  });
});
