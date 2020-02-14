import { ResultUpload } from '../result-client';
import { DataField } from '../../domain/mi-export-data';
import { mapCatCData } from './cat-c-mapper';
import {
  field,
  formatManoeuvreFault,
  formatManoeuvreSerious,
  optionalBoolean,
  formatManoeuvreDangerous,
  optional,
  addIfSet,
} from './data-mapper';

export const mapCatCEData = (result: ResultUpload): DataField[] => {
  const t = result.testResult.testData;

  const catCDataFields: DataField[] = mapCatCData(result);

  const m: DataField[] = [...catCDataFields,
    field('UNCOUPLE_RECOUPLE_TOTAL', formatManoeuvreFault(t, 'uncoupleRecouple.fault')),
    field('UNCOUPLE_RECOUPLE_SERIOUS', formatManoeuvreSerious(t, 'uncoupleRecouple.fault')),
    field('UNCOUPLE_RECOUPLE_DANGEROUS', formatManoeuvreDangerous(t, 'uncoupleRecouple.fault')),
    field('UNCOUPLE_RECOUPLE_COMPLETED', optionalBoolean(t, 'uncoupleRecouple.selected')),
  ];
  // Optional Fields
  addIfSet(m , 'UNCOUPLE_RECOUPLE_COMMENT', optional(t, 'uncoupleRecouple.faultComments', null));

  return m;
};
