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

/**
 * Maps data common to all test categories.
 *
 * @param result The MES test result
 * @returns The mapped MI Export data
 * @throws MissingTestResultDataError If mandatory data missing from MES test result
 */
export const mapCommonData = (result: ResultUpload): DataField[] => {

  // test slot start date time from TARS is in local timezone, not UTC
  const testDateTime = moment(result.testResult.journalData.testSlotAttributes.start, 'YYYY-MM-DDTHH:mm:ss');

  const mappedFields: DataField[] = [
    // Note: when we add rekey functionality to MES, we should set this to MES_REKEY when relevant
    field('CHANNEL_INDICATOR', ChannelIndicator.MES),

    //  unused - REC_TYPE
    //  unused - REC_NO
    field('FORM_TYPE', FormType.MES),
    field('DRIVING_SCHOOL_CANDIDATE', optionalBoolean(result, 'testResult.vehicleDetails.schoolCar')),
    field('SPECIAL_NEEDS', optionalBoolean(result, 'testResult.testSummary.D255')),
    field('APP_REF_NO', formatApplicationReference(result.testResult.journalData.applicationReference)),
    // unused - DRIVER_NO_DOB
    field('DATE_OF_TEST', testDateTime.format('YYMMDD')),
    field('TIME', testDateTime.format('HHmm')),
    field('DTC_AUTHORITY_CODE', result.testResult.journalData.testCentre.costCode),
    field('STAFF_NO', result.testResult.journalData.examiner.staffNumber),

    // Note: when we add functionality for examiner to change the test cetegory (e.g. candidate turned up with
    // wrong size vehicle, and test still goes ahead) this field is what the test category is changed to
    field('TEST_CATEGORY_TYPE', result.testResult.category),

    field('AUTOMATIC_TEST', formatGearboxCategory(result)),
    field('EXTENDED_TEST', optionalBoolean(result, 'testResult.journalData.testSlotAttributes.extendedTest')),
    field('TEST_TYPE', formatTestType(result)),
    // ADI_NUMBER is optional field set below
    // unused - ADI_REF_CODE
    field('ACCOMPANIED_BY_DSA', optionalBoolean(result, 'testResult.accompaniment.supervisor')),
    field('ACCOMPANIED_BY_ADI', optionalBoolean(result, 'testResult.accompaniment.ADI')),
    field('ACCOMPANIED_BY_INTERPRETER', optionalBoolean(result, 'testResult.accompaniment.interpreter')),
    field('ACCOMPANIED_BY_OTHER', optionalBoolean(result, 'testResult.accompaniment.other')),
    field('VISITING_EXAMINER', optionalBoolean(result, 'testResult.journalData.testSlotAttributes.examinerVisiting')),

    // Note: if we add functionality to transfer tests at short notice (without telling TARS)
    // then set this change marker to true
    field('SHORT_NOTICE_EXAMINER', 0),

    field('TEST_RESULT', formatResult(result)),
    field('TOTAL_FAULTS', optional(result, 'testResult.testData.faultSummary.totalDrivingFaults', 0)),

    // Note: use 99 if no route recorded (e.g. if test terminated early/eyesight failed)
    field('ROUTE_NUMBER', optional(result, 'testResult.testSummary.routeNumber', 99)),

    field('EXAMINER_ACTION_VERBAL', optionalBoolean(result, 'testResult.testData.ETA.verbal')),
    field('EXAMINER_ACTION_PHYSICAL', optionalBoolean(result, 'testResult.testData.ETA.physical')),
    field('DUAL_CONTROL_IND', optionalBoolean(result, 'testResult.vehicleDetails.dualControls')),
    //  unused - SURVEY_A_IND
    //  unused - SURVEY_B_IND
    //  unused - SURVEY_C_IND
    //  unused - SURVEY_D_IND
    //  unused - SURVEY_E_IND
    //  unused - SURVEY_F_IND
    //  unused - SURVEY_G_IND
    //  unused - SURVEY_H_IND
    field('DEBRIEF_WITNESSED', optionalBoolean(result, 'testResult.testSummary.debriefWitnessed')),

    // debrief is always given (even to explain why test is being terminated), unless candidate didn't turn up
    field('DEBRIEF_GIVEN', result.testResult.category === '51' ? 0 : 1),

    field('ACTIVITY_CODE', Number(result.testResult.activityCode)),
    // PASS_CERTIFICATE is optional field set below
    field('LICENCE_RECEIVED', optionalBoolean(result, 'testResult.passCompletion.provisionalLicenceProvided')),
    field('DOB', formatDateOfBirth(result)),
    field('CANDIDATE_FORENAMES', mandatory(result, 'testResult.journalData.candidate.candidateName.firstName')),
    field('GENDER', mandatory(result, 'testResult.journalData.candidate.gender')),
    field('CANDIDATE_INDIVIDUAL_ID', mandatory(result, 'testResult.journalData.candidate.candidateId')),
    field('CANDIDATE_POST_CODE', mandatory(result, 'testResult.journalData.candidate.candidateAddress.postcode')),
    field('CANDIDATE_SURNAME', mandatory(result, 'testResult.journalData.candidate.candidateName.lastName')),
    field('CANDIDATE_TITLE', mandatory(result, 'testResult.journalData.candidate.candidateName.title')),
    field('DRIVER_NUMBER', mandatory(result, 'testResult.journalData.candidate.driverNumber')),
    // unused - EXAMINER_FORENAMES
    // unused - EXAMINER_PERSON_ID
    // unused - EXAMINER_POST_CODE
    // unused - EXAMINER_SURNAME
    // unused - EXAMINER_TITLE

    // Note: when we add functionality for examiner to change the test cetegory (e.g. candidate turned up with
    // wrong size vehicle, and test still goes ahead) this field is what the test category is changed to
    field('TEST_CATEGORY_REF', result.testResult.category),

    // unused - TEST_CENTRE_AREA_COST_CODE
    // unused - TEST_CENTRE_AREA_NAME
    // unused - TEST_CENTRE_COUNTRY_DESC
    // unused - TEST_CENTRE_COUNTRY_ID
    field('TEST_CENTRE_ID', result.testResult.journalData.testCentre.centreId),
    // unused - TEST_CENTRE_LOCAL_AUTH_CODE
    // unused - TEST_CENTRE_LOCAL_AUTH_ID
    // unused - TEST_CENTRE_LOCAL_AUTH_NAME
    // unused - TEST_CENTRE_NAME
    // unused - TEST_CENTRE_SECTOR_AREA_ID
    // unused - TEST_CENTRE_SECTOR_DESC
    // unused - TEST_CENTRE_SECTOR_ID
    // unused - TEST_CENTRE_MAIN_COST_CODE
    // unused - TEST_CENTRE_MAIN_LA_ID
    field('VEHICLE_SLOT_TYPE', 'C'), // TODO: read real vehicle_type_code in journal extract
    field('WELSH_FORM_IND', formatLanguage(result)),
    // unused - IMAGE_REFERENCE
    // unused - DATA_VALIDATION_FLAGS
    // unused - AUDIT_DATA
    // unused - TOTAL_DATA_KEYSTROKES
    // unused - TOTAL_FUNCTION_KEYSTROKES
    field('ETHNICITY', 'A'), // TODO: missing
    // unused - COA_LICENCE
    // unused - NO_LICENCE
    field('VEHICLE_REGISTRATION', mandatory(result, 'testResult.vehicleDetails.registrationNumber')),
    field('ECO_SAFE_COMPLETED', optionalBoolean(result, 'testResult.testData.eco.completed')),
    field('ECO_SAFE_CONTROL', optionalBoolean(result, 'testResult.testData.eco.adviceGivenControl')),
    // unused - ECO_SAFE_COVERED
    field('ECO_SAFE_PLANNING', optionalBoolean(result, 'testResult.testData.eco.adviceGivenPlanning')),
    // unused - INSTRUCTOR_CERT
  ];

  // add the optional fields, only if set
  addIfSet(mappedFields, 'ADI_NUMBER', formatInstructorPRN(result));
  addIfSet(mappedFields, 'PASS_CERTIFICATE', optional(result, 'testResult.passCompletion.passCertificateNumber', null));

  return mappedFields;
};

/**
 * Converts from gearbox category to "is automatic" as a boolean (as a number).
 *
 * @param result The MES test result
 * @returns ``1`` if automatic, ``0`` otherwise
 * @throws MissingTestResultDataError If vehicle details not set
 */
const formatGearboxCategory = (result: ResultUpload): BooleanAsNumber => {
  const gearboxCategory = get(result, 'testResult.vehicleDetails.gearboxCategory', null);
  if (gearboxCategory) {
    return gearboxCategory === 'Manual' ? 0 : 1;
  }

  throw new MissingTestResultDataError('testResult.vehicleDetails.gearboxCategory');
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
