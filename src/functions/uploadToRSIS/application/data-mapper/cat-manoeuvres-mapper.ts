import {ResultUpload} from '../result-client';
import {DataField} from '../../domain/mi-export-data';
import {
  addIfSet,
  field,
  formatManoeuvreComment,
  formatManoeuvreDangerous,
  formatManoeuvreFault,
  formatManoeuvreSerious,
  optional,
  optionalBoolean,
} from './data-mapper';
import {CategoryCode, TestResultCommonSchema} from '@dvsa/mes-test-schema/categories/common';
import {CatCMUniqueTypes} from '@dvsa/mes-test-schema/categories/CM';
import {TestCategory} from '@dvsa/mes-test-schema/category-definitions/common/test-category';

export const mapCatManoeuvresData = (result: ResultUpload): DataField[] => {
  const t = (result.testResult as Required<TestResultCommonSchema>).testData as CatCMUniqueTypes.TestData;
  const category = (result.testResult as Required<TestResultCommonSchema>).category;

  const m: DataField[] = [
    // Manoeuvres
    field('REV_LEFT_TRAIL_CONT_SERIOUS', formatManoeuvreSerious(t, 'manoeuvres.reverseManoeuvre.controlFault')),
    field('REV_LEFT_TRAIL_OBSERV_SERIOUS', formatManoeuvreSerious(t, 'manoeuvres.reverseManoeuvre.observationFault')),
    field('REV_LEFT_TRAIL_CONT_DANGEROUS', formatManoeuvreDangerous(t, 'manoeuvres.reverseManoeuvre.controlFault')),
    field('REV_LEFT_TRAIL_OBSER_DANGEROUS',
          formatManoeuvreDangerous(t, 'manoeuvres.reverseManoeuvre.observationFault')),
    field('REV_LEFT_TRAIL_COMPLETED', optionalBoolean(t, 'manoeuvres.reverseManoeuvre.selected')),
  ];

  const extendedTestFields: DataField[] = [
    // Uncouple recouple
    field('UNCOUPLE_RECOUPLE_SERIOUS', formatManoeuvreSerious(t, 'uncoupleRecouple.fault')),
    field('UNCOUPLE_RECOUPLE_DANGEROUS', formatManoeuvreDangerous(t, 'uncoupleRecouple.fault')),
    field('UNCOUPLE_RECOUPLE_COMPLETED', optionalBoolean(t, 'uncoupleRecouple.selected')),
  ];

  // add the optional fields, only if set
  addIfSet(m, 'UNCOUPLE_RECOUPLE_COMMENT', optional(t, 'uncoupleRecouple.faultComments', null));
  addIfSet(m, 'REV_LEFT_TRAIL_CONT_COMMENT',
           formatManoeuvreComment(t, 'manoeuvres.reverseManoeuvre.controlFaultComments'));
  addIfSet(m, 'REV_LEFT_TRAIL_OBSERV_COMMENT',
           formatManoeuvreComment(t, 'manoeuvres.reverseManoeuvre.observationFaultComments'));

  return [
    ...m,
    ...(isExtendedTest(category) ? extendedTestFields : []),
  ];
};

const isExtendedTest = (category: CategoryCode): boolean => {
  return (
    category === TestCategory.CEM ||
    category === TestCategory.DEM ||
    category === TestCategory.C1EM ||
    category === TestCategory.D1EM
  );
};
