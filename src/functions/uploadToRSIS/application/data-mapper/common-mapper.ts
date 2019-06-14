import { ResultUpload } from '../result-client';
import { field, optionalBoolean, optional, mandatory, MissingTestResultDataError, addIfSet } from './data-mapper';
import moment = require('moment');
import { get } from 'lodash';
import {
  DataField,
  ChannelIndicator,
  Gender,
  BooleanAsNumber,
  ResultIndicator,
  Language,
} from '../../domain/mi-export-data';
import { ApplicationReference } from '@dvsa/mes-test-schema/categories/B';

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

    //  REC_TYPE                                           NUMBER(1)
    //  REC_NO                                             NUMBER(6)
    //  FORM_TYPE                                          NUMBER(1)
    field('DRIVING_SCHOOL_CANDIDATE', optionalBoolean(result, 'testResult.vehicleDetails.schoolCar')),
    field('SPECIAL_NEEDS', optionalBoolean(result, 'testResult.testSummary.D255')),
    field('APP_REF_NO', formatAppRef(result.testResult.journalData.applicationReference)),
    // DRIVER_NO_DOB                                      NUMBER(6)
    field('DATE_OF_TEST', testDateTime.format('YY:MM:DD')),
    field('TIME', testDateTime.format('HH:mm')),
    field('DTC_AUTHORITY_CODE', result.testResult.journalData.testCentre.costCode),
    field('STAFF_NO', result.testResult.journalData.examiner.staffNumber),

    // Note: when we add functionality for examiner to change the test cetegory (e.g. candidate turned up with
    // wrong size vehicle, and test still goes ahead) this field is what the test category is changed to
    field('TEST_CATEGORY_TYPE', result.testResult.category),

    field('AUTOMATIC_TEST', formatGearboxCategory(result)),
    field('EXTENDED_TEST', optionalBoolean(result, 'testResult.journalData.testSlotAttributes.extendedTest')),
    field('TEST_TYPE', formatTestType(result)),
    // ADI_NUMBER is optional field set below
    // ADI_REF_CODE                                       VARCHAR2(3)
    field('ACCOMPANIED_BY_DSA', optionalBoolean(result, 'testResult.accompaniment.supervisor')),
    field('ACCOMPANIED_BY_ADI', optionalBoolean(result, 'testResult.accompaniment.ADI')),
    field('ACCOMPANIED_BY_INTERPRETER', 0), // missing - sign language interpreter
    field('ACCOMPANIED_BY_OTHER', optionalBoolean(result, 'testResult.accompaniment.other')),
    field('VISITING_EXAMINER', 0), // missing - visiting examiner

    // Note: if we add functionality to transfer tests at short notice (without telling TARS)
    // then set this change marker to true
    field('SHORT_NOTICE_EXAMINER', 0),

    field('TEST_RESULT', formatResult(result)),
    field('TOTAL_FAULTS', optional(result, 'testResult.testData.faultSummary.totalDrivingFaults', 0)),

    // Note: use 87 for a failed test (as per current paper/scanning behaviour)
    // as detailed by Steve Holmes
    // TODO: check this with Dave Giles, is route mandatory?
    field('ROUTE_NUMBER', optional(result, 'testResult.testSummary.routeNumber', 87)),

    field('EXAMINER_ACTION_VERBAL', optionalBoolean(result, 'testResult.testData.ETA.verbal')),
    field('EXAMINER_ACTION_PHYSICAL', optionalBoolean(result, 'testResult.testData.ETA.physical')),
    field('DUAL_CONTROL_IND', optionalBoolean(result, 'testResult.vehicleDetails.dualControls')),
    //  SURVEY_A_IND                                       VARCHAR2(1)
    //  SURVEY_B_IND                                       VARCHAR2(1)
    //  SURVEY_C_IND                                       VARCHAR2(1)
    //  SURVEY_D_IND                                       VARCHAR2(1)
    //  SURVEY_E_IND                                       VARCHAR2(1)
    //  SURVEY_F_IND                                       VARCHAR2(1)
    //  SURVEY_G_IND                                       VARCHAR2(1)
    //  SURVEY_H_IND                                       VARCHAR2(1)
    field('DEBRIEF_GIVEN', 1), // debrief always given, if refused that is recorded in comments
    field('ACTIVITY_CODE', Number(result.testResult.activityCode)),
    // PASS_CERTIFICATE optional field set below
    field('LICENCE_RECEIVED', optionalBoolean(result, 'testResult.passCompletion.provisionalLicenceProvided')),
    field('DOB', new Date('1974-12-24')), // missing
    field('CANDIDATE_FORENAMES', mandatory(result, 'testResult.journalData.candidate.candidateName.firstName')),
    field('GENDER', Gender.Male), // missing
    field('CANDIDATE_INDIVIDUAL_ID', mandatory(result, 'testResult.journalData.candidate.candidateId')),
    field('CANDIDATE_POST_CODE', mandatory(result, 'testResult.journalData.candidate.candidateAddress.postcode')),
    field('CANDIDATE_SURNAME', mandatory(result, 'testResult.journalData.candidate.candidateName.lastName')),
    field('CANDIDATE_TITLE', mandatory(result, 'testResult.journalData.candidate.candidateName.title')),
    field('DRIVER_NUMBER', mandatory(result, 'testResult.journalData.candidate.driverNumber')),
    // EXAMINER_FORENAMES                                 VARCHAR2(50)
    field('EXAMINER_PERSON_ID', 1234), // missing
    //  EXAMINER_POST_CODE                                 VARCHAR2(8)
    //  EXAMINER_SURNAME                                   VARCHAR2(50)
    //  EXAMINER_TITLE                                     VARCHAR2(20)

    // Note: when we add functionality for examiner to change the test cetegory (e.g. candidate turned up with
    // wrong size vehicle, and test still goes ahead) this field is what the test category is changed to
    field('TEST_CATEGORY_REF', result.testResult.category),

    //  TEST_CENTRE_AREA_COST_CODE                         VARCHAR2(4)
    //  TEST_CENTRE_AREA_NAME                              VARCHAR2(50)
    //  TEST_CENTRE_COUNTRY_DESC                           VARCHAR2(20)
    //  TEST_CENTRE_COUNTRY_ID                             NUMBER(9)
    field('TEST_CENTRE_ID', result.testResult.journalData.testCentre.centreId),
    //  TEST_CENTRE_LOCAL_AUTH_CODE                        VARCHAR2(6)
    //  TEST_CENTRE_LOCAL_AUTH_ID                          NUMBER(9)
    //  TEST_CENTRE_LOCAL_AUTH_NAME                        VARCHAR2(20)
    // ** CHECK IF NEEDED ** TEST_CENTRE_NAME  VARCHAR2(50)
    //  TEST_CENTRE_SECTOR_AREA_ID                         NUMBER(9)
    //  TEST_CENTRE_SECTOR_DESC                            VARCHAR2(50)
    //  TEST_CENTRE_SECTOR_ID                              NUMBER(9)
    //  TEST_CENTRE_MAIN_COST_CODE                         VARCHAR2(6)
    //  TEST_CENTRE_MAIN_LA_ID                             NUMBER(9)
    field('VEHICLE_SLOT_TYPE', result.testResult.journalData.testSlotAttributes.vehicleSlotType),
    field('WELSH_FORM_IND', formatLanguage(result)),
    //  IMAGE_REFERENCE                                    VARCHAR2(24)
    //  DATA_VALIDATION_FLAGS                              VARCHAR2(1500)
    //  AUDIT_DATA                                         CLOB
    //  TOTAL_DATA_KEYSTROKES                              NUMBER(6)
    //  TOTAL_FUNCTION_KEYSTROKES                          NUMBER(6)
    field('ETHNICITY', 'A'), // missing
    //  COA_LICENCE                                        NUMBER
    //  NO_LICENCE                                         NUMBER
    field('VEHICLE_REGISTRATION', mandatory(result, 'testResult.vehicleDetails.registrationNumber')),
    field('ECO_SAFE_COMPLETED', optionalBoolean(result, 'testResult.testData.eco.completed')), // ???
    field('ECO_SAFE_CONTROL', optionalBoolean(result, 'testResult.testData.eco.adviceGivenControl')),
    // ??? ECO_SAFE_COVERED                                   NUMBER(1)
    field('ECO_SAFE_PLANNING', optionalBoolean(result, 'testResult.testData.eco.adviceGivenPlanning')),

