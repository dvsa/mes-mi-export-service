import moment = require('moment');
import { get } from 'lodash';
import { ApplicationReference } from '@dvsa/mes-test-schema/categories/B';
import {
  ChannelIndicator,
  MIExportTestResult,
  ResultIndicator,
  BooleanAsNumber,
  Gender,
  Language,
} from '../domain/mi-export-data';
import { ResultUpload } from '../application/result-client';
import { info } from '../../../common/application/utils/logger';

/**
 * Encapsulates a fatal error caused by mandatory data missing from the MES test result that we are trying to
 * export to MI.
 */
export class MissingTestResultDataError extends Error {
  constructor(fieldPath: string) {
    super(`Field ${fieldPath} is missing`);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = MissingTestResultDataError.name;
  }
}

/**
 * Maps data from MES test result (of various possible categories) to MI Export (suitable for RSIS).
 *
 * @param result The MES test result
 * @returns The mapped MI Export data
 * @throws MissingTestResultDataError If mandatory data missing from MES test result
 */
export const mapDataForMIExport = (result: ResultUpload): MIExportTestResult => {

  // test slot start date time from TARS is in local timezone, not UTC
  const testDateTime = moment(result.testResult.journalData.testSlotAttributes.start, 'YYYY-MM-DDTHH:mm:ss');

  const mappedResult: MIExportTestResult = {
    // Note: when we add rekey functionality to MES, we should set this to MES_REKEY when relevant
    channelIndicator: ChannelIndicator.MES,

    drivingSchoolCar: optionalBooleanAsNumber(result, 'testResult.vehicleDetails.schoolCar'),
    d255: optionalBooleanAsNumber(result, 'testResult.testSummary.D255'),
    applicationReference: formatAppRef(result.testResult.journalData.applicationReference),
    testDate: testDateTime.format('YY:MM:DD'),
    testTime: testDateTime.format('HH:mm'),
    testCentreCostCode: result.testResult.journalData.testCentre.costCode,
    staffNumber: result.testResult.journalData.examiner.staffNumber,

    // Note: when we add functionality for examiner to change the test cetegory (e.g. candidate turned up with
    // wrong size vehicle, and test still goes ahead) this field is what the test category is changed to
    testCategory: result.testResult.category,

    automatic: formatGearboxCategory(result),
    extended: optionalBooleanAsNumber(result, 'testResult.journalData.testSlotAttributes.extendedTest'),
    testType: formatTestType(result),
    instructorPRN: formatInstructorPRN(result),
    supervisorAccompanied: optionalBooleanAsNumber(result, 'testResult.accompaniment.supervisor'),
    instructorAccompanied: optionalBooleanAsNumber(result, 'testResult.accompaniment.ADI'),
    interpreterAccompanied: 0, // missing - sign language interpreter
    otherAccompanied: optionalBooleanAsNumber(result, 'testResult.accompaniment.other'),
    visitingExaminer: 0, // missing - visiting examiner

    // Note: if we add functionality to transfer tests at short notice (without telling TARS)
    // then set this change marker to true
    change: 0,

    // TODO: 1a eyesight .. element 5 - C

    result: formatResult(result),
    totalFaults: optional(result, 'testResult.testData.faultSummary.totalDrivingFaults', 0),

    // Note: use 87 for a failed test (as per current paper/scanning behaviour)
    // as detailed by Steve Holmes
    // TODO: check this with Dave Giles, is route mandatory?
    route: optional(result, 'testResult.testSummary.routeNumber', 87),

    etaVerbal: optionalBooleanAsNumber(result, 'testResult.testData.ETA.verbal'),
    etaPhysical: optionalBooleanAsNumber(result, 'testResult.testData.ETA.physical'),
    dualControls: optionalBooleanAsNumber(result, 'testResult.vehicleDetails.dualControls'),
    ecoAssessed: optionalBooleanAsNumber(result, 'testResult.testData.eco.completed'),
    ecoControl: optionalBooleanAsNumber(result, 'testResult.testData.eco.adviceGivenControl'),
    ecoPlanning: optionalBooleanAsNumber(result, 'testResult.testData.eco.adviceGivenPlanning'),
    debriefGiven: 1, // debrief always given, if refused that is recorded in comments
    activityCode: Number(result.testResult.activityCode),
    passCertificateNumber: optional(result, 'testResult.passCompletion.passCertificateNumber', null),
    licenseReceived: optionalBooleanAsNumber(result, 'testResult.passCompletion.provisionalLicenceProvided'),
    candidateDOB: new Date('1974-12-24'), // missing
    candidateForenames: mandatory(result, 'testResult.journalData.candidate.candidateName.firstName'),
    candidateGender: Gender.Male, // missing
    candidateIndividualId: mandatory(result, 'testResult.journalData.candidate.candidateId'),
    candidatePostCode: mandatory(result, 'testResult.journalData.candidate.candidateAddress.postcode'),
    candidateSurname: mandatory(result, 'testResult.journalData.candidate.candidateName.lastName'),
    candidateTitle: mandatory(result, 'testResult.journalData.candidate.candidateName.title'),
    driverNumber: mandatory(result, 'testResult.journalData.candidate.driverNumber'),
    examinerIndividualId: 1234, // missing

    // Note: when we add functionality for examiner to change the test cetegory (e.g. candidate turned up with
    // wrong size vehicle, and test still goes ahead) this field is what the test category is changed to
    bookedTestCategory: result.testResult.category,

    testCentreId: result.testResult.journalData.testCentre.centreId,
    testCentreName: 'Dummy', // missing - but not really needed??
    vehicleSlotType: result.testResult.journalData.testSlotAttributes.vehicleSlotType,
    language: Language.English, // missing - what language was used in the test
    ethnicityCode: 'A', // missing
    vehicleRegistration: mandatory(result, 'testResult.vehicleDetails.registrationNumber'),
  };

  return mappedResult;
};

