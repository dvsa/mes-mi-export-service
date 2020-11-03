import { ResultUpload } from '../result-client';
import { DataField } from '../../domain/mi-export-data';
import {
  field,
  formatQuestionCompleted,
  formatQuestionFaultD,
  formatQuestionSeriousD,
} from './data-mapper';
import { mapCommonCatDData } from './cat-d-common-mapper';
import { CatDUniqueTypes } from '@dvsa/mes-test-schema/categories/D';
import { get } from 'lodash';

export const mapCatDData = (result: ResultUpload): DataField[] => {
  const t = result.testResult.testData as CatDUniqueTypes.TestData;
  const delegatedTest = get(result, 'testResult.delegatedTest', false);

  return [
    ...mapCommonCatDData(result),
    field('VEHICLE_CHECKS_COMPLETED', formatQuestionCompleted(t, 5, delegatedTest)),
    field('VEHICLE_CHECKS_TOTAL', formatQuestionFaultD(t)),
    field('VEHICLE_CHECKS_SERIOUS', formatQuestionSeriousD(t)),
  ];
};
