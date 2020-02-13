import { getCatAM1MinimalInput } from './helpers/cat-a-mod1/inputs/minimal-inputs';
import { getCatAMod1MinimalDataFields } from './helpers/cat-a-mod1/data-fields/minimal-data-fields';
import { mapCatAMod1Data } from '../cat-a-mod1-mapper';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

describe('mapCatAMod1Data', () => {
  it('Should map a minimally populated test result', () => {
    const minimalInput = getCatAM1MinimalInput(TestCategory.EUAMM1);
    const expected = getCatAMod1MinimalDataFields();
    const result = mapCatAMod1Data(minimalInput);
    expect(result).toEqual(expected);
  });
});
