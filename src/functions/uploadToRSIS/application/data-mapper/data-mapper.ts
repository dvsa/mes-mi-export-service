import { get } from 'lodash';
import { BooleanAsNumber, DataField, DataFieldValue } from '../../domain/mi-export-data';
import { ResultUpload } from '../result-client';
import { mapCommonData } from './common-mapper';
import { mapCatBData } from './cat-b-mapper';
import { mapCatCData } from './cat-c-mapper';
import { debug, error } from '@dvsa/mes-microservice-common/application/utils/logger';
import {
  ManoeuvreOutcome,
  TestData,
  QuestionOutcome,
  QuestionResult,
  FaultComments,
} from '@dvsa/mes-test-schema/categories/common/';
import { mapCatADI2Data } from './cat-adi2-mapper';
import { mapCatBEData } from './cat-be-mapper';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { mapCatC1Data } from './cat-c1-mapper';
import { mapCatCEData } from './cat-ce-mapper';
import { mapCatC1EData } from './cat-c1e-mapper';
import { mapCatDData } from './cat-d-mapper';
import { mapCatD1Data } from './cat-d1-mapper';
import { mapCatD1EData } from './cat-d1e-mapper';
import { mapCatDEData } from './cat-de-mapper';
import { mapCatAMod1Data } from './cat-a-mod1-mapper';
import { mapCatAMod2Data } from './cat-a-mod2-mapper';
import {
  TestData as CatAMod1TestData,
  SingleFaultCompetencyOutcome,
  TestResultCatAM1Schema,
} from '@dvsa/mes-test-schema/categories/AM1';
import { TestData as CatAMod2TestData } from '@dvsa/mes-test-schema/categories/AM2';
import { mapCatFData } from './cat-f-mapper';
import { mapCatKData } from './cat-k-mapper';
import { mapCatHData } from './cat-h-mapper';
import { mapCatGData } from './cat-g-mapper';
import { mapCatCPCData } from './cat-cpc-mapper';
import { mapCatManoeuvresData } from './cat-manoeuvres-mapper';

