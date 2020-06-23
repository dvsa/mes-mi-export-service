import { getFullyPopulatedCatCPCTest } from './helpers/cat-cpc/inputs/fully-populated-inputs';
import { DataField } from '../../../domain/mi-export-data';
import { mapCatCPCData } from '../cat-cpc-mapper';
import { getCatCPCFullyPopulatedDataFields } from './helpers/cat-cpc/data-fields/fully-populated-data-fields';
import { ResultUpload } from '../../result-client';
import { getTerminatedCatCPCTest } from './helpers/cat-cpc/inputs/terminated-input';
import { getCatCPCTerminatedDataFields } from './helpers/cat-cpc/data-fields/terminated-data-fields';

describe('mapCatCPCData', () => {
  it('should map a fully populated regular test result', () => {
    const fullyPopulatedResult: ResultUpload = getFullyPopulatedCatCPCTest();
    const expected: DataField[] = getCatCPCFullyPopulatedDataFields();
    const result: DataField[] = mapCatCPCData(fullyPopulatedResult);
    expect(result).toEqual(expected);
  });
  it('should map a minimally populated regular test result', () => {
    const minimallyPopulatedResult = getTerminatedCatCPCTest() as ResultUpload;
    const expected: DataField[] = getCatCPCTerminatedDataFields();
    const result: DataField[] = mapCatCPCData(minimallyPopulatedResult);
    expect(result).toEqual(expected);
  });
});
