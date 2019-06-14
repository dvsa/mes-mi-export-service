import { get } from 'lodash';
import { BooleanAsNumber, DataField, DataFieldValue } from '../../domain/mi-export-data';
import { ResultUpload } from '../../application/result-client';
import { mapCommonData } from './common-mapper';
import { mapCatBData } from './cat-b-mapper';
import { error } from '../../../../common/application/utils/logger';

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
  if (category === 'B') {
    mappedDataFields = mappedDataFields.concat(mapCatBData(result));
  } else {
    const message = `Unsupported Category: ${category}`;
    error(message);
    throw new Error(message);
  }

  // purely as a check for human error when maintaining data mappers in the future, or adding new mappers for
  // additional test categories, we check here that we don't have more than one mapping for the same column
  // (i.e. a developer mistake, but easily done given these are long lists of database column mappings)
  const duplicatedFields: Set<string> = new Set();
  mappedDataFields.forEach((fieldToCheck) => {
    if (mappedDataFields.filter((field) => { return field.col === fieldToCheck.col; }).length > 1) {
      duplicatedFields.add(fieldToCheck.col);
    }
  });
  if (duplicatedFields.size > 0) {
    const message = `Duplicate columns mapped: ${Array.from(duplicatedFields).join(', ')}`;
    error(message);
    throw new Error(message);
  }

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
  if (value) {
    return value;
  }

  throw new MissingTestResultDataError(path);
};
