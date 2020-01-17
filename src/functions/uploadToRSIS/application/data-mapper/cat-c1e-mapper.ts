import { ResultUpload } from '../result-client';
import { DataField } from '../../domain/mi-export-data';
import { mapCatCEData } from './cat-ce-mapper';

export const mapCatC1EData = (result: ResultUpload): DataField[] => {
  // currently this is identical to Cat CE, have put in separate function
  // so that if this changes we only need to change this method
  return mapCatCEData(result);
};
