import { ResultUpload } from '../result-client';
import { DataField } from '../../domain/mi-export-data';
import { mapCatDData } from './cat-d-mapper';

export const mapCatD1Data = (result: ResultUpload): DataField[] => {
  // currently this is identical to Cat C, have put in separate function
  // so that if this changes we only need to change this method
  return mapCatDData(result);
};
