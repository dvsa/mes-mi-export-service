import { getFullyPopulatedCatCPCTest } from './helpers/cat-cpc/inputs/fully-populated-inputs';
import { DataField } from '../../../domain/mi-export-data';
import { formatCPCVehicleDetails, mapCatCPCData } from '../cat-cpc-mapper';
import { getCatCPCFullyPopulatedDataFields } from './helpers/cat-cpc/data-fields/fully-populated-data-fields';
import { ResultUpload } from '../../result-client';
import { getTerminatedCatCPCTest } from './helpers/cat-cpc/inputs/terminated-input';
import { getCatCPCTerminatedDataFields } from './helpers/cat-cpc/data-fields/terminated-data-fields';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { VehicleDetails } from '@dvsa/mes-test-schema/categories/CPC';
import { doesResultMatchExpectations } from './helpers/result-comparer';

describe('mapCatCPCData', () => {
  it('should map a fully populated regular test result', () => {
    const fullyPopulatedResult: ResultUpload = getFullyPopulatedCatCPCTest();
    const expected: DataField[] = getCatCPCFullyPopulatedDataFields();
    const result: DataField[] = mapCatCPCData(fullyPopulatedResult);
    const arraysMatched: boolean = doesResultMatchExpectations(result, expected);
    expect(arraysMatched).toEqual(true);
  });
  it('should map a minimally populated regular test result', () => {
    const minimallyPopulatedResult = getTerminatedCatCPCTest() as ResultUpload;
    const expected: DataField[] = getCatCPCTerminatedDataFields();
    const result: DataField[] = mapCatCPCData(minimallyPopulatedResult);
    const arraysMatched: boolean = doesResultMatchExpectations(result, expected);
    expect(arraysMatched).toEqual(true);
  });
});

describe('formatCPCVehicleDetails', () => {
  it('should return null if DCPC', () => {
    const fullyPopulatedResult = getFullyPopulatedCatCPCTest();
    expect(formatCPCVehicleDetails(TestCategory.DCPC, fullyPopulatedResult.testResult.vehicleDetails as VehicleDetails))
      .toEqual(null);
  });

  it('should return R if CCPC', () => {
    const fullyPopulatedResult = getFullyPopulatedCatCPCTest();
    expect(formatCPCVehicleDetails(TestCategory.CCPC, fullyPopulatedResult.testResult.vehicleDetails as VehicleDetails))
      .toEqual('R');
  });
});
