import { DataField } from '../../../../domain/mi-export-data';
import { differenceWith, isEqual, isEmpty } from 'lodash';

// Note: this is a helper function for unit tests to determine and help diagnose issues with mappings
// messages will only be output to the console if a mapping issue is detected and you may see the following scenarios
//
// Scenario 1: result1 has an entry that does not appear in result2 (the expectations)
// Solution  : add an expectation to cover the mapping (or remove the mapping if it's not needed)
//
// Scenario 2: result1 and result2 have entries with the same name, but their values differ
// Solution  : Investigate and update the value on the entry that is wrong (could be the result or the expectation)
//
// Scenario 3: result2 has an entry that does not appear in result1
// Solution  : Investigate and either add a mapping so that result now has an entry, or delete the expectation if
//             it should not have one
export const doesResultMatchExpectations = (result: DataField[], expectations: DataField[]): boolean => {
  const result1 =  differenceWith(result, expectations, isEqual);
  const result2 = differenceWith(expectations, result, isEqual);

  if (!isEmpty(result1) || !isEmpty(result2)) {
  // tslint:disable:no-console
    console.log(`result length: ${result.length} expectations length: ${expectations.length}`);
    console.log(`comparison 1: ${JSON.stringify(result1)}`);
    console.log(`comparison 2: ${JSON.stringify(result2)}`);
  // tslint:enable:no-console
    return false;
  }
  return true;
};
