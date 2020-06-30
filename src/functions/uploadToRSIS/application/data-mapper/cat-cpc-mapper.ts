import { ResultUpload } from '../result-client';
import { DataField, FormType } from '../../domain/mi-export-data';
import { TestData, TestResultCatCPCSchema, ActivityCode } from '@dvsa/mes-test-schema/categories/CPC';
import { addIfSet, field, mandatory, optional, optionalBoolean } from './data-mapper';
import { formatApplicationReference } from '@dvsa/mes-microservice-common/domain/tars';
import moment = require('moment');
import { formatDateOfBirth, formatResult, formatLanguage, ftaActivityCode } from './common-mapper';

export const mapCatCPCData = (result: ResultUpload): DataField[] => {
  const testResult = result.testResult as TestResultCatCPCSchema;
  const t: TestData = result.testResult.testData as TestData;
  const testDateTime = moment(testResult.journalData.testSlotAttributes.start, 'YYYY-MM-DDTHH:mm:ss');
  const candidateDOB = moment(formatDateOfBirth(result)).format('YYMMDD');

  const m: DataField[] = [
    field('ACTIVITY_CODE', Number(testResult.activityCode)),
    // unused - ADI_PRN
    field('APP_REF_NO', formatApplicationReference(testResult.journalData.applicationReference)),
    field('C', optionalBoolean(testResult, 'changeMarker')),
    field('CANDIDATE_SURNAME', mandatory(testResult, 'journalData.candidate.candidateName.lastName')),
    field('CAT_TYPE', formatCPCTestCategory(testResult)),
    // unused - DATA_VALIDATION_FLAGS
    field('DATE_OF_TEST', testDateTime.format('YYMMDD')),
    field('DEBRIEF_GIVEN', testResult.activityCode === ftaActivityCode ? 0 : 1),
    field('DRIVER_NUMBER', mandatory(testResult, 'journalData.candidate.driverNumber')),
    field('DTC_AUTHORITY_CODE', testResult.journalData.testCentre.costCode),
    // unused - EXAMINER_FORENAMES
    field('EXAMINER_PERSON_ID', testResult.journalData.examiner.staffNumber),
    // unused - EXAMINER_SURNAME
    field('FORM_TYPE', FormType.CPC),
    // unused - IMAGE_REFERENCE
    // unused - INSTRUCTOR_CERT
    field('INT', optionalBoolean(testResult, 'accompaniment.interpreter')),
    // unused - REC_NO
    // unused - REC_TYPE
    // unused - REG_NO
    // SEC1
    field('SEC1_MARK1', optionalBoolean(t, 'question1.answer1.selected')),
    field('SEC1_MARK2', optionalBoolean(t, 'question1.answer2.selected')),
    field('SEC1_MARK3', optionalBoolean(t, 'question1.answer3.selected')),
    field('SEC1_MARK4', optionalBoolean(t, 'question1.answer4.selected')),
    field('SEC1_PERCENT_SCORE', optional(t, 'question1.score', 0)),
    // SEC2
    field('SEC2_MARK1', optionalBoolean(t, 'question2.answer1.selected')),
    field('SEC2_MARK2', optionalBoolean(t, 'question2.answer2.selected')),
    field('SEC2_MARK3', optionalBoolean(t, 'question2.answer3.selected')),
    field('SEC2_MARK4', optionalBoolean(t, 'question2.answer4.selected')),
    field('SEC2_PERCENT_SCORE', optional(t, 'question2.score', 0)),
    // SEC3
    field('SEC3_MARK1', optionalBoolean(t, 'question3.answer1.selected')),
    field('SEC3_MARK2', optionalBoolean(t, 'question3.answer2.selected')),
    field('SEC3_MARK3', optionalBoolean(t, 'question3.answer3.selected')),
    field('SEC3_MARK4', optionalBoolean(t, 'question3.answer4.selected')),
    field('SEC3_PERCENT_SCORE', optional(t, 'question3.score', 0)),
    // SEC4
    field('SEC4_MARK1', optionalBoolean(t, 'question4.answer1.selected')),
    field('SEC4_MARK2', optionalBoolean(t, 'question4.answer2.selected')),
    field('SEC4_MARK3', optionalBoolean(t, 'question4.answer3.selected')),
    field('SEC4_MARK4', optionalBoolean(t, 'question4.answer4.selected')),
    field('SEC4_PERCENT_SCORE', optional(t, 'question4.score', 0)),
    // SEC5
    field('SEC5_MARK1', optionalBoolean(t, 'question5.answer1.selected')),
    field('SEC5_MARK2', optionalBoolean(t, 'question5.answer2.selected')),
    field('SEC5_MARK3', optionalBoolean(t, 'question5.answer3.selected')),
    field('SEC5_MARK4', optionalBoolean(t, 'question5.answer4.selected')),
    field('SEC5_MARK5', optionalBoolean(t, 'question5.answer5.selected')),
    field('SEC5_MARK6', optionalBoolean(t, 'question5.answer6.selected')),
    field('SEC5_MARK7', optionalBoolean(t, 'question5.answer7.selected')),
    field('SEC5_MARK8', optionalBoolean(t, 'question5.answer8.selected')),
    field('SEC5_MARK9', optionalBoolean(t, 'question5.answer9.selected')),
    field('SEC5_MARK10', optionalBoolean(t, 'question5.answer10.selected')),
    field('SEC5_PERCENT_SCORE', optional(t, 'question5.score', 0)),
    field('STAFF_NO', testResult.journalData.examiner.staffNumber),
    field('SUP', optionalBoolean(testResult, 'accompaniment.supervisor')),
    field('TEST_CATEGORY_TYPE', 'CPC'),
    field('TEST_CENTRE_ID', testResult.journalData.testCentre.centreId),
    // unused - TEST_CENTRE_NAME
    // unused - TEST_CENTRE_SECTOR_AREA_ID
    // unused - TEST_CENTRE_SECTOR_DESC
    // unused - TEST_CENTRE_SECTOR_ID
    field('TEST_RESULT', formatResult(result)),
    field('TIME', testDateTime.format('HHmm')),
    // unused - TOTAL_DATA_KEYSTROKES
    // unused - TOTAL_FUNCTION_KEYSTROKES
    field('TOTAL_PERCENT', optional(t, 'totalPercent', 0)),
    field('WELSH_FORM_IND', formatLanguage(result)),
  ];

  // add the optional fields, only if set
  // field('SEC1_Q_NO', optional(t, 'question1.questionCode', ''));
  // field('SEC2_Q_NO', optional(t, 'question2.questionCode', '')),
  //   field('SEC3_Q_NO', optional(t, 'question3.questionCode', '')),
  //   field('SEC4_Q_NO', optional(t, 'question4.questionCode', '')),
  //   field('SEC5_Q_NO', optional(t, 'question5.questionCode', '')),

  addIfSet(m, 'SEC1_Q_NO', optional(t, 'question1.questionCode', null));
  addIfSet(m, 'SEC2_Q_NO', optional(t, 'question2.questionCode', null));
  addIfSet(m, 'SEC3_Q_NO', optional(t, 'question3.questionCode', null));
  addIfSet(m, 'SEC4_Q_NO', optional(t, 'question4.questionCode', null));
  addIfSet(m, 'SEC5_Q_NO', optional(t, 'question5.questionCode', null));

  addIfSet(m, 'CANDIDATE_FORENAMES', optional(testResult, 'journalData.candidate.candidateName.firstName', null));
  addIfSet(m, 'DRIVER_NO_DOB', candidateDOB);
  addIfSet(m, 'ETHNICITY', optional(testResult, 'journalData.candidate.ethnicityCode', null));
  addIfSet(m, 'PASS_CERTIFICATE', optional(testResult, 'passCompletion.passCertificateNumber', null));
  addIfSet(m, 'VEHICLE_REGISTRATION', optional(testResult, 'vehicleDetails.registrationNumber', null));
  addIfSet(m, 'COMBINATION', formatCPCCombinationCode(t));

  return m;
};

export const formatCPCTestCategory = (result: TestResultCatCPCSchema): string => {
  return result.category.substring(0, 1);
};

const formatCPCCombinationCode = (testData: TestData): string | null =>  {
  return testData.combination ? testData.combination.replace(/[^0-9]/g, '') : null;
};