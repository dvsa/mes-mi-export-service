import { ResultUpload } from '../result-client';
import { DataField } from '../../domain/mi-export-data';
import {
  field,
  formatManoeuvreFault,
  formatManoeuvreSerious,
  optionalBoolean,
  formatManoeuvreDangerous,
  optional,
  addIfSet,
  formatQuestionSeriousCE,
  formatQuestionFaultCE,
  formatQuestionCompleted,
} from './data-mapper';
import { mapCommonCatCData } from './cat-c-common-mapper';
import { CatCEUniqueTypes } from '@dvsa/mes-test-schema/categories/CE';
import { get } from 'lodash';

export const mapCatCEData = (result: ResultUpload): DataField[] => {
  const t = result.testResult.testData as CatCEUniqueTypes.TestData;
  const delegatedTest = get(result, 'testResult.delegatedTest', false);

  const catCDataFields: DataField[] = mapCommonCatCData(result);

  const m: DataField[] = [
    ...catCDataFields,
    field('VEHICLE_CHECKS_COMPLETED', formatQuestionCompleted(t, 2, delegatedTest)),
    field('VEHICLE_CHECKS_TOTAL', formatQuestionFaultCE(t)),
    field('VEHICLE_CHECKS_SERIOUS', formatQuestionSeriousCE(t)),
    field('UNCOUPLE_RECOUPLE_TOTAL', formatManoeuvreFault(t, 'uncoupleRecouple.fault')),
    field('UNCOUPLE_RECOUPLE_SERIOUS', formatManoeuvreSerious(t, 'uncoupleRecouple.fault')),
    field('UNCOUPLE_RECOUPLE_DANGEROUS', formatManoeuvreDangerous(t, 'uncoupleRecouple.fault')),
    field('UNCOUPLE_RECOUPLE_COMPLETED', optionalBoolean(t, 'uncoupleRecouple.selected')),
  ];
  // Optional Fields
  addIfSet(m , 'UNCOUPLE_RECOUPLE_COMMENT', optional(t, 'uncoupleRecouple.faultComments', null));

  return m;
};
