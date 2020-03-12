import { ResultUpload } from '../result-client';
import { DataField } from '../../domain/mi-export-data';
import { mapCommonCatHomeTestsData } from './cat-home-tests-common-mapper';

export const mapCatKData = (result: ResultUpload): DataField[] => {
  // Currently F, G, H, and K tests can be handled by the Home tests common mapper
  return mapCommonCatHomeTestsData(result);
};