enum FaultLimit {
  TRAILER = 2,
  NON_TRAILER = 5,
}

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
export const mapDataForMIExport = (result: ResultUpload): DataField[] => {

  // map the data fields common to all test categories
  let mappedDataFields = mapCommonData(result);

  // then map the data fields relevant to the specific test category
  const category = result.testResult.category;

  switch (category) {
    case TestCategory.ADI2:
      mappedDataFields = mappedDataFields.concat(mapCatADI2Data(result));
      break;
    case TestCategory.B:
      mappedDataFields = mappedDataFields.concat(mapCatBData(result));
      break;
    case TestCategory.BE:
      mappedDataFields = mappedDataFields.concat(mapCatBEData(result));
      break;
    case TestCategory.C:
      mappedDataFields = mappedDataFields.concat(mapCatCData(result));
      break;
    case TestCategory.C1:
      mappedDataFields = mappedDataFields.concat(mapCatC1Data(result));
      break;
    case TestCategory.CE:
      mappedDataFields = mappedDataFields.concat(mapCatCEData(result));
      break;
    case TestCategory.C1E:
      mappedDataFields = mappedDataFields.concat(mapCatC1EData(result));
      break;
    case TestCategory.D:
      mappedDataFields = mappedDataFields.concat(mapCatDData(result));
      break;
    case TestCategory.D1:
      mappedDataFields = mappedDataFields.concat(mapCatD1Data(result));
      break;
    case TestCategory.DE:
      mappedDataFields = mappedDataFields.concat(mapCatDEData(result));
      break;
    case TestCategory.D1E:
      mappedDataFields = mappedDataFields.concat(mapCatD1EData(result));
      break;
    case TestCategory.EUA2M1:
    case TestCategory.EUA1M1:
    case TestCategory.EUAM1:
    case TestCategory.EUAMM1:
      mappedDataFields = mappedDataFields.concat(mapCatAMod1Data(result));
      break;
    case TestCategory.EUA1M2:
    case TestCategory.EUA2M2:
    case TestCategory.EUAM2:
    case TestCategory.EUAMM2:
      mappedDataFields = mappedDataFields.concat(mapCatAMod2Data(result));
      break;
    case TestCategory.F:
      mappedDataFields = mappedDataFields.concat(mapCatFData(result));
      break;
    case TestCategory.G:
      mappedDataFields = mappedDataFields.concat(mapCatGData(result));
      break;
    case TestCategory.H:
      mappedDataFields = mappedDataFields.concat(mapCatHData(result));
      break;
    case TestCategory.K:
      mappedDataFields = mappedDataFields.concat(mapCatKData(result));
      break;
    case TestCategory.CCPC:
    case TestCategory.DCPC:
      mappedDataFields = mapCatCPCData(result);
      break;
    case TestCategory.CM:
    case TestCategory.C1M:
    case TestCategory.CEM:
    case TestCategory.C1EM:
    case TestCategory.DM:
    case TestCategory.D1M:
    case TestCategory.DEM:
    case TestCategory.D1EM:
      mappedDataFields = mappedDataFields.concat(mapCatManoeuvresData(result));
      break;
    default:
      const message = `Unsupported Category: ${category}`;
      error(message);
      throw new Error(message);
      break;
  }

  // purely as a check for human error when maintaining data mappers in the future, or adding new mappers for
  // additional test categories, we check here that we don't have more than one mapping for the same column
  // (i.e. a developer mistake, but easily done given these are long lists of database column mappings)
  const duplicatedFields: Set<string> = new Set();
  mappedDataFields.forEach((fieldToCheck) => {
    if (mappedDataFields.filter((field) => {
      return field.col === fieldToCheck.col;
    }).length > 1) {
      duplicatedFields.add(fieldToCheck.col);
    }
  });
  if (duplicatedFields.size > 0) {
    const message = `Duplicate columns mapped: ${Array.from(duplicatedFields).join(', ')}`;
    error(message);
    throw new Error(message);
  }

  const mappingSummary = mappedDataFields.map((field, index) => {
    return `Field: ${index}\tColumn: ${field.col}\tValue: '${field.val}'`;
  }).join('\n');
  debug(`Mapped result ${JSON.stringify(result.uploadKey)} to ${mappedDataFields.length} fields:\n${mappingSummary}`);

  return mappedDataFields;
};

/**
 * Format a data field (column and value).
 *
 * @param column The column name
 * @param value The value
 * @returns The data field
 */
export const field = (column: string, value: DataFieldValue): DataField => {
  return { col: column, val: value };
};

/**
 * Adds a data field mapping, if the value is not ``null``.
 *
 * @param fields The array of fields to add to
 * @param column The column name
 * @param value The value, which might be ``null``
 */
export const addIfSet = (fields: DataField[], column: string, value: DataFieldValue | null) => {
  if (value) {
    fields.push({ col: column, val: value });
  }
};

/**
 * Get an optional value from the MES test result.
 *
 * @param object The MES test result
 * @param path The JSON object path to descend
 * @param defaultValue The default value to use, if not set
 * @returns The value found, or ``defaultValue``
 */
export const optional = (object: any, path: string, defaultValue: any): any => {
  return get(object, path, defaultValue);
};

/**
 * Get an optional boolean value from the MES test result, converted to a number.
 *
 * @param object The MES test result
 * @param path The JSON object path to descend
 * @returns The value found, or ``0`` (meaning ``false``)
 */