/**
 * Get an optional value from the MES test result.
 *
 * @param object The MES test result
 * @param path The JSON object path to descend
 * @param defaultValue The default value to use, if not set
 * @returns The value found, or ``defaultValue``
 */
const optional = (object: any, path: string, defaultValue: any): any => {
  return get(object, path, defaultValue);
};

/**
 * Get an optional boolean value from the MES test result, converted to a number.
 *
 * @param object The MES test result
 * @param path The JSON object path to descend
 * @returns The value found, or ``0`` (meaning ``false``)
 */
const optionalBooleanAsNumber = (object: any, path: string): BooleanAsNumber => {
  return get(object, path, false) ? 1 : 0;
};

/**
 * Get a mandatory value from the MES test result, from an optional field that must have been populated in practice.
 *
 * @param object The MES test result
 * @param path The JSON object path to descend
 * @returns The value found
 * @throws MissingTestResultDataError If mandatory value missing
 */
const mandatory = (object: any, path: string): any => {
  const value = get(object, path, null);
  if (value) {
    return value;
  }

  throw new MissingTestResultDataError(path);
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
 * Formats gearbox category as a boolean (as a number).
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
  // Note that some extra data will be needed in MES to indentify CPC tests, if MES adds support for them...
  const mapping: Map<string, number> = new Map([
    ['ADI2', 10],
    ['B', 2], ['B+E', 2],
    ['C', 3], ['C+E', 3], ['C1', 3], ['C1+E', 3],
    ['D', 4], ['D+E', 4], ['D1', 4], ['D1+E', 4],
    ['F', 5],
    ['G', 6],
    ['H', 7],
    ['K', 8],
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
  // TODO: check this really is how we handle pass/fail/terminated
  const activityCode = Number(result.testResult.activityCode);
  if (activityCode === 1) {
    return ResultIndicator.Pass;
  }

  if (activityCode >= 2 && activityCode <= 5) {
    return ResultIndicator.Fail;
  }

  return ResultIndicator.None;
};
