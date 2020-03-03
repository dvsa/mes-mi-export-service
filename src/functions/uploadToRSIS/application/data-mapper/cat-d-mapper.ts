import { ResultUpload } from '../result-client';
import { DataField } from '../../domain/mi-export-data';
import {
  field,
  formatQuestionCompleted,
  formatQuestionFaultD,
  formatQuestionSeriousD,
} from './data-mapper';
import { mapCommonCatDData } from './cat-d-common-mapper';

export const mapCatDData = (result: ResultUpload): DataField[] => {
  const t = result.testResult.testData;

  return [
    ...mapCommonCatDData(result),
    field('VEHICLE_CHECKS_COMPLETED', formatQuestionCompleted(t, 5)),
    field('VEHICLE_CHECKS_TOTAL', formatQuestionFaultD(t)),
    field('VEHICLE_CHECKS_SERIOUS', formatQuestionSeriousD(t)),
  ];
};
