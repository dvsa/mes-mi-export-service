import { ResultUpload } from '../result-client';
import { DataField } from '../../domain/mi-export-data';
import { mapCatDEData } from './cat-de-mapper';

export const mapCatD1EData = (result: ResultUpload): DataField[] => {
  // currently this is identical to Cat DE, have put in separate function
  // so that if this changes we only need to change this method
  return mapCatDEData(result);
};
