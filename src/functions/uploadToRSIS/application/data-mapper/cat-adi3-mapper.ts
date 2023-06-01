import { formatApplicationReference } from '@dvsa/mes-microservice-common/domain/tars';
import moment = require('moment');

import { ResultUpload } from '../result-client';
import { ChannelIndicator, DataField, FormType } from '../../domain/mi-export-data';
import { addIfSet, field, mandatory, optional, optionalBoolean } from './data-mapper';
import {
  formatDateOfBirth,
  formatResult,
  formatRekeyDateTime,
  formatTestType, formatLanguage, ftaActivityCode,
} from './common-mapper';
import { get } from 'lodash';
import { formatIpadIssueReason, formatRekeyReason } from './rekey-reason-mapper';
import { trimTestCategoryPrefix } from '@dvsa/mes-microservice-common/domain/trim-test-category-prefix';
import { formatGearboxCategory } from '../helpers/shared-formatters';
import { TestData as CatADI3TestData } from '@dvsa/mes-test-schema/categories/ADI3';

export const mapCatADI3Data = (result: ResultUpload): DataField[] => {
  const testResult = result.testResult;
  const testDateTime = moment(testResult.journalData.testSlotAttributes.start, 'YYYY-MM-DDTHH:mm:ss');
  const candidateDOB = moment(formatDateOfBirth(result)).format('YYMMDD');

  const mappedFields: DataField[] = [

    // Test Details
    field('APP_REF_NO', formatApplicationReference(testResult.journalData.applicationReference)),
    field('TEST_TYPE', formatTestType(result)),
    field('ADI_PRN', mandatory(testResult, 'journalData.candidate.prn')),
    field('CHANNEL_INDICATOR', testResult.rekey ? ChannelIndicator.MES_REKEY : ChannelIndicator.MES),
    field('FORM_TYPE', FormType.MES),
    field('DATE_OF_TEST', testDateTime.format('YYMMDD')),
    field('TIME', testDateTime.format('HHmm')),
    field('DEBRIEF_WITNESSED', optionalBoolean(testResult, 'testSummary.debriefWitnessed')),
    // debrief is always given (even to explain why test is being terminated), unless candidate didn't turn up
    field('TEST_CATEGORY_TYPE', trimTestCategoryPrefix(testResult.category)),
    field('WELSH_FORM_IND', formatLanguage(result)),
    field('PDI_LOGBOOK', optionalBoolean(testResult, 'trainerDetails.pdiLogbook')),
    field('TRAINEE_LICENCE', optionalBoolean(testResult, 'trainerDetails.traineeLicence')),
    field('EXTENDED_TEST', optionalBoolean(testResult, 'journalData.testSlotAttributes.extendedTest')),
    field('SHORT_NOTICE_EXAMINER', optionalBoolean(testResult, 'changeMarker')),
    field('VEHICLE_SLOT_TYPE', testResult.journalData.testSlotAttributes.vehicleTypeCode),
    field('NO_WRITE_UP', result.autosaved),

    // Test outcome
    field('ACTIVITY_CODE', Number(testResult.activityCode)),

    // Candidate/trainer
    field('CANDIDATE_INDIVIDUAL_ID', mandatory(testResult, 'journalData.candidate.candidateId')),
    field('CANDIDATE_SURNAME', mandatory(testResult, 'journalData.candidate.candidateName.lastName')),
    // CANDIDATE_FORNAMES is optional field set below
    // DRIVER_NO_DOB is optional field set below
    // ETHNICITY is optional field set below
    field('DRIVER_NUMBER', mandatory(testResult, 'journalData.candidate.driverNumber')),
    // CANDIDATE_POST_CODE is optional field set below
    // CANDIDATE_TITLE is optional field set below
    // ETHNICITY is optional field set below
    // GENDER is optional field set below

    // Vehicle
    // VEHICLE_REGISTRATION is optional field set below
    field('DUAL_CONTROL_IND', optionalBoolean(testResult, 'vehicleDetails.dualControls')),
    // AUTOMATIC_TEST is optional field set below

    // Examiner and location
    field('BOOKED_STAFF_NO', mandatory(testResult, 'examinerBooked').toString()),
    field('KEYED_STAFF_NO', mandatory(testResult, 'examinerKeyed').toString()),
    field('STAFF_NO', mandatory(testResult, 'examinerConducted').toString()),
    field('DTC_AUTHORITY_CODE', get(testResult, 'journalData.testCentre.costCode', null)),
    field('TEST_CENTRE_ID', get(testResult, 'journalData.testCentre.centreId', null)),

    // communication
    // COMMUNICATION_METHOD is optional field set below
    // COMMUNICATION_EMAIL is optional field set below

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

    // ACCOMPANIED_BY_SUPERVISOR is optional field set below
    // ACCOMPANIED_BY_TRAINER is optional field set below
    // ACCOMPANIED_BY_OTHER is optional field set below
    field('TEST_RESULT', formatResult(result)),
    field('INSURANCE_DECLARATION_ACCEPTED',
          optionalBoolean(testResult, 'preTestDeclarations.insuranceDeclarationAccepted')),

    // Writeup
    // ADDITIONAL_INFORMATION is optional field set below

    // Rekey
    // REKEY_TIMESTAMP is optional field set below
    // REKEY_REASONS is optional field set below
    // IPAD_ISSUE_REASON is optional field set below
    // OTHER_REKEY_REASON is optional field set below
  ];

  // ADI3 optional fields

  // Candidate/trainer
  addIfSet(mappedFields, 'CANDIDATE_FORENAMES',
           optional(testResult, 'journalData.candidate.candidateName.firstName', null));
  addIfSet(mappedFields, 'DRIVER_NO_DOB', Number(candidateDOB));
  addIfSet(mappedFields, 'ETHNICITY', optional(testResult, 'journalData.candidate.ethnicityCode', null));
  addIfSet(mappedFields, 'CANDIDATE_POST_CODE',
           optional(testResult, 'journalData.candidate.candidateAddress.postcode', null));
  addIfSet(mappedFields, 'CANDIDATE_TITLE', optional(testResult, 'journalData.candidate.candidateName.title', null));
  addIfSet(mappedFields, 'GENDER', optional(testResult, 'journalData.candidate.gender', null));

  // Vehicle
  addIfSet(mappedFields, 'VEHICLE_REGISTRATION', optional(testResult, 'vehicleDetails.registrationNumber', null));
  addIfSet(mappedFields, 'AUTOMATIC_TEST', formatGearboxCategory(result));

  // Communication
  addIfSet(mappedFields, 'COMMUNICATION_METHOD',
           optional(testResult, 'communicationPreferences.communicationMethod', null));
  addIfSet(mappedFields, 'COMMUNICATION_EMAIL', optional(testResult, 'communicationPreferences.updatedEmail', null));

  // Report and Summary

  // SC specific fields
  addIfSet(mappedFields, 'VALID_CERTIFICATE', optionalBoolean(testResult, 'preTestDeclarations.validCertificate'));
  addIfSet(mappedFields, 'START_TIME', optional(testResult, 'testData.startTime', null));
  addIfSet(mappedFields, 'END_TIME', optional(testResult, 'testData.endTime', null));
  // ADI3 & SC specific fields
  addIfSet(mappedFields, 'STUDENT_LEVEL', optional(testResult, 'testData.lessonAndTheme.studentLevel', null));
  addIfSet(mappedFields, 'LESSON_THEMES', optional(testResult, 'testData.lessonAndTheme.lessonThemes', []).join('|'));
  addIfSet(mappedFields, 'OTHER_LESSON_THEME', optional(testResult, 'testData.lessonAndTheme.other', null));
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
  addIfSet(mappedFields, 'RISK_MANAGEMENT_SCORE',
           optional(testResult, 'testData.riskManagement.score', null));
  addIfSet(mappedFields, 'TEACHING_LEARNING_STRATS_1',
           optional(testResult, 'testData.teachingLearningStrategies.q1.score', null));
  addIfSet(mappedFields, 'TEACHING_LEARNING_STRATS_2',
           optional(testResult, 'testData.teachingLearningStrategies.q2.score', null));
  addIfSet(mappedFields, 'TEACHING_LEARNING_STRATS_3',
           optional(testResult, 'testData.teachingLearningStrategies.q3.score', null));
  addIfSet(mappedFields, 'TEACHING_LEARNING_STRATS_4',
           optional(testResult, 'testData.teachingLearningStrategies.q4.score', null));
  addIfSet(mappedFields, 'TEACHING_LEARNING_STRATS_5',
           optional(testResult, 'testData.teachingLearningStrategies.q5.score', null));
  addIfSet(mappedFields, 'TEACHING_LEARNING_STRATS_6',
           optional(testResult, 'testData.teachingLearningStrategies.q6.score', null));
  addIfSet(mappedFields, 'TEACHING_LEARNING_STRATS_7',
           optional(testResult, 'testData.teachingLearningStrategies.q7.score', null));
  addIfSet(mappedFields, 'TEACHING_LEARNING_STRATS_8',
           optional(testResult, 'testData.teachingLearningStrategies.q8.score', null));
  addIfSet(mappedFields, 'TEACHING_LEARNING_STRATS_SCORE',
           optional(testResult, 'testData.teachingLearningStrategies.score', null));
  addIfSet(mappedFields, 'TOTAL_SCORE', getTotalAssessmentScore(testResult.testData as CatADI3TestData));
  addIfSet(mappedFields, 'GRADE', optional(testResult, 'testData.review.grade', null));
  addIfSet(mappedFields, 'SEEK_FURTHER_DEV', optionalBoolean(testResult, 'testData.review.seekFurtherDevelopment'));
  addIfSet(mappedFields, 'REVIEW_FEEDBACK', optional(testResult, 'testData.review.feedback', null));
  addIfSet(mappedFields, 'RES_NO_ADVICE', optional(testResult, 'testData.review.reasonForNoAdviceGiven', null));
  addIfSet(mappedFields, 'ACCOMPANIED_BY_SUPERVISOR', optionalBoolean(testResult, 'accompaniment.supervisor'));
  addIfSet(mappedFields, 'ACCOMPANIED_BY_TRAINER', optionalBoolean(testResult, 'accompaniment.trainer'));
  addIfSet(mappedFields, 'ACCOMPANIED_BY_OTHER', optionalBoolean(testResult, 'accompaniment.other'));

  // Writeup
  addIfSet(mappedFields, 'ADDITIONAL_INFORMATION', optional(testResult, 'testSummary.additionalInformation', null));

  // Rekey
  addIfSet(mappedFields, 'REKEY_TIMESTAMP', formatRekeyDateTime(result));
  addIfSet(mappedFields, 'REKEY_REASONS', formatRekeyReason(optional(testResult, 'rekeyReason', null)));
  addIfSet(mappedFields, 'IPAD_ISSUE_REASON', formatIpadIssueReason(optional(testResult, 'rekeyReason', null)));
  addIfSet(mappedFields, 'OTHER_REKEY_REASON', optional(testResult, 'rekeyReason.other.reason', null));

  return mappedFields;
};

const getTotalAssessmentScore = (testData: CatADI3TestData) : number => {
  return Object.keys(testData).reduce((sum, key: string) : number => {
    const value = get(testData, key);
    if (['lessonPlanning', 'riskManagement', 'teachingLearningStrategies'].includes(key) && typeof value === 'object') {
      return sum + (get(value, 'score') || 0);
    }
    return sum;
  },                                  0);
};
