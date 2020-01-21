import { ResultUpload } from '../result-client';
import { BooleanAsNumber } from '../../domain/mi-export-data';
import { get } from 'lodash';
import { licenceToIssue } from '@dvsa/mes-microservice-common/application/utils/licence-type';
/**
 * Converts from gearbox category (if any) to "is automatic" as a boolean (as a number).
 *
 * @param result The MES test result
 * @returns ``1`` if automatic, ``0`` otherwise
 */
export const formatGearboxCategory = (result: ResultUpload): BooleanAsNumber => {
  const gearboxCategory = get(result, 'testResult.vehicleDetails.gearboxCategory', 'Manual');
  return gearboxCategory === 'Manual' ? 0 : 1;
};

export const formatGearboxCategoryWithOverride = (category: string, result: ResultUpload): BooleanAsNumber => {
  const gearboxCategory = get(result, 'testResult.vehicleDetails.gearboxCategory', 'Manual');
  const code78 = get(result, 'testResult.passCompletion.code78Present', undefined);

  const licenceType = licenceToIssue(category, gearboxCategory, code78);
  return licenceType === 'Manual' ? 0 : 1;
};
