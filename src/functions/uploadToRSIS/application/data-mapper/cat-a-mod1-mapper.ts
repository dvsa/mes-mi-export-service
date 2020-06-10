import { ResultUpload } from '../result-client';
import { DataField } from '../../domain/mi-export-data';
import {
  addIfSet,
  field,
  formatSingleFaultOutcomeBySeverity,
  optional,
  optionalBoolean,
  optionalIsLeftBoolean, optionalIsRightBoolean, getCompetencyComments,
} from './data-mapper';
import { TestData, TestResultCatAM1Schema } from '@dvsa/mes-test-schema/categories/AM1';
import { formatGearboxCategory } from '../helpers/shared-formatters';

export const mapCatAMod1Data = (result: ResultUpload): DataField[] => {
  const testResult = result.testResult as TestResultCatAM1Schema;
  const t: TestData = result.testResult.testData as TestData;

  const m: DataField[] = [
    field('AUTOMATIC_TEST', formatGearboxCategory(result)),
    // RIDING FAULTS - SINGLE FAULT COMPETENCY
    // useOfStand
    // tslint:disable-next-line:max-line-length
    field('MC_USE_OF_STAND_DANGEROUS', formatSingleFaultOutcomeBySeverity(t, 'singleFaultCompetencies.useOfStand', 'D')),
    field('MC_USE_OF_STAND_SERIOUS', formatSingleFaultOutcomeBySeverity(t, 'singleFaultCompetencies.useOfStand', 'S')),
    field('MC_USE_OF_STAND_TOTAL', formatSingleFaultOutcomeBySeverity(t, 'singleFaultCompetencies.useOfStand', 'DF')),
    // manualHandling
    // tslint:disable-next-line:max-line-length
    field('MC_MANUAL_HANDLING_DANGEROUS', formatSingleFaultOutcomeBySeverity(t, 'singleFaultCompetencies.manualHandling', 'D')),
    // tslint:disable-next-line:max-line-length
    field('MC_MANUAL_HANDLING_SERIOUS', formatSingleFaultOutcomeBySeverity(t, 'singleFaultCompetencies.manualHandling', 'S')),
    // tslint:disable-next-line:max-line-length
    field('MC_MANUAL_HANDLING_TOTAL', formatSingleFaultOutcomeBySeverity(t, 'singleFaultCompetencies.manualHandling', 'DF')),
    // slalom
    field('MC_SLALOM_DANGEROUS', formatSingleFaultOutcomeBySeverity(t, 'singleFaultCompetencies.slalom', 'D')),
    field('MC_SLALOM_SERIOUS', formatSingleFaultOutcomeBySeverity(t, 'singleFaultCompetencies.slalom', 'S')),
    field('MC_SLALOM_TOTAL', formatSingleFaultOutcomeBySeverity(t, 'singleFaultCompetencies.slalom', 'DF')),
    // slowControl
    // tslint:disable-next-line:max-line-length
    field('MC_SLOW_CONTROL_DANGEROUS', formatSingleFaultOutcomeBySeverity(t, 'singleFaultCompetencies.slowControl', 'D')),
    field('MC_SLOW_CONTROL_SERIOUS', formatSingleFaultOutcomeBySeverity(t, 'singleFaultCompetencies.slowControl', 'S')),
    field('MC_SLOW_CONTROL_TOTAL', formatSingleFaultOutcomeBySeverity(t, 'singleFaultCompetencies.slowControl', 'DF')),
    // uTurn
    field('MC_UTURN_DANGEROUS', formatSingleFaultOutcomeBySeverity(t, 'singleFaultCompetencies.uTurn', 'D')),
    field('MC_UTURN_SERIOUS', formatSingleFaultOutcomeBySeverity(t, 'singleFaultCompetencies.uTurn', 'S')),
    field('MC_UTURN_TOTAL', formatSingleFaultOutcomeBySeverity(t, 'singleFaultCompetencies.uTurn', 'DF')),
    // controlledStop
    field('SPARE1_DANGEROUS', formatSingleFaultOutcomeBySeverity(t, 'singleFaultCompetencies.controlledStop', 'D')),
    field('SPARE1_SERIOUS', formatSingleFaultOutcomeBySeverity(t, 'singleFaultCompetencies.controlledStop', 'S')),
    field('SPARE1_TOTAL', formatSingleFaultOutcomeBySeverity(t, 'singleFaultCompetencies.controlledStop', 'DF')),
    // emergencyStop
    // tslint:disable-next-line:max-line-length
    field('CONTROL_STOP_PROMPT_DANGEROUS', formatSingleFaultOutcomeBySeverity(t, 'singleFaultCompetencies.emergencyStop', 'D')),
    // tslint:disable-next-line:max-line-length
    field('CONTROL_STOP_PROMPT_SERIOUS', formatSingleFaultOutcomeBySeverity(t, 'singleFaultCompetencies.emergencyStop', 'S')),
    // tslint:disable-next-line:max-line-length
    field('CONTROL_STOP_PROMPT_TOTAL', formatSingleFaultOutcomeBySeverity(t, 'singleFaultCompetencies.emergencyStop', 'DF')),
    // avoidance
    field('MC_AVOIDANCE_DANGEROUS', formatSingleFaultOutcomeBySeverity(t, 'singleFaultCompetencies.avoidance', 'D')),
    field('MC_AVOIDANCE_SERIOUS', formatSingleFaultOutcomeBySeverity(t, 'singleFaultCompetencies.avoidance', 'S')),
    field('MC_AVOIDANCE_TOTAL', formatSingleFaultOutcomeBySeverity(t, 'singleFaultCompetencies.avoidance', 'DF')),
    // RIDING FAULTS - STANDARD COMPETENCY
    // precautions
    field('PRECAUTIONS_DANGEROUS', optionalBoolean(t, 'dangerousFaults.precautions')),
    field('PRECAUTIONS_SERIOUS', optionalBoolean(t, 'seriousFaults.precautions')),
    field('PRECAUTIONS_TOTAL', optional(t, 'drivingFaults.precautions', 0)),
    // moveOffSafety
    field('MOVE_OFF_SAFETY_DANGEROUS', optionalBoolean(t, 'dangerousFaults.moveOffSafety')),
    field('MOVE_OFF_SAFETY_SERIOUS', optionalBoolean(t, 'seriousFaults.moveOffSafety')),
    field('MOVE_OFF_SAFETY_TOTAL', optional(t, 'drivingFaults.moveOffSafety', 0)),
    // moveOffControl
    field('MOVE_OFF_CONTROL_DANGEROUS', optionalBoolean(t, 'dangerousFaults.moveOffControl')),
    field('MOVE_OFF_CONTROL_SERIOUS', optionalBoolean(t, 'seriousFaults.moveOffControl')),
    field('MOVE_OFF_CONTROL_TOTAL', optional(t, 'drivingFaults.moveOffControl', 0)),
    // SPEED ATTEMPTS
    field('MC_AVOIDANCE_SPEED_NOT_MET', formatSingleFaultOutcomeBySeverity(t, 'avoidance.outcome', 'S')),
    field('MC_EMER_STOP_SPEED_NOT_MET', formatSingleFaultOutcomeBySeverity(t, 'emergencyStop.outcome', 'S')),
    // DL196 CERTIFICATE NO
    field('MC_DL196_CBT_CERT_NO', optional(result.testResult, 'preTestDeclarations.DL196CBTCertNumber', '')),
    // Circuit
    field('MC_AVOIDANCE_L', optionalIsLeftBoolean(testResult)),
    field('MC_AVOIDANCE_R', optionalIsRightBoolean(testResult)),
  ];
  // add optional fields, only if set
  // SPEED ATTEMPTS
  addIfSet(m, 'MC_AVOIDANCE_SPEED_FIRST', optional(t, 'avoidance.firstAttempt', null));
  addIfSet(m, 'MC_AVOIDANCE_SPEED_SECOND', optional(t, 'avoidance.secondAttempt', null));
  addIfSet(m, 'MC_EMERGENCY_STOP_SPEED_FIRST', optional(t, 'emergencyStop.firstAttempt', null));
  addIfSet(m, 'MC_EMERGENCY_STOP_SPEED_SECOND', optional(t, 'emergencyStop.secondAttempt', null));

  // Comments
  addIfSet(m, 'CONTROL_STOP_COMMENT', optional(t, 'singleFaultCompetencies.controlledStopComments', null));
  addIfSet(m, 'PRECAUTIONS_COMMENT', getCompetencyComments(t, 'precautionsComments'));
  addIfSet(m, 'MOVE_OFF_SAFETY_COMMENT', getCompetencyComments(t, 'moveOffSafetyComments'));
  addIfSet(m, 'MOVE_OFF_CONTROL_COMMENT', getCompetencyComments(t, 'moveOffControlComments'));
  addIfSet(m, 'MC_AVOIDANCE_COMMENT', optional(t, 'singleFaultCompetencies.avoidanceComments', null));
  addIfSet(m, 'MC_AVOIDANCE_SPEED_N_M_COMMENT', optional(t, 'avoidance.comments', null));
  addIfSet(m, 'MC_EMER_STOP_SPEED_N_M_COMMENT', optional(t, 'emergencyStop.comments', null));
  addIfSet(m, 'CONTROL_STOP_PROMPT_COMMENT', optional(t, 'singleFaultCompetencies.emergencyStopComments', null));
  addIfSet(m, 'MC_MANUAL_HANDLING_COMMENT', optional(t, 'singleFaultCompetencies.manualHandlingComments', null));
  addIfSet(m, 'MC_SLALOM_COMMENT', optional(t, 'singleFaultCompetencies.slalomComments', null));
  addIfSet(m, 'MC_SLOW_CONTROL_COMMENT', optional(t, 'singleFaultCompetencies.slowControlComments', null));
  addIfSet(m, 'MC_USE_OF_STAND_COMMENT', optional(t, 'singleFaultCompetencies.useOfStandComments', null));
  addIfSet(m, 'MC_UTURN_COMMENT', optional(t, 'singleFaultCompetencies.uTurnComments', null));

  return m;
};
