import { ResultUpload } from '../result-client';
import { field, optionalBoolean, optional, mandatory, MissingTestResultDataError, addIfSet } from './data-mapper';
import moment = require('moment');
import { get } from 'lodash';
import {
  DataField,
  ChannelIndicator,
  BooleanAsNumber,
  ResultIndicator,
  Language,
  FormType,
} from '../../domain/mi-export-data';
import { formatApplicationReference } from '@dvsa/mes-microservice-common/domain/tars';
import { formatRekeyReason, formatIpadIssueReason } from './rekey-reason-mapper';

/**
 * Maps data common to all test categories.
 *
 * @param result The MES test result
 * @returns The mapped MI Export data
 * @throws MissingTestResultDataError If mandatory data missing from MES test result
 */
export const mapCommonData = (result: ResultUpload): DataField[] => {

  const r = result.testResult;

  // test slot start date time from TARS is in local timezone, not UTC
  const testDateTime = moment(r.journalData.testSlotAttributes.start, 'YYYY-MM-DDTHH:mm:ss');
  const mappedFields: DataField[] = [
    field('CHANNEL_INDICATOR', r.rekey ? ChannelIndicator.MES_REKEY : ChannelIndicator.MES),
    //  unused - REC_TYPE
    //  unused - REC_NO
    field('FORM_TYPE', FormType.MES),
    field('DRIVING_SCHOOL_CANDIDATE', optionalBoolean(r, 'vehicleDetails.schoolCar')),
    field('SPECIAL_NEEDS', optionalBoolean(r, 'testSummary.D255')),
    field('APP_REF_NO', formatApplicationReference(r.journalData.applicationReference)),
    // unused - DRIVER_NO_DOB
    field('DATE_OF_TEST', testDateTime.format('YYMMDD')),
    field('TIME', testDateTime.format('HHmm')),
    field('DTC_AUTHORITY_CODE', r.journalData.testCentre.costCode),

    // Note: when we add functionality for examiner to change the test cetegory (e.g. candidate turned up with
    // wrong size vehicle, and test still goes ahead) this field is what the test category is changed to
    field('TEST_CATEGORY_TYPE', r.category),

    field('AUTOMATIC_TEST', formatGearboxCategory(result)),
    field('EXTENDED_TEST', optionalBoolean(r, 'journalData.testSlotAttributes.extendedTest')),
    field('TEST_TYPE', formatTestType(result)),
    // ADI_NUMBER is optional field set below
    // unused - ADI_REF_CODE
    field('ACCOMPANIED_BY_DSA', optionalBoolean(r, 'accompaniment.supervisor')),
    field('ACCOMPANIED_BY_ADI', optionalBoolean(r, 'accompaniment.ADI')),
    field('ACCOMPANIED_BY_INTERPRETER', optionalBoolean(r, 'accompaniment.interpreter')),
    field('ACCOMPANIED_BY_OTHER', optionalBoolean(r, 'accompaniment.other')),
    field('VISITING_EXAMINER', optionalBoolean(r, 'journalData.testSlotAttributes.examinerVisiting')),

    // Note: if we add functionality to transfer tests at short notice (without telling TARS)
    // then set this change marker to true
    field('SHORT_NOTICE_EXAMINER', optionalBoolean(r, 'changeMarker')),

    field('BOOKED_STAFF_NO', mandatory(r, 'examinerBooked').toString()),
    field('STAFF_NO', mandatory(r, 'examinerConducted').toString()),
    field('KEYED_STAFF_NO', mandatory(r, 'examinerKeyed').toString()),

    field('TEST_RESULT', formatResult(result)),
    field('TOTAL_FAULTS', optional(r, 'testData.faultSummary.totalDrivingFaults', 0)),

    // Note: use 99 if no route recorded (e.g. if test terminated early/eyesight failed)
    field('ROUTE_NUMBER', optional(r, 'testSummary.routeNumber', 99)),

    field('EXAMINER_ACTION_VERBAL', optionalBoolean(r, 'testData.ETA.verbal')),
    field('EXAMINER_ACTION_PHYSICAL', optionalBoolean(r, 'testData.ETA.physical')),
    field('DUAL_CONTROL_IND', optionalBoolean(r, 'vehicleDetails.dualControls')),
    //  unused - SURVEY_A_IND
    //  unused - SURVEY_B_IND
    //  unused - SURVEY_C_IND
    //  unused - SURVEY_D_IND
    //  unused - SURVEY_E_IND
    //  unused - SURVEY_F_IND
    //  unused - SURVEY_G_IND
    //  unused - SURVEY_H_IND
    field('DEBRIEF_WITNESSED', optionalBoolean(r, 'testSummary.debriefWitnessed')),

    // debrief is always given (even to explain why test is being terminated), unless candidate didn't turn up
    field('DEBRIEF_GIVEN', r.category === '51' ? 0 : 1),

    field('ACTIVITY_CODE', Number(r.activityCode)),
    // PASS_CERTIFICATE is optional field set below
    field('LICENCE_RECEIVED', optionalBoolean(r, 'passCompletion.provisionalLicenceProvided')),
    field('DOB', formatDateOfBirth(result)),
    field('CANDIDATE_FORENAMES', mandatory(r, 'journalData.candidate.candidateName.firstName')),
    field('CANDIDATE_INDIVIDUAL_ID', mandatory(r, 'journalData.candidate.candidateId')),
    field('CANDIDATE_POST_CODE', mandatory(r, 'journalData.candidate.candidateAddress.postcode')),
    field('CANDIDATE_SURNAME', mandatory(r, 'journalData.candidate.candidateName.lastName')),
    field('CANDIDATE_TITLE', mandatory(r, 'journalData.candidate.candidateName.title')),
    field('DRIVER_NUMBER', mandatory(r, 'journalData.candidate.driverNumber')),
    // unused - EXAMINER_FORENAMES
    // unused - EXAMINER_PERSON_ID
    // unused - EXAMINER_POST_CODE
    // unused - EXAMINER_SURNAME
    // unused - EXAMINER_TITLE

    // Note: when we add functionality for examiner to change the test cetegory (e.g. candidate turned up with
    // wrong size vehicle, and test still goes ahead) this field is what the test category is changed to
    field('TEST_CATEGORY_REF', r.category),

    // unused - TEST_CENTRE_AREA_COST_CODE
    // unused - TEST_CENTRE_AREA_NAME
    // unused - TEST_CENTRE_COUNTRY_DESC
    // unused - TEST_CENTRE_COUNTRY_ID
    field('TEST_CENTRE_ID', r.journalData.testCentre.centreId),
    // unused - TEST_CENTRE_LOCAL_AUTH_CODE
    // unused - TEST_CENTRE_LOCAL_AUTH_ID
    // unused - TEST_CENTRE_LOCAL_AUTH_NAME
    // unused - TEST_CENTRE_NAME
    // unused - TEST_CENTRE_SECTOR_AREA_ID
    // unused - TEST_CENTRE_SECTOR_DESC
    // unused - TEST_CENTRE_SECTOR_ID
    // unused - TEST_CENTRE_MAIN_COST_CODE
    // unused - TEST_CENTRE_MAIN_LA_ID
    field('VEHICLE_SLOT_TYPE', r.journalData.testSlotAttributes.vehicleTypeCode),
    field('WELSH_FORM_IND', formatLanguage(result)),
    // unused - IMAGE_REFERENCE
    // unused - DATA_VALIDATION_FLAGS
    // unused - AUDIT_DATA
    // unused - TOTAL_DATA_KEYSTROKES
    // unused - TOTAL_FUNCTION_KEYSTROKES
    // ETHNICITY is optional field set below
    // unused - COA_LICENCE
    // unused - NO_LICENCE
    // VEHICLE_REGISTRATION is optional field set below
    field('ECO_SAFE_COMPLETED', optionalBoolean(r, 'testData.eco.completed')),
    field('ECO_SAFE_CONTROL', optionalBoolean(r, 'testData.eco.adviceGivenControl')),
    // unused - ECO_SAFE_COVERED
    field('ECO_SAFE_PLANNING', optionalBoolean(r, 'testData.eco.adviceGivenPlanning')),
    // unused - INSTRUCTOR_CERT
    field('INSURANCE_DECLARATION_ACCEPTED', optionalBoolean(r, 'preTestDeclarations.insuranceDeclarationAccepted')),
    field('RESIDENCY_DECLARATION_ACCEPTED', optionalBoolean(r, 'preTestDeclarations.residencyDeclarationAccepted')),
    field('HEALTH_DECLARATION_ACCEPTED', optionalBoolean(r, 'postTestDeclarations.healthDeclarationAccepted')),
    field('PASS_CERT_RECEIVED', optionalBoolean(r, 'postTestDeclarations.passCertificateNumberReceived')),
    field('NO_WRITE_UP', result.autosaved),
  ];

  // add the optional fields, only if set
  addIfSet(mappedFields, 'ADI_NUMBER', formatInstructorPRN(result));
  addIfSet(mappedFields, 'PASS_CERTIFICATE', optional(r, 'passCompletion.passCertificateNumber', null));
  addIfSet(mappedFields, 'ETHNICITY', optional(r, 'journalData.candidate.ethnicityCode', null));
  addIfSet(mappedFields, 'GENDER', optional(r, 'journalData.candidate.gender', null));
  addIfSet(mappedFields, 'VEHICLE_REGISTRATION', optional(r, 'vehicleDetails.registrationNumber', null)),
  addIfSet(mappedFields, 'CANDIDATE_PHYSICAL_DESCRIPTION', optional(r, 'testSummary.candidateDescription', null));
  addIfSet(mappedFields, 'WEATHER_CONDITIONS', optional(r, 'testSummary.weatherConditions', []).join('|'));
  addIfSet(mappedFields, 'CANDIDATE_IDENTIFICATION', optional(r, 'testSummary.identification', null));
  addIfSet(mappedFields, 'ADDITIONAL_INFORMATION', optional(r, 'testSummary.additionalInformation', null));
  addIfSet(mappedFields, 'COMMUNICATION_METHOD', optional(r, 'communicationPreferences.communicationMethod', null));
  addIfSet(mappedFields, 'COMMUNICATION_EMAIL', optional(r, 'communicationPreferences.updatedEmail', null));

  addIfSet(mappedFields, 'REKEY_TIMESTAMP', formatRekeyDateTime(result));
  addIfSet(mappedFields, 'REKEY_REASONS', formatRekeyReason(optional(r, 'rekeyReason', null)));
  addIfSet(mappedFields, 'IPAD_ISSUE_REASON', formatIpadIssueReason(optional(r, 'rekeyReason', null)));
  addIfSet(mappedFields, 'OTHER_REKEY_REASON', optional(r, 'rekeyReason.other.reason', null));

  return mappedFields;
};

