import { ResultUpload } from '../result-client';
import { DataField } from '../../domain/mi-export-data';
import { mapCatCData } from './cat-c-mapper';

export const mapCatC1Data = (result: ResultUpload): DataField[] => {
  // currently this is identical to Cat C, have put in separate function
  // so that if this changes we only need to change this method
  return mapCatCData(result);
};