//  INSTRUCTOR_CERT                                    NUMBER(7)
//  MC_AVOIDANCE_DANGEROUS                             NUMBER(1)
//  MC_AVOIDANCE_L                                     NUMBER(1)
//  MC_AVOIDANCE_R                                     NUMBER(1)
//  MC_AVOIDANCE_SERIOUS                               NUMBER(1)
//  MC_AVOIDANCE_SPEED_FIRST                           NUMBER(2)
//  MC_AVOIDANCE_SPEED_NOT_MET                         NUMBER(1)
//  MC_AVOIDANCE_SPEED_SECOND                          NUMBER(2)
//  MC_AVOIDANCE_TOTAL                                 NUMBER(2)
//  MC_BENDS_DANGEROUS                                 NUMBER(1)
//  MC_BENDS_SERIOUS                                   NUMBER(1)
//  MC_BENDS_TOTAL                                     NUMBER(2)
//  MC_DL196_CBT_CERT_NO                               NUMBER(8)
//  MC_EMERGENCY_STOP_SPEED_FIRST                      NUMBER(2)
//  MC_EMERGENCY_STOP_SPEED_SECOND                     NUMBER(2)
//  MC_EMER_STOP_SPEED_NOT_MET                         NUMBER(1)
//  MC_MANUAL_HANDLING_DANGEROUS                       NUMBER(1)
//  MC_MANUAL_HANDLING_SERIOUS                         NUMBER(1)
//  MC_MANUAL_HANDLING_TOTAL                           NUMBER(2)
//  MC_SLALOM_DANGEROUS                                NUMBER(1)
//  MC_SLALOM_SERIOUS                                  NUMBER(1)
//  MC_SLALOM_TOTAL                                    NUMBER(2)
//  MC_SLOW_CONTROL_DANGEROUS                          NUMBER(1)
//  MC_SLOW_CONTROL_SERIOUS                            NUMBER(1)
//  MC_SLOW_CONTROL_TOTAL                              NUMBER(2)
//  MC_USE_OF_STAND_DANGEROUS                          NUMBER(1)
//  MC_USE_OF_STAND_SERIOUS                            NUMBER(1)
//  MC_USE_OF_STAND_TOTAL                              NUMBER(2)
//  MC_UTURN_DANGEROUS                                 NUMBER(1)
//  MC_UTURN_SERIOUS                                   NUMBER(1)
//  MC_UTURN_TOTAL                                     NUMBER(2)
//  SPARE6_DANGEROUS                                   NUMBER(1)
//  SPARE6_SERIOUS                                     NUMBER(1)
//  SPARE6_TOTAL                                       NUMBER(2)
  ];

  // add the optional fields, only if set
  addIfSet(mappedFields, 'ADI_NUMBER', formatInstructorPRN(result));
  addIfSet(mappedFields, 'PASS_CERTIFICATE', optional(result, 'testResult.passCompletion.passCertificateNumber', null));

  return mappedFields;
};

/**
 * Formats application reference as a single number, of the form <``app-id``><``book-seq``><``check-digit``>.
 *
 * @param appRef The application reference
 * @returns The app id, booking sequence and check digit as a single digit
 */
const formatAppRef = (appRef: ApplicationReference): number => {
  return Number(appRef.applicationId.toString() +
                appRef.bookingSequence.toString() +
                appRef.checkDigit.toString());
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