/**
 * Converts from gearbox category (if any) to "is automatic" as a boolean (as a number).
 *
 * @param result The MES test result
 * @returns ``1`` if automatic, ``0`` otherwise
 */
const formatGearboxCategory = (result: ResultUpload): BooleanAsNumber => {
  const gearboxCategory = get(result, 'testResult.vehicleDetails.gearboxCategory', 'Manual');
  return gearboxCategory === 'Manual' ? 0 : 1;
};

/**
 * Formats the DL25 test type, calculated from the type of test (regular, CPC) and test category (B, C, D etc).
 *
 * @param result The MES test result
 * @returns The DL25 test type
 * @throws Error if unsupported type of test
 */
const formatTestType = (result: ResultUpload): number => {

  // DL25 test category to test type mapping, as per the TARS TEST_CATEGORY_CROSS_REFERENCE table,
  // documented at https://wiki.i-env.net/display/MES/Test+Category+Cross+Reference and agreed with DVSA MI Team.
  const mapping: Map<string, number> = new Map([
    ['ADI2', 10],
    ['B', 2], ['B+E', 2],
    ['C', 3], ['C+E', 3], ['C1', 3], ['C1+E', 3],
    ['D', 4], ['D+E', 4], ['D1', 4], ['D1+E', 4],
    ['F', 5],
    ['G', 6],
    ['H', 7],
    ['K', 8],
    // Note that some extra data will be needed in MES to indentify CPC tests, if MES adds support for them...
    // LGV (Lorry) CPC (all C Categories) => 44
    // PCV (Bus) CPC (all D Categories) => 44
    ['A1M1', 16], ['A1M2', 1],
    ['A2M1', 16], ['A2M2', 1],
    ['AM1', 16], ['AM2', 1],
    ['AMM1', 17], ['AMM2', 9],
  ]);

  const vehicleCategory = result.testResult.category;
  const testType = mapping.get(vehicleCategory);

  if (testType) {
    return testType;
  }
  throw new Error(`Unsupported test category ${vehicleCategory}`);
};

