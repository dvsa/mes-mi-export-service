import { formatApplicationReference } from '@dvsa/mes-microservice-common/domain/tars';
import moment = require('moment');

import { ResultUpload } from '../result-client';
import { ChannelIndicator, DataField, FormType } from '../../domain/mi-export-data';
import { addIfSet, field, mandatory, optional, optionalBoolean } from './data-mapper';
import { formatDateOfBirth, formatResult, formatLanguage, ftaActivityCode, formatRekeyDateTime } from './common-mapper';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { get } from 'lodash';
import { formatIpadIssueReason, formatRekeyReason } from './rekey-reason-mapper';
import { trimTestCategoryPrefix } from '@dvsa/mes-microservice-common/domain/trim-test-category-prefix';
import { formatGearboxCategory } from '../helpers/shared-formatters';
import { TestData as CatADI3TestData } from '@dvsa/mes-test-schema/categories/ADI3';

export const mapCatADI3Data = (result: ResultUpload): DataField[] => {
  const testResult = result.testResult;
  // const t: CatADI3TestData = testResult.testData as CatADI3TestData;
  const testDateTime = moment(testResult.journalData.testSlotAttributes.start, 'YYYY-MM-DDTHH:mm:ss');
  const candidateDOB = moment(formatDateOfBirth(result)).format('YYMMDD');

  const mappedFields: DataField[] = [

    // Test Details
    field('APP_REF_NO', formatApplicationReference(testResult.journalData.applicationReference)),
    field('ADI_PRN', mandatory(testResult, 'journalData.candidate.prn')),
    field('CHANNEL_INDICATOR', testResult.rekey ? ChannelIndicator.MES_REKEY : ChannelIndicator.MES),
    field('DATE_OF_TEST', testDateTime.format('YYMMDD')),
    field('DEBRIEF_WITNESSED', optionalBoolean(testResult, 'testSummary.debriefWitnessed')),
    field('TEST_CATEGORY_TYPE', trimTestCategoryPrefix(testResult.category)),
    field('PDI_LOGBOOK', mandatory(testResult, 'trainerDetails.pdiLogbook')),
    field('TRAINEE_LICENCE', mandatory(testResult, 'trainerDetails.traineeLicence')),

    // Test outcome
    field('ACTIVITY_CODE', Number(testResult.activityCode)),

    // Candidate/trainer
    field('CANDIDATE_SURNAME', mandatory(testResult, 'journalData.candidate.candidateName.lastName')),
    // CANDIDATE_FORNAMES is optional field set below
    // DRIVER_NO_DOB is optional field set below
    // ETHNICITY is optional field set below
    field('DRIVER_NUMBER', mandatory(testResult, 'journalData.candidate.driverNumber')),

    // Vehicle
    // VEHICLE_REGISTRATION is optional field set below
    field('DUAL_CONTROL_IND', optionalBoolean(testResult, 'vehicleDetails.dualControls')),
    field('AUTOMATIC_TEST', formatGearboxCategory(result)),

    // Report and Summary
    // STUDENT_LEVEL is optional field set below
    // LESSON_THEME is optional field set below
    // LESSON_THEME_OTHER is optional field set below
    // LESSON_PLAN_1 is optional field set below
    // LESSON_PLAN_2 is optional field set below
    // LESSON_PLAN_3 is optional field set below
    // LESSON_PLAN_4 is optional field set below
    // LESSON_PLAN_SCORE is optional field set below
    // RISK_MANAGEMENT_1 is optional field set below
    // RISK_MANAGEMENT_2 is optional field set below
    // RISK_MANAGEMENT_3 is optional field set below
    // RISK_MANAGEMENT_4 is optional field set below
    // RISK_MANAGEMENT_5 is optional field set below
    // RISK_MANAGEMENT_SCORE is optional field set below
    // TEACHING_LEARNING_STRATS_1 is optional field set below
    // TEACHING_LEARNING_STRATS_2 is optional field set below
    // TEACHING_LEARNING_STRATS_3 is optional field set below
    // TEACHING_LEARNING_STRATS_4 is optional field set below
    // TEACHING_LEARNING_STRATS_5 is optional field set below
    // TEACHING_LEARNING_STRATS_6 is optional field set below
    // TEACHING_LEARNING_STRATS_7 is optional field set below
    // TEACHING_LEARNING_STRATS_8 is optional field set below
    // TEACHING_LEARNING_STRATS_SCORE is optional field set below
    // TOTAL_SCORE is optional field set below
    // GRADE is optional field set below

    // SEEK_FURTHER_DEV is optional field set below
    // REVIEW_FEEDBACK is optional field set below
    // RES_NO_ADVICE is optional field set below


    // _________________

    // // Examiner and location
    // field('EXAMINER_PERSON_ID', optional(testResult, 'journalData.examiner.individualId', 0)),
    // field('KEYED_PERSON_ID', mandatory(testResult, 'examinerKeyed').toString()),
    // field('STAFF_NO', mandatory(testResult, 'examinerConducted').toString()),
    // field('DTC_AUTHORITY_CODE', get(testResult, 'journalData.testCentre.costCode', null)),
    // field('TEST_CENTRE_ID', get(testResult, 'journalData.testCentre.centreId', null)),
    //
    // field('C', optionalBoolean(testResult, 'changeMarker')),
    // field('CAT_TYPE', formatCPCTestCategory(testResult)),
    // field('CHANNEL_INDICATOR', testResult.rekey ? ChannelIndicator.MES_REKEY : ChannelIndicator.MES),
    //
    //
    //
    //
    //
    //
    // // unused - DATA_VALIDATION_FLAGS
    // field('DATE_OF_TEST', testDateTime.format('YYMMDD')),
    // field('DEBRIEF_GIVEN', testResult.activityCode === ftaActivityCode ? 0 : 1),
    // field('DRIVER_NUMBER', mandatory(testResult, 'journalData.candidate.driverNumber')),
    // field('DTC_AUTHORITY_CODE', get(testResult, 'journalData.testCentre.costCode', null)),
    // // unused - EXAMINER_FORENAMES
    // field('EXAMINER_PERSON_ID', optional(testResult, 'journalData.examiner.individualId', 0)),
    // field('KEYED_PERSON_ID', mandatory(testResult, 'examinerKeyed').toString()),
    // // unused - EXAMINER_SURNAME
    // field('FORM_TYPE', FormType.CPC),
    // // unused - IMAGE_REFERENCE
    // // unused - INSTRUCTOR_CERT
    // field('INT', optionalBoolean(testResult, 'accompaniment.interpreter')),
    // // unused - REC_NO
    // // unused - REC_TYPE
    // // unused - REG_NO
    // // SEC1
    // field('SEC1_MARK1', optionalBoolean(t, 'question1.answer1.selected')),
    // field('SEC1_MARK2', optionalBoolean(t, 'question1.answer2.selected')),
    // field('SEC1_MARK3', optionalBoolean(t, 'question1.answer3.selected')),
    // field('SEC1_MARK4', optionalBoolean(t, 'question1.answer4.selected')),
    // field('SEC1_PERCENT_SCORE', optional(t, 'question1.score', 0)),
    // // SEC2
    // field('SEC2_MARK1', optionalBoolean(t, 'question2.answer1.selected')),
    // field('SEC2_MARK2', optionalBoolean(t, 'question2.answer2.selected')),
    // field('SEC2_MARK3', optionalBoolean(t, 'question2.answer3.selected')),
    // field('SEC2_MARK4', optionalBoolean(t, 'question2.answer4.selected')),
    // field('SEC2_PERCENT_SCORE', optional(t, 'question2.score', 0)),
    // // SEC3
    // field('SEC3_MARK1', optionalBoolean(t, 'question3.answer1.selected')),
    // field('SEC3_MARK2', optionalBoolean(t, 'question3.answer2.selected')),
    // field('SEC3_MARK3', optionalBoolean(t, 'question3.answer3.selected')),
    // field('SEC3_MARK4', optionalBoolean(t, 'question3.answer4.selected')),
    // field('SEC3_PERCENT_SCORE', optional(t, 'question3.score', 0)),
    // // SEC4
    // field('SEC4_MARK1', optionalBoolean(t, 'question4.answer1.selected')),
    // field('SEC4_MARK2', optionalBoolean(t, 'question4.answer2.selected')),
    // field('SEC4_MARK3', optionalBoolean(t, 'question4.answer3.selected')),
    // field('SEC4_MARK4', optionalBoolean(t, 'question4.answer4.selected')),
    // field('SEC4_PERCENT_SCORE', optional(t, 'question4.score', 0)),
    // // SEC5
    // field('SEC5_MARK1', optionalBoolean(t, 'question5.answer1.selected')),
    // field('SEC5_MARK2', optionalBoolean(t, 'question5.answer2.selected')),
    // field('SEC5_MARK3', optionalBoolean(t, 'question5.answer3.selected')),
    // field('SEC5_MARK4', optionalBoolean(t, 'question5.answer4.selected')),
    // field('SEC5_MARK5', optionalBoolean(t, 'question5.answer5.selected')),
    // field('SEC5_MARK6', optionalBoolean(t, 'question5.answer6.selected')),
    // field('SEC5_MARK7', optionalBoolean(t, 'question5.answer7.selected')),
    // field('SEC5_MARK8', optionalBoolean(t, 'question5.answer8.selected')),
    // field('SEC5_MARK9', optionalBoolean(t, 'question5.answer9.selected')),
    // field('SEC5_MARK10', optionalBoolean(t, 'question5.answer10.selected')),
    // field('SEC5_PERCENT_SCORE', optional(t, 'question5.score', 0)),
    // field('STAFF_NO', testResult.journalData.examiner.staffNumber),
    // field('SUP', optionalBoolean(testResult, 'accompaniment.supervisor')),
    // field('TEST_CATEGORY_TYPE', 'CPC'),
    // field('TEST_CENTRE_ID', get(testResult, 'journalData.testCentre.centreId', null)),
    // // unused - TEST_CENTRE_NAME
    // // unused - TEST_CENTRE_SECTOR_AREA_ID
    // // unused - TEST_CENTRE_SECTOR_DESC
    // // unused - TEST_CENTRE_SECTOR_ID
    // field('TEST_RESULT', formatResult(result)),
    // field('TIME', testDateTime.format('HHmm')),
    // // unused - TOTAL_DATA_KEYSTROKES
    // // unused - TOTAL_FUNCTION_KEYSTROKES
    // field('TOTAL_PERCENT', optional(t, 'totalPercent', 0)),
    // field('WELSH_FORM_IND', formatLanguage(result)),
    // field(
    //   'INSURANCE_DECLARATION_ACCEPTED',
    //   optionalBoolean(testResult, 'preTestDeclarations.insuranceDeclarationAccepted'),
    // ),
    // field(
    //   'RESIDENCY_DECLARATION_ACCEPTED',
    //   optionalBoolean(testResult, 'preTestDeclarations.residencyDeclarationAccepted'),
    // ),
    // field(
    //   'PASS_CERT_RECEIVED',
    //   optionalBoolean(testResult, 'postTestDeclarations.passCertificateNumberReceived'),
    // ),
  ];

  // ADI3 optional fields
  // Candidate/trainer
  addIfSet(mappedFields, 'CANDIDATE_FORENAMES',
           optional(testResult, 'journalData.candidate.candidateName.firstName', null)),
  addIfSet(mappedFields, 'DRIVER_NO_DOB', Number(candidateDOB)),
  addIfSet(mappedFields, 'ETHNICITY', optional(testResult, 'journalData.candidate.ethnicityCode', null)),

  // Communication
  addIfSet(mappedFields, 'COMMUNICATION_METHOD',
           optional(testResult, 'communicationPreferences.communicationMethod', null)),
  addIfSet(mappedFields, 'COMMUNICATION_EMAIL', optional(testResult, 'communicationPreferences.updatedEmail', null)),

  // Vehicle
  addIfSet(mappedFields, 'VEHICLE_REGISTRATION', optional(testResult, 'vehicleDetails.registrationNumber', null));

  // Report and Summary
  addIfSet(mappedFields, 'STUDENT_LEVEL', optional(testResult, 'testData.LessonAndTheme.studentLevel', null));
  addIfSet(mappedFields, 'LESSON_THEME', optional(testResult, 'testData.LessonAndTheme.lessonThemes', []).join('|'));
  addIfSet(mappedFields, 'LESSON_THEME_OTHER', optional(testResult, 'testData.LessonAndTheme.other', null));
  addIfSet(mappedFields, 'LESSON_PLAN_1', optional(testResult, 'testData.lessonPlanning.q1.score', null));
  addIfSet(mappedFields, 'LESSON_PLAN_2', optional(testResult, 'testData.lessonPlanning.q2.score', null));
  addIfSet(mappedFields, 'LESSON_PLAN_3', optional(testResult, 'testData.lessonPlanning.q3.score', null));
  addIfSet(mappedFields, 'LESSON_PLAN_4', optional(testResult, 'testData.lessonPlanning.q4.score', null));
  addIfSet(mappedFields, 'LESSON_PLAN_SCORE', optional(testResult, 'testData.lessonPlanning.score', null));
  addIfSet(mappedFields, 'RISK_MANAGEMENT_1', optional(testResult, 'testData.riskManagement.q1.score', null));
  addIfSet(mappedFields, 'RISK_MANAGEMENT_2', optional(testResult, 'testData.riskManagement.q2.score', null));
  addIfSet(mappedFields, 'RISK_MANAGEMENT_3', optional(testResult, 'testData.riskManagement.q3.score', null));
  addIfSet(mappedFields, 'RISK_MANAGEMENT_4', optional(testResult, 'testData.riskManagement.q4.score', null));
  addIfSet(mappedFields, 'RISK_MANAGEMENT_5', optional(testResult, 'testData.riskManagement.q5.score', null));
  addIfSet(mappedFields, 'RISK_MANAGEMENT_SCORE', optional(testResult, 'testData.riskManagement.score', null));
  addIfSet(mappedFields, 'TEACHING_LEARNING_STRATS_1', optional(testResult, 'testData.teachingLearningStrategies.q1.score', null));
  addIfSet(mappedFields, 'TEACHING_LEARNING_STRATS_2', optional(testResult, 'testData.teachingLearningStrategies.q2.score', null));
  addIfSet(mappedFields, 'TEACHING_LEARNING_STRATS_3', optional(testResult, 'testData.teachingLearningStrategies.q3.score', null));
  addIfSet(mappedFields, 'TEACHING_LEARNING_STRATS_4', optional(testResult, 'testData.teachingLearningStrategies.q4.score', null));
  addIfSet(mappedFields, 'TEACHING_LEARNING_STRATS_5', optional(testResult, 'testData.teachingLearningStrategies.q5.score', null));
  addIfSet(mappedFields, 'TEACHING_LEARNING_STRATS_6', optional(testResult, 'testData.teachingLearningStrategies.q6.score', null));
  addIfSet(mappedFields, 'TEACHING_LEARNING_STRATS_7', optional(testResult, 'testData.teachingLearningStrategies.q7.score', null));
  addIfSet(mappedFields, 'TEACHING_LEARNING_STRATS_8', optional(testResult, 'testData.teachingLearningStrategies.q8.score', null));
  addIfSet(mappedFields, 'TEACHING_LEARNING_STRATS_SCORE', optional(testResult, 'testData.teachingLearningStrategies.score', null));
  addIfSet(mappedFields, 'TOTAL_SCORE', getTotalAssessmentScore(testResult.testData as CatADI3TestData));
  addIfSet(mappedFields, 'GRADE', optional(testResult, 'testData.review.grade', null));
  addIfSet(mappedFields, 'SEEK_FURTHER_DEV', optional(testResult, 'testData.review.seekFurtherDevelopment', null));
  addIfSet(mappedFields, 'REVIEW_FEEDBACK', optional(testResult, 'testData.review.feedback', null));
  addIfSet(mappedFields, 'RES_NO_ADVICE', optional(testResult, 'testData.review.reasonForNoAdviceGiven', null));


  // add the optional fields, only if set
  // addIfSet(m, 'SEC1_Q_NO', formatCPCQuestionNumber(t, 1));
  // addIfSet(m, 'SEC2_Q_NO', formatCPCQuestionNumber(t, 2));
  // addIfSet(m, 'SEC3_Q_NO', formatCPCQuestionNumber(t, 3));
  // addIfSet(m, 'SEC4_Q_NO', formatCPCQuestionNumber(t, 4));
  // addIfSet(m, 'SEC5_Q_NO', formatCPCQuestionNumber(t, 5));
  //
  // addIfSet(m, 'CANDIDATE_FORENAMES', optional(testResult, 'journalData.candidate.candidateName.firstName', null));
  // addIfSet(m, 'DRIVER_NO_DOB', Number(candidateDOB));
  // addIfSet(m, 'ETHNICITY', optional(testResult, 'journalData.candidate.ethnicityCode', null));
  // addIfSet(m, 'PASS_CERTIFICATE', optional(testResult, 'passCompletion.passCertificateNumber', null));
  // addIfSet(m, 'VEHICLE_REGISTRATION', optional(testResult, 'vehicleDetails.registrationNumber', null));
  // addIfSet(m, 'COMBINATION', formatCPCCombinationCode(t));
  //
  // addIfSet(m, 'CANDIDATE_PHYSICAL_DESCRIPTION', optional(testResult, 'testSummary.candidateDescription', null));
  // addIfSet(m, 'CANDIDATE_IDENTIFICATION', optional(testResult, 'testSummary.identification', null));
  // addIfSet(m, 'ADDITIONAL_INFORMATION', optional(testResult, 'testSummary.additionalInformation', null));
  // addIfSet(m, 'ASSESSMENT_REPORT', optional(testResult, 'testSummary.assessmentReport', null));
  // addIfSet(m, 'VEHICLE_DETAILS', formatCPCVehicleDetails(testResult.category, testResult.vehicleDetails));
  //
  // addIfSet(m, 'REKEY_TIMESTAMP', formatRekeyDateTime(result));
  // addIfSet(m, 'REKEY_REASONS', formatRekeyReason(optional(testResult, 'rekeyReason', null)));
  // addIfSet(m, 'IPAD_ISSUE_REASON', formatIpadIssueReason(optional(testResult, 'rekeyReason', null)));
  // addIfSet(m, 'OTHER_REKEY_REASON', optional(testResult, 'rekeyReason.other.reason', null));
  //
  // addIfSet(m, 'COMMUNICATION_METHOD', optional(testResult, 'communicationPreferences.communicationMethod', null));
  // addIfSet(m, 'COMMUNICATION_EMAIL', optional(testResult, 'communicationPreferences.updatedEmail', null));

  return mappedFields;
};

const getTotalAssessmentScore = (testData: CatADI3TestData): number => {
  // @ts-ignore
  return Object.keys(testData).reduce((sum: number, key: keyof CatADI3TestData): number => {
    if (['lessonPlanning', 'riskManagement', 'teachingLearningStrategies'].includes(key) && typeof testData[key] === 'object') {
      return sum + (get(testData[key], 'score') || 0);
    }
    return sum;
  },                                  0);
};
