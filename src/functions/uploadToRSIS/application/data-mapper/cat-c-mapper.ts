import { ResultUpload } from '../result-client';
import { DataField } from '../../domain/mi-export-data';
import { field, formatQuestionFaultC, formatQuestionSeriousC, formatQuestionCompleted } from './data-mapper';
import { mapCommonCatCData } from './cat-c-common-mapper';
import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';
import { get } from 'lodash';
import { TestResultCommonSchema } from '@dvsa/mes-test-schema/categories/common';

export const mapCatCData = (result: ResultUpload): DataField[] => {
  const t = (result.testResult as Required<TestResultCommonSchema>).testData as CatCUniqueTypes.TestData;
  const delegatedTest = get(result, 'testResult.delegatedTest', false);

  return [
    ...mapCommonCatCData(result),
    field('VEHICLE_CHECKS_COMPLETED', formatQuestionCompleted(t, 5, delegatedTest)),
    field('VEHICLE_CHECKS_TOTAL', formatQuestionFaultC(t)),
    field('VEHICLE_CHECKS_SERIOUS', formatQuestionSeriousC(t)),
  ];
};