/**
 * Formats optional instructor PRN as a string.
 *
 * @param result The MES test result
 * @returns The PRN (as a string), or ``null``
 */
const formatInstructorPRN = (result: ResultUpload): string | null => {
  const prn: number | null = get(result, 'testResult.instructorDetails.registrationNumber', null);
  if (prn) {
    return prn.toString();
  }
  return null;
};

/**
 * Formats the test result.
 *
 * @param result The MES test result
 * @returns The result (pass/fail/none)
 */
const formatResult = (result: ResultUpload): ResultIndicator => {
  const activityCode = Number(result.testResult.activityCode);
  if (activityCode === 1) {
    return ResultIndicator.Pass;
  }

  if (activityCode >= 2 && activityCode <= 5) {
    return ResultIndicator.Fail;
  }

  return ResultIndicator.None;
};

/**
 * Formats the language.
 *
 * @param result The MES test result
 * @returns The language indicator
 */
const formatLanguage = (result: ResultUpload): Language => {
  const language = get(result, 'testResult.communicationPreferences.conductedLanguage', null);
  if (language) {
    if (language === 'English') {
      return Language.English;
    }
    return Language.Welsh;
  }
  throw new MissingTestResultDataError('testResult.communicationPreferences.conductedLanguage');
};

/**
 * Formats the candidate's date of birth.
 *
 * @param result The MES test result
 * @returns The language indicator
 */
const formatDateOfBirth = (result: ResultUpload): Date => {
  const dob = get(result, 'testResult.journalData.candidate.dateOfBirth', null);
  if (dob) {
    return moment(dob, 'YYYY-MM-DD').toDate();
  }
  throw new MissingTestResultDataError('testResult.journalData.candidate.dateOfBirth');
};

/**
 * Formats the candidate's date of birth.
 *
 * @param result The MES test result
 * @returns The language indicator
 */
const formatRekeyDateTime = (result: ResultUpload): Date|null => {
  const rekeyDateText = get(result, 'testResult.rekeyDate', null);
  if (rekeyDateText) {
    return  moment(rekeyDateText, 'YYYY-MM-DDTHH:mm:ss').toDate();
  }
  return null;
};
