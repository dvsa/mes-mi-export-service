import { isEmpty, get } from 'lodash';
import { RekeyReason } from '@dvsa/mes-test-schema/categories/B';

/**
 * Checks if there is a reason for rekey, and extracts the iPad issue
 *
 * @param rekeyReason The reason for rekey
 * @returns iPadIssue property as a string or null if there is no reason for rekey
 */
export const formatIpadIssueReason = (rekeyReason: RekeyReason | null): string | null => {
  if (isEmpty(rekeyReason) || isEmpty(get(rekeyReason, 'ipadIssue', null))) {
    return null;
  }

  if (get(rekeyReason, 'ipadIssue.technicalFault', false)) {
    return 'technical fault';
  }

  if (get(rekeyReason, 'ipadIssue.lost', false)) {
    return 'lost';
  }

  if (get(rekeyReason, 'ipadIssue.stolen', false)) {
    return 'stolen';
  }

  if (get(rekeyReason, 'ipadIssue.broken', false)) {
    return 'broken';
  }

  return null;
};

/**
 * Checks if there is a reason for rekey, and joins all the reasons
 *
 * @param rekeyReason The reason for rekey
 * @returns All the rekey reasons joined with a pipe
 */
export const formatRekeyReason = (rekeyReason: RekeyReason | null): string | null => {
  if (isEmpty(rekeyReason)) {
    return null;
  }
  const rekeyReasons: string[] = [];

  if (get(rekeyReason, 'transfer.selected', false)) {
    rekeyReasons.push('Transfer');
  }

  if (get(rekeyReason, 'ipadIssue.selected', false)) {
    rekeyReasons.push('iPad issue');
  }

  if (get(rekeyReason, 'other.selected', false)) {
    rekeyReasons.push('Other');
  }

  return rekeyReasons.join('|');
};