export const optionalBoolean = (object: any, path: string): BooleanAsNumber => {
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
export const mandatory = (object: any, path: string): any => {
  const value = get(object, path, null);
  if (value !== null) {
    return value;
  }

  throw new MissingTestResultDataError(path);
};

/**
 * Get the number of faults for the specified manoeuvre, if any.
 *
 * @param object The MES test result
 * @param path The JSON object path to descend, for the manoeuvre outcome
 * @returns The total number (can only be ``0`` or ``1``)
 */
export const formatManoeuvreFault = (object: any, path: string): BooleanAsNumber => {
  const outcome: ManoeuvreOutcome | null = get(object, path, null);
  if (outcome && outcome === 'DF') {
    return 1;
  }
  return 0;
};

/**
 * Determine if theres a DF outcome when multiple manoeuvres exist
 *
 * @param object: The MES test result
 * @param path: The path within the manoeuvre object
 * @param desiredOutcome: the ManoeuvreOutcome to match
 * @returns 1 if found and outcome matches desiredOutcome else 0
 */
export const formatMultipleManoeuvreFaults = (object: TestData,
                                              path: string,
                                              desiredOutcome: ManoeuvreOutcome): BooleanAsNumber => {
  const firstManoeuvre = get(object, `manoeuvres[0].${path}`, null);
  const secondManoeuvre = get(object, `manoeuvres[1].${path}`, null);
  const manoeuvre: ManoeuvreOutcome | null = firstManoeuvre ? firstManoeuvre : secondManoeuvre;

  if (manoeuvre && manoeuvre === desiredOutcome) {
    return 1;
  }
  return 0;
};

export const formatManoeuvreComment = (object: any, path: string): string | null => {
  const comment: FaultComments | null = get(object, path, null);
  return comment;
};

/**
 * Get the number of faults for show me and tell me questions (max is ``1``).
 *
 * @param object The MES test result
 * @returns The total number (can only be ``0`` or ``1``)
 */
export const formatQuestionFault = (testData: TestData | undefined): BooleanAsNumber => {
  const tellMeFaults: QuestionOutcome = get(testData, 'vehicleChecks.tellMeQuestion.outcome', 'P');
  const showMeFaults: QuestionOutcome = get(testData, 'vehicleChecks.showMeQuestion.outcome', 'P');
  if (tellMeFaults === 'DF' || showMeFaults === 'DF') {
    return 1;
  }
  return 0;
};

export const getCatAM2SafetyAndBalanceFaultCount =
  (testData: CatAMod2TestData | undefined): number => {
    const safetyQuestionOneOutcome = get(
      testData, 'safetyAndBalanceQuestions.safetyQuestions[0].outcome') === 'DF' ? 1 : 0;
    const safetyQuestionTwoOutcome = get(
      testData, 'safetyAndBalanceQuestions.safetyQuestions[1].outcome') === 'DF' ? 1 : 0;
    const balanceQuestionOneOutcome = get(
      testData, 'safetyAndBalanceQuestions.balanceQuestions[0].outcome') === 'DF' ? 1 : 0;
    return (safetyQuestionOneOutcome + safetyQuestionTwoOutcome + balanceQuestionOneOutcome) > 0 ? 1 : 0;
  };

export const formatQuestionFaultBE = (testData: TestData | undefined): number => {
  const totalFaults: number = getVehicleChecksFaultCountBE(testData);
  return totalFaults === 5 ? 4 : totalFaults;
};

/**
 * Gets the number of faults for show me and tell me questions for category ADI2
 * @param testData
 * @returns count of DF's for showme tellme questions
 */
export const formatQuestionFaultADI2 = (testData: TestData | undefined): number => {
  return getVehicleChecksFaultCountShowMeTellMe(testData);
};

/**
 * Gets the number of faults for show me tell me questions for category C and C1
 *
 * @param object The MES test result
 * @returns The boolean value (as a number)
 */
export const formatQuestionFaultC = (testData: TestData | undefined): number => {
  const totalFaults: number = getVehicleChecksFaultCountBE(testData);
  return totalFaults === 5 ? 4 : totalFaults;
};

/**
 * Gets the number of faults for show me tell me questions for category CE and C1E
 *
 * @param object The MES test result
 * @returns The boolean value (as a number)
 */
export const formatQuestionFaultCE = (testData: TestData | undefined): number => {
  const totalFaults: number = getVehicleChecksFaultCountBE(testData);
  const faultLimit: number = getVehicleCheckFaultLimit(testData);
  return (totalFaults === faultLimit) ? (faultLimit - 1) : totalFaults;
};

/**
 * Gets the number of faults for show me tell me questions for category D and D1
 *
 * @param object The MES test result
 * @returns The boolean value (as a number)
 */
export const formatQuestionFaultD = (testData: TestData | undefined): number => {
  const totalFaults: number = getVehicleChecksFaultCountBE(testData);
  return totalFaults === 5 ? 4 : totalFaults;
};

/**
 * Gets the number of faults for show me tell me questions for category F, G, H  and K
 *
 * @param object The MES test result
 * @returns The boolean value (as a number)
 */
export const formatQuestionFaultF = (testData: TestData | undefined): number => {
  const totalFaults: number = getVehicleChecksFaultCountF(testData);
  return totalFaults === 2 ? 1 : totalFaults;
};

/**
 * Gets the number of faults for show me tell me questions for category DE and D1E
 *
 * @param object The MES test result
 * @returns The boolean value (as a number)
 */
export const formatQuestionFaultDE = (testData: TestData | undefined): number => {
  const totalFaults: number = getVehicleChecksFaultCountBE(testData);
  const faultLimit: number = getVehicleCheckFaultLimit(testData);
  return (totalFaults === faultLimit) ? (faultLimit - 1) : totalFaults;
};

/**
 * Gets the number of serious faults for show me tell me questions for category D and D1
 *
 * @param object The MES test result
 * @returns The boolean value (as a number)
 */
export const formatQuestionSeriousD = (testData: TestData | undefined): number => {
  const totalFaults: number = getVehicleChecksFaultCountBE(testData);
  return totalFaults === 5 ? 1 : 0;
};

/**
 * Gets the number of serious faults for show me tell me questions for category DE and D1E
 *
 * @param object The MES test result
 * @returns The boolean value (as a number)
 */
export const formatQuestionSeriousDE = (testData: TestData | undefined): number => {
  const totalFaults: number = getVehicleChecksFaultCountBE(testData);
  const faultLimit: number = getVehicleCheckFaultLimit(testData);
  return (totalFaults === faultLimit) ? 1 : 0;
};

/**
 * Get whether there was a serious fault for the specified manoeuvre.
 *
 * @param object The MES test result
 * @param path The JSON object path to descend, for the manoeuvre outcome
 * @returns The boolean value (as a number)
 */
export const formatManoeuvreSerious = (object: any, path: string): BooleanAsNumber => {
  const outcome: ManoeuvreOutcome | null = get(object, path, null);
  if (outcome && outcome === 'S') {
    return 1;
  }
  return 0;
};

/**
 * Get whether there was a serious fault for show me or tell me question.
 *
 * @param object The MES test result
 * @returns The boolean value (as a number)
 */
export const formatQuestionSerious = (testData: TestData | undefined): BooleanAsNumber => {
  const tellMeFaults: QuestionOutcome = get(testData, 'vehicleChecks.tellMeQuestion.outcome', 'P');
  const showMeFaults: QuestionOutcome = get(testData, 'vehicleChecks.showMeQuestion.outcome', 'P');
  if (tellMeFaults === 'S' || showMeFaults === 'S') {
    return 1;
  }
  return 0;
};

export const formatQuestionSeriousBE = (testData: TestData | undefined): BooleanAsNumber => {
  const totalFaults: number = getVehicleChecksFaultCountBE(testData);
  return totalFaults === 5 ? 1 : 0;
};

/**
 * Gets the number of serious faults for show me tell me questions for category C and C1
 *
 * @param object The MES test result
 * @returns The boolean value (as a number)
 */
export const formatQuestionSeriousC = (testData: TestData | undefined): number => {
  const totalFaults: number = getVehicleChecksFaultCountBE(testData);
  return totalFaults === 5 ? 1 : 0;
};

/**
 * Gets the number of serious faults for show me tell me questions for category CE and C1E
 *
 * @param object The MES test result
 * @returns The boolean value (as a number)
 */
export const formatQuestionSeriousCE = (testData: TestData | undefined): number => {
  const totalFaults: number = getVehicleChecksFaultCountBE(testData);
  const faultLimit: number = getVehicleCheckFaultLimit(testData);
  return (totalFaults === faultLimit) ? 1 : 0;
};

export const getVehicleChecksFaultCountBE = (testData: TestData | undefined): number => {
  let totalFaults: number = 0;
  const tellMeFaults: QuestionResult[] = get(testData, 'vehicleChecks.tellMeQuestions', null);
  const showMeFaults: QuestionResult[] = get(testData, 'vehicleChecks.showMeQuestions', null);

  if (tellMeFaults) {
    totalFaults = totalFaults + tellMeFaults.filter(fault => fault.outcome === 'DF').length;
  }
  if (showMeFaults) {
    totalFaults = totalFaults + showMeFaults.filter(fault => fault.outcome === 'DF').length;
  }
  return totalFaults;
};

export const getVehicleChecksFaultCountF = (testData: TestData | undefined): number => {
  let totalFaults: number = 0;
  const tellMeFaults: QuestionResult[] = get(testData, 'vehicleChecks.tellMeQuestions', null);
  const showMeFaults: QuestionResult[] = get(testData, 'vehicleChecks.showMeQuestions', null);

  if (tellMeFaults) {
    totalFaults = totalFaults + tellMeFaults.filter(fault => fault.outcome === 'DF').length;
  }
  if (showMeFaults) {
    totalFaults = totalFaults + showMeFaults.filter(fault => fault.outcome === 'DF').length;
  }
  return totalFaults;
};

/**
 * Generic category function to count the number of DFs when multiple Show Me
 * Tell me questions are recorded
 * @param testData
 */
export const getVehicleChecksFaultCountShowMeTellMe = (testData: TestData | undefined): number => {
  let totalFaults: number = 0;
  const tellMeFaults: QuestionResult[] = get(testData, 'vehicleChecks.tellMeQuestions', null);
  const showMeFaults: QuestionResult[] = get(testData, 'vehicleChecks.showMeQuestions', null);

  if (tellMeFaults) {
    totalFaults = totalFaults + tellMeFaults.filter(fault => fault.outcome === 'DF').length;
  }
  if (showMeFaults) {
    totalFaults = totalFaults + showMeFaults.filter(fault => fault.outcome === 'DF').length;
  }
  return totalFaults;
};

/**
 * Get whether there was a dangerous fault for the specified manoeuvre.
 *
 * @param object The MES test result
 * @param path The JSON object path to descend, for the manoeuvre outcome
 * @returns The boolean value (as a number)
 */
export const formatManoeuvreDangerous = (object: any, path: string): BooleanAsNumber => {
  const outcome: ManoeuvreOutcome | null = get(object, path, null);
  if (outcome && outcome === 'D') {
    return 1;
  }
  return 0;
};

/**
 * Get whether there was a dangerous fault for show me or tell me question.
 *
 * @param object The MES test result
 * @returns The boolean value (as a number)
 */
export const formatQuestionDangerous = (testData: TestData | undefined): BooleanAsNumber => {
  const tellMeFaults: QuestionOutcome = get(testData, 'vehicleChecks.tellMeQuestion.outcome', 'P');
  const showMeFaults: QuestionOutcome = get(testData, 'vehicleChecks.showMeQuestion.outcome', 'P');
  if (tellMeFaults === 'D' || showMeFaults === 'D') {
    return 1;
  }
  return 0;
};

/**
 * Get whether the show me and tell me questions were completed.
 *
 * @param object The MES test result
 * @returns The boolean value (as a number)
 */
export const formatQuestionCompletedB = (testData: TestData | undefined): BooleanAsNumber => {
  const tellMeCode = get(testData, 'vehicleChecks.tellMeQuestion.code', null);
  const showMeCode = get(testData, 'vehicleChecks.showMeQuestion.code', null);
  if (tellMeCode && showMeCode) {
    return 1;
  }
  return 0;
};

export const formatQuestionCompleted =
  (testData: TestData | undefined, questionCount: number, delegatedTest?: boolean): BooleanAsNumber => {
    if (delegatedTest) {
      return get(testData, 'vehicleChecks.vehicleChecksCompleted', false) ? 1 : 0;
    }
    let totalFaults: number = 0;
    const tellMeFaults: QuestionResult[] = get(testData, 'vehicleChecks.tellMeQuestions', null);
    const showMeFaults: QuestionResult[] = get(testData, 'vehicleChecks.showMeQuestions', null);

    if (tellMeFaults) {
      totalFaults = totalFaults + tellMeFaults.filter(fault => fault.outcome != null).length;
    }
    if (showMeFaults) {
      totalFaults = totalFaults + showMeFaults.filter(fault => fault.outcome != null).length;
    }

    return totalFaults === questionCount ? 1 : 0;
  };
/**
 * Get the fault/serious/dangerous comments for a specific competency, if any.
 *
 * @param testData The MES test result
 * @param path The JSON attribute, below ``drivingFaults``, ``seriousFaults`` and ``dangerousFaults``
 * @returns The value, or ``null``
 */
export const getCompetencyComments = (testData: TestData | undefined, path: string): string | null => {
  const dangerousFaultComment: string = get(testData, `dangerousFaults.${path}`, null);
  const seriousFaultComment: string = get(testData, `seriousFaults.${path}`, null);
  const drivingFaultComment: string = get(testData, `drivingFaults.${path}`, null);

  return getCompetencyCommentString(dangerousFaultComment, seriousFaultComment, drivingFaultComment);
};

export const getCompetencyCommentString = (
  dangerousFaultComment: string,
  seriousFaultComment: string,
  drivingFaultComment: string): string | null => {

  const comments: string[] = [];

  if (dangerousFaultComment) {
    comments.push(`Dangerous fault comment: ${dangerousFaultComment}`);
  }
  if (seriousFaultComment) {
    comments.push(`Serious fault comment: ${seriousFaultComment}`);
  }
  if (drivingFaultComment) {
    comments.push(`Driving fault comment: ${drivingFaultComment}`);
  }
  if (comments.length === 0) {
    return null;
  }
  return comments.join(', ');
};

export const formatSingleFaultOutcomeBySeverity =
  (testData: CatAMod1TestData, path: string, severity: SingleFaultCompetencyOutcome): BooleanAsNumber => {
    const singleFaultCompetencyOutcome = get(testData, path, null);
    return singleFaultCompetencyOutcome === severity ? 1 : 0;
  };

export const optionalIsLeftBoolean = (testResult: TestResultCatAM1Schema): BooleanAsNumber => {
  const direction = get(testResult, 'testSummary.circuit', '');
  return direction.toUpperCase() === 'LEFT' ? 1 : 0;
};

export const optionalIsRightBoolean = (testResult: TestResultCatAM1Schema): BooleanAsNumber => {
  const direction = get(testResult, 'testSummary.circuit', '');
  return direction.toUpperCase() === 'RIGHT' ? 1 : 0;
};

export const getVehicleCheckFaultLimit = (testData: TestData | undefined): FaultLimit => {
  const fullLicenceHeld: boolean = get(testData, 'vehicleChecks.fullLicenceHeld', false);

  return fullLicenceHeld ? FaultLimit.TRAILER : FaultLimit.NON_TRAILER;
};
