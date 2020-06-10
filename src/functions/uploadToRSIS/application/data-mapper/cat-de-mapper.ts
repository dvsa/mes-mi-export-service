import { CatDEUniqueTypes } from '@dvsa/mes-test-schema/categories/DE';
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
  formatQuestionSeriousDE,
  formatQuestionFaultDE,
  formatQuestionCompleted,
} from './data-mapper';
import { mapCommonCatDData } from './cat-d-common-mapper';

export const mapCatDEData = (result: ResultUpload): DataField[] => {
  const t = result.testResult.testData as CatDEUniqueTypes.TestData;

  const catCDataFields: DataField[] = mapCommonCatDData(result);

  const m: DataField[] = [
    ...catCDataFields,
    field('VEHICLE_CHECKS_COMPLETED', formatQuestionCompleted(t, 2)),
    field('VEHICLE_CHECKS_TOTAL', formatQuestionFaultDE(t)),
    field('VEHICLE_CHECKS_SERIOUS', formatQuestionSeriousDE(t)),
    field('UNCOUPLE_RECOUPLE_TOTAL', formatManoeuvreFault(t, 'uncoupleRecouple.fault')),
    field('UNCOUPLE_RECOUPLE_SERIOUS', formatManoeuvreSerious(t, 'uncoupleRecouple.fault')),
    field('UNCOUPLE_RECOUPLE_DANGEROUS', formatManoeuvreDangerous(t, 'uncoupleRecouple.fault')),
    field('UNCOUPLE_RECOUPLE_COMPLETED', optionalBoolean(t, 'uncoupleRecouple.selected')),
  ];
  // Optional Fields
  addIfSet(m, 'UNCOUPLE_RECOUPLE_COMMENT', optional(t, 'uncoupleRecouple.faultComments', null));

  return m;
};
