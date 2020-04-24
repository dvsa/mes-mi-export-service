import { ResultUpload } from '../result-client';
import { get } from 'lodash';
import { BooleanAsNumber, DataField } from '../../domain/mi-export-data';
import { TestData as CatAM2TestData } from '@dvsa/mes-test-schema/categories/AM2';
import {
  addIfSet,
  field, getCatAM2SafetyAndBalanceFaultCount,
  getCompetencyComments,
  optional,
  optionalBoolean,
} from './data-mapper';
import { formatGearboxCategory } from '../helpers/shared-formatters';

enum ModeOfTransport {
  BikeToBike = 'Bike to bike',
  CarToBike = 'Car to bike',
}

export const mapCatAMod2Data = (result: ResultUpload): DataField[] => {
  const t = result.testResult.testData as CatAM2TestData;

  const m: DataField[] = [
    field('AUTOMATIC_TEST', formatGearboxCategory(result)),
    field('NORMAL_STOP_1_COMPLETED', optionalBoolean(t, 'testRequirements.normalStart1')),
    field('NORMAL_STOP_2_COMPLETED', optionalBoolean(t, 'testRequirements.normalStart2')),
    field('ANGLED_START_COMPLETED', optionalBoolean(t, 'testRequirements.angledStart')),
    field('HILL_START_COMPLETED', optionalBoolean(t, 'testRequirements.hillStart')),
    // bends:
    field('MC_BENDS_TOTAL', optional(t, 'drivingFaults.bends', 0)),
    field('MC_BENDS_SERIOUS', optionalBoolean(t, 'seriousFaults.bends')),
    field('MC_BENDS_DANGEROUS', optionalBoolean(t, 'dangerousFaults.bends')),
    // useOfSpeed
    field('USE_OF_SPEED_TOTAL', optional(t, 'drivingFaults.useOfSpeed', 0)),
    field('USE_OF_SPEED_SERIOUS', optionalBoolean(t, 'seriousFaults.useOfSpeed')),
    field('USE_OF_SPEED_DANGEROUS', optionalBoolean(t, 'dangerousFaults.useOfSpeed')),
    // precautions
    field('PRECAUTIONS_TOTAL', optional(t, 'drivingFaults.precautions', 0)),
    field('PRECAUTIONS_SERIOUS', optionalBoolean(t, 'seriousFaults.precautions')),
    field('PRECAUTIONS_DANGEROUS', optionalBoolean(t, 'dangerousFaults.precautions')),
    // signalsTimed
    field('SIGNALS_TIMED_TOTAL', optional(t, 'drivingFaults.signalsTimed', 0)),
    field('SIGNALS_TIMED_SERIOUS', optionalBoolean(t, 'seriousFaults.signalsTimed')),
    field('SIGNALS_TIMED_DANGEROUS', optionalBoolean(t, 'dangerousFaults.signalsTimed')),
    // controlsGears
    field('CONTROL_GEARS_TOTAL', optional(t, 'drivingFaults.controlsGears', 0)),
    field('CONTROL_GEARS_SERIOUS', optionalBoolean(t, 'seriousFaults.controlsGears')),
    field('CONTROL_GEARS_DANGEROUS', optionalBoolean(t, 'dangerousFaults.controlsGears')),
    // moveOffSafety
    field('MOVE_OFF_SAFETY_TOTAL', optional(t, 'drivingFaults.moveOffSafety', 0)),
    field('MOVE_OFF_SAFETY_SERIOUS', optionalBoolean(t, 'seriousFaults.moveOffSafety')),
    field('MOVE_OFF_SAFETY_DANGEROUS', optionalBoolean(t, 'dangerousFaults.moveOffSafety')),
    // controlsClutch
    field('CONTROL_CLUTCH_TOTAL', optional(t, 'drivingFaults.controlsClutch', 0)),
    field('CONTROL_CLUTCH_SERIOUS', optionalBoolean(t, 'seriousFaults.controlsClutch')),
    field('CONTROL_CLUTCH_DANGEROUS', optionalBoolean(t, 'dangerousFaults.controlsClutch')),
    // moveOffControl
    field('MOVE_OFF_CONTROL_TOTAL', optional(t, 'drivingFaults.moveOffControl', 0)),
    field('MOVE_OFF_CONTROL_SERIOUS', optionalBoolean(t, 'seriousFaults.moveOffControl')),
    field('MOVE_OFF_CONTROL_DANGEROUS', optionalBoolean(t, 'dangerousFaults.moveOffControl')),
    // controlsSteering
    field('CONTROL_STEERING_TOTAL', optional(t, 'drivingFaults.controlsSteering', 0)),
    field('CONTROL_STEERING_SERIOUS', optionalBoolean(t, 'seriousFaults.controlsSteering')),
    field('CONTROL_STEERING_DANGEROUS', optionalBoolean(t, 'dangerousFaults.controlsSteering')),
    // controlsThrottle
    field('CONTROL_ACC_TOTAL', optional(t, 'drivingFaults.controlsThrottle', 0)),
    field('CONTROL_ACC_SERIOUS', optionalBoolean(t, 'seriousFaults.controlsThrottle')),
    field('CONTROL_ACC_DANGEROUS', optionalBoolean(t, 'dangerousFaults.controlsThrottle')),
    // judgementMeeting
    field('JUDGEMENT_MEET_TOTAL', optional(t, 'drivingFaults.judgementMeeting', 0)),
    field('JUDGEMENT_MEET_SERIOUS', optionalBoolean(t, 'seriousFaults.judgementMeeting')),
    field('JUDGEMENT_MEET_DANGEROUS', optionalBoolean(t, 'dangerousFaults.judgementMeeting')),
    // signalsCorrectly
    field('SIGNALS_CORRECTLY_TOTAL', optional(t, 'drivingFaults.signalsCorrectly', 0)),
    field('SIGNALS_CORRECTLY_SERIOUS', optionalBoolean(t, 'seriousFaults.signalsCorrectly')),
    field('SIGNALS_CORRECTLY_DANGEROUS', optionalBoolean(t, 'dangerousFaults.signalsCorrectly')),
    // signalsNecessary
    field('SIGNALS_NECESSARY_TOTAL', optional(t, 'drivingFaults.signalsNecessary', 0)),
    field('SIGNALS_NECESSARY_SERIOUS', optionalBoolean(t, 'seriousFaults.signalsNecessary')),
    field('SIGNALS_NECESSARY_DANGEROUS', optionalBoolean(t, 'dangerousFaults.signalsNecessary')),
    // ancillaryControls
    field('ANCILLARY_CONTROLS_TOTAL', optional(t, 'drivingFaults.ancillaryControls', 0)),
    field('ANCILLARY_CONTROLS_SERIOUS', optionalBoolean(t, 'seriousFaults.ancillaryControls')),
    field('ANCILLARY_CONTROLS_DANGEROUS', optionalBoolean(t, 'dangerousFaults.ancillaryControls')),
    // awarenessPlanning
    field('AWARENESS_PLAN_TOTAL', optional(t, 'drivingFaults.awarenessPlanning', 0)),
    field('AWARENESS_PLAN_SERIOUS', optionalBoolean(t, 'seriousFaults.awarenessPlanning')),
    field('AWARENESS_PLAN_DANGEROUS', optionalBoolean(t, 'dangerousFaults.awarenessPlanning')),
    // controlsRearBrake
    field('CONTROL_FOOTBRAKE_TOTAL', optional(t, 'drivingFaults.controlsRearBrake', 0)),
    field('CONTROL_FOOTBRAKE_SERIOUS', optionalBoolean(t, 'seriousFaults.controlsRearBrake')),
    field('CONTROL_FOOTBRAKE_DANGEROUS', optionalBoolean(t, 'dangerousFaults.controlsRearBrake')),
    // followingDistance
    field('FOLLOWING_DISTANCE_TOTAL', optional(t, 'drivingFaults.followingDistance', 0)),
    field('FOLLOWING_DISTANCE_SERIOUS', optionalBoolean(t, 'seriousFaults.followingDistance')),
    field('FOLLOWING_DISTANCE_DANGEROUS', optionalBoolean(t, 'dangerousFaults.followingDistance')),
    // judgementCrossing
    field('JUDGEMENT_CROSS_TOTAL', optional(t, 'drivingFaults.judgementCrossing', 0)),
    field('JUDGEMENT_CROSS_SERIOUS', optionalBoolean(t, 'seriousFaults.judgementCrossing')),
    field('JUDGEMENT_CROSS_DANGEROUS', optionalBoolean(t, 'dangerousFaults.judgementCrossing')),
    // controlsFrontBrake
    field('CONTROL_PARK_TOTAL', optional(t, 'drivingFaults.controlsFrontBrake', 0)),
    field('CONTROL_PARK_SERIOUS', optionalBoolean(t, 'seriousFaults.controlsFrontBrake')),
    field('CONTROL_PARK_DANGEROUS', optionalBoolean(t, 'dangerousFaults.controlsFrontBrake')),
    // judgementOvertaking
    field('JUDGEMENT_OVER_TOTAL', optional(t, 'drivingFaults.judgementOvertaking', 0)),
    field('JUDGEMENT_OVER_SERIOUS', optionalBoolean(t, 'seriousFaults.judgementOvertaking')),
    field('JUDGEMENT_OVER_DANGEROUS', optionalBoolean(t, 'dangerousFaults.judgementOvertaking')),
    // pedestrianCrossings
    field('PEDESTRIAN_CROSSING_TOTAL', optional(t, 'drivingFaults.pedestrianCrossings', 0)),
    field('PEDESTRIAN_CROSSING_SERIOUS', optionalBoolean(t, 'seriousFaults.pedestrianCrossings')),
    field('PEDESTRIAN_CROSSING_DANGEROUS', optionalBoolean(t, 'dangerousFaults.pedestrianCrossings')),
    // positionNormalStops - NOTE: deliberate typo in column name as is expected by RSIS
    field('POSTITION_STOPS_TOTAL', optional(t, 'drivingFaults.positionNormalStops', 0)),
    field('POSTITION_STOPS_SERIOUS', optionalBoolean(t, 'seriousFaults.positionNormalStops')),
    field('POSTITION_STOPS_DANGEROUS', optionalBoolean(t, 'dangerousFaults.positionNormalStops')),
    // junctionsObservation
    field('JUNCTIONS_OBSERV_TOTAL', optional(t, 'drivingFaults.junctionsObservation', 0)),
    field('JUNCTIONS_OBSERV_SERIOUS', optionalBoolean(t, 'seriousFaults.junctionsObservation')),
    field('JUNCTIONS_OBSERV_DANGEROUS', optionalBoolean(t, 'dangerousFaults.junctionsObservation')),
    // junctionsTurningLeft
    field('JUNCTIONS_TURN_LEFT_TOTAL', optional(t, 'drivingFaults.junctionsTurningLeft', 0)),
    field('JUNCTIONS_TURN_LEFT_SERIOUS', optionalBoolean(t, 'seriousFaults.junctionsTurningLeft')),
    field('JUNCTIONS_TURN_LEFT_DANGEROUS', optionalBoolean(t, 'dangerousFaults.junctionsTurningLeft')),
    // junctionsTurningRight
    field('JUNCTIONS_TURN_RIGHT_TOTAL', optional(t, 'drivingFaults.junctionsTurningRight', 0)),
    field('JUNCTIONS_TURN_RIGHT_SERIOUS', optionalBoolean(t, 'seriousFaults.junctionsTurningRight')),
    field('JUNCTIONS_TURN_RIGHT_DANGEROUS', optionalBoolean(t, 'dangerousFaults.junctionsTurningRight')),
    // junctionsApproachSpeed
    field('JUNCTIONS_SPEED_TOTAL', optional(t, 'drivingFaults.junctionsApproachSpeed', 0)),
    field('JUNCTIONS_SPEED_SERIOUS', optionalBoolean(t, 'seriousFaults.junctionsApproachSpeed')),
    field('JUNCTIONS_SPEED_DANGEROUS', optionalBoolean(t, 'dangerousFaults.junctionsApproachSpeed')),
    // useOfMirrorsSignalling
    field('MIRRORS_MC_REAR_SIG_TOTAL', optional(t, 'drivingFaults.useOfMirrorsSignalling', 0)),
    field('MIRRORS_MC_REAR_SIG_SERIOUS', optionalBoolean(t, 'seriousFaults.useOfMirrorsSignalling')),
    field('MIRRORS_MC_REAR_SIG_DANGEROUS', optionalBoolean(t, 'dangerousFaults.useOfMirrorsSignalling')),
    // clearanceOrObstructions
    field('CLEARANCE_OBSTRUCT_TOTAL', optional(t, 'drivingFaults.clearanceOrObstructions', 0)),
    field('CLEARANCE_OBSTRUCT_SERIOUS', optionalBoolean(t, 'seriousFaults.clearanceOrObstructions')),
    field('CLEARANCE_OBSTRUCT_DANGEROUS', optionalBoolean(t, 'dangerousFaults.clearanceOrObstructions')),
    // junctionsCuttingCorners
    field('JUNCTIONS_TURN_CUT_TOTAL', optional(t, 'drivingFaults.junctionsCuttingCorners', 0)),
    field('JUNCTIONS_TURN_CUT_SERIOUS', optionalBoolean(t, 'seriousFaults.junctionsCuttingCorners')),
    field('JUNCTIONS_TURN_CUT_DANGEROUS', optionalBoolean(t, 'dangerousFaults.junctionsCuttingCorners')),
    // progressUndueHesitation
    field('MAINTAIN_PROG_HES_TOTAL', optional(t, 'drivingFaults.progressUndueHesitation', 0)),
    field('MAINTAIN_PROG_HES_SERIOUS', optionalBoolean(t, 'seriousFaults.progressUndueHesitation')),
    field('MAINTAIN_PROG_HES_DANGEROUS', optionalBoolean(t, 'dangerousFaults.progressUndueHesitation')),
    // useOfMirrorsChangeSpeed
    field('MIRRORS_MC_REAR_SPE_TOTAL', optional(t, 'drivingFaults.useOfMirrorsChangeSpeed', 0)),
    field('MIRRORS_MC_REAR_SPE_SERIOUS', optionalBoolean(t, 'seriousFaults.useOfMirrorsChangeSpeed')),
    field('MIRRORS_MC_REAR_SPE_DANGEROUS', optionalBoolean(t, 'dangerousFaults.useOfMirrorsChangeSpeed')),
    // positioningNormalDriving
    field('POSITIONING_NORMAL_TOTAL', optional(t, 'drivingFaults.positioningNormalDriving', 0)),
    field('POSITIONING_NORMAL_SERIOUS', optionalBoolean(t, 'seriousFaults.positioningNormalDriving')),
    field('POSITIONING_NORMAL_DANGEROUS', optionalBoolean(t, 'dangerousFaults.positioningNormalDriving')),
    // progressAppropriateSpeed
    field('MAINTAIN_PROG_SPEED_TOTAL', optional(t, 'drivingFaults.progressAppropriateSpeed', 0)),
    field('MAINTAIN_PROG_SPEED_SERIOUS', optionalBoolean(t, 'seriousFaults.progressAppropriateSpeed')),
    field('MAINTAIN_PROG_SPEED_DANGEROUS', optionalBoolean(t, 'dangerousFaults.progressAppropriateSpeed')),
    // positioningLaneDiscipline
    field('POSITIONING_LANE_TOTAL', optional(t, 'drivingFaults.positioningLaneDiscipline', 0)),
    field('POSITIONING_LANE_SERIOUS', optionalBoolean(t, 'seriousFaults.positioningLaneDiscipline')),
    field('POSITIONING_LANE_DANGEROUS', optionalBoolean(t, 'dangerousFaults.positioningLaneDiscipline')),
    // controlsBalanceSlowControl
    field('CONTROL_BALANCE_TOTAL', optional(t, 'drivingFaults.controlsBalanceSlowControl', 0)),
    field('CONTROL_BALANCE_SERIOUS', optionalBoolean(t, 'seriousFaults.controlsBalanceSlowControl')),
    field('CONTROL_BALANCE_DANGEROUS', optionalBoolean(t, 'dangerousFaults.controlsBalanceSlowControl')),
    // responseToSignsRoadMarkings
    field('RESPONSE_ROAD_MARK_TOTAL', optional(t, 'drivingFaults.responseToSignsRoadMarkings', 0)),
    field('RESPONSE_ROAD_MARK_SERIOUS', optionalBoolean(t, 'seriousFaults.responseToSignsRoadMarkings')),
    field('RESPONSE_ROAD_MARK_DANGEROUS', optionalBoolean(t, 'dangerousFaults.responseToSignsRoadMarkings')),
    // responseToSignsTrafficSigns
    field('RESPONSE_TRAF_SIGNS_TOTAL', optional(t, 'drivingFaults.responseToSignsTrafficSigns', 0)),
    field('RESPONSE_TRAF_SIGNS_SERIOUS', optionalBoolean(t, 'seriousFaults.responseToSignsTrafficSigns')),
    field('RESPONSE_TRAF_SIGNS_DANGEROUS', optionalBoolean(t, 'dangerousFaults.responseToSignsTrafficSigns')),
    // useOfMirrorsChangeDirection
    field('MIRRORS_MC_REAR_DIR_TOTAL', optional(t, 'drivingFaults.useOfMirrorsChangeDirection', 0)),
    field('MIRRORS_MC_REAR_DIR_SERIOUS', optionalBoolean(t, 'seriousFaults.useOfMirrorsChangeDirection')),
    field('MIRRORS_MC_REAR_DIR_DANGEROUS', optionalBoolean(t, 'dangerousFaults.useOfMirrorsChangeDirection')),
    // responseToSignsTrafficLights
    field('RESPONSE_TRAF_LIGHT_TOTAL', optional(t, 'drivingFaults.responseToSignsTrafficLights', 0)),
    field('RESPONSE_TRAF_LIGHT_SERIOUS', optionalBoolean(t, 'seriousFaults.responseToSignsTrafficLights')),
    field('RESPONSE_TRAF_LIGHT_DANGEROUS', optionalBoolean(t, 'dangerousFaults.responseToSignsTrafficLights')),
    // responseToSignsOtherRoadUsers
    field('RESPONSE_OTHER_TOTAL', optional(t, 'drivingFaults.responseToSignsOtherRoadUsers', 0)),
    field('RESPONSE_OTHER_SERIOUS', optionalBoolean(t, 'seriousFaults.responseToSignsOtherRoadUsers')),
    field('RESPONSE_OTHER_DANGEROUS', optionalBoolean(t, 'dangerousFaults.responseToSignsOtherRoadUsers')),
    // responseToSignsTrafficControllers
    field('RESPONSE_TRAF_CONT_TOTAL', optional(t, 'drivingFaults.responseToSignsTrafficControllers', 0)),
    field('RESPONSE_TRAF_CONT_SERIOUS', optionalBoolean(t, 'seriousFaults.responseToSignsTrafficControllers')),
    field('RESPONSE_TRAF_CONT_DANGEROUS', optionalBoolean(t, 'dangerousFaults.responseToSignsTrafficControllers')),
    // eyesightTest
    field('EYESIGHT_SERIOUS', optionalBoolean(t, 'eyesightTest.seriousFault')),
    field('EYESIGHT_COMPLETED', optionalBoolean(t, 'eyesightTest.complete')),
    // safety and balance fault total
    field('VEHICLE_CHECKS_TOTAL', getCatAM2SafetyAndBalanceFaultCount(t)),
    field('MC_DL196_CBT_CERT_NO', optional(result.testResult, 'preTestDeclarations.DL196CBTCertNumber', '')),
  ];

  // FAULT COMMENTS
  addIfSet(m, 'USE_OF_SPEED_COMMENT', getCompetencyComments(t, 'useOfSpeedComments'));
  addIfSet(m, 'PRECAUTIONS_COMMENT', getCompetencyComments(t, 'precautionsComments'));
  addIfSet(m, 'SIGNALS_TIMED_COMMENT', getCompetencyComments(t, 'signalsTimedComments'));
  addIfSet(m, 'CONTROL_GEARS_COMMENT', getCompetencyComments(t, 'controlsGearsComments'));
  addIfSet(m, 'MOVE_OFF_SAFETY_COMMENT', getCompetencyComments(t, 'moveOffSafetyComments'));
  addIfSet(m, 'CONTROL_CLUTCH_COMMENT', getCompetencyComments(t, 'controlsClutchComments'));
  addIfSet(m, 'MOVE_OFF_CONTROL_COMMENT', getCompetencyComments(t, 'moveOffControlComments'));
  addIfSet(m, 'CONTROL_STEERING_COMMENT', getCompetencyComments(t, 'controlsSteeringComments'));
  addIfSet(m, 'CONTROL_ACC_COMMENT', getCompetencyComments(t, 'controlsThrottleComments'));
  addIfSet(m, 'JUDGEMENT_MEET_COMMENT', getCompetencyComments(t, 'judgementMeetingComments'));
  addIfSet(m, 'SIGNALS_CORRECTLY_COMMENT', getCompetencyComments(t, 'signalsCorrectlyComments'));
  addIfSet(m, 'SIGNALS_NECESSARY_COMMENT', getCompetencyComments(t, 'signalsNecessaryComments'));
  addIfSet(m, 'ANCILLARY_CONTROLS_COMMENT', getCompetencyComments(t, 'ancillaryControlsComments'));
  addIfSet(m, 'AWARENESS_PLAN_COMMENT', getCompetencyComments(t, 'awarenessPlanningComments'));
  addIfSet(m, 'CONTROL_FOOTBRAKE_COMMENT', getCompetencyComments(t, 'controlsRearBrakeComments'));
  addIfSet(m, 'FOLLOWING_DISTANCE_COMMENT', getCompetencyComments(t, 'followingDistanceComments'));
  addIfSet(m, 'JUDGEMENT_CROSS_COMMENT', getCompetencyComments(t, 'judgementCrossingComments'));
  addIfSet(m, 'CONTROL_PARK_COMMENT', getCompetencyComments(t, 'controlsFrontBrakeComments'));
  addIfSet(m, 'JUDGEMENT_OVER_COMMENT', getCompetencyComments(t, 'judgementOvertakingComments'));
  addIfSet(m, 'PEDESTRIAN_CROSSING_COMMENT', getCompetencyComments(t, 'pedestrianCrossingsComments'));
  addIfSet(m, 'POSITION_STOPS_COMMENT', getCompetencyComments(t, 'positionNormalStopsComments'));
  addIfSet(m, 'JUNCTIONS_OBSERV_COMMENT', getCompetencyComments(t, 'junctionsObservationComments'));
  addIfSet(m, 'JUNCTIONS_TURN_LEFT_COMMENT', getCompetencyComments(t, 'junctionsTurningLeftComments'));
  addIfSet(m, 'JUNCTIONS_TURN_RIGHT_COMMENT', getCompetencyComments(t, 'junctionsTurningRightComments'));
  addIfSet(m, 'JUNCTIONS_SPEED_COMMENT', getCompetencyComments(t, 'junctionsApproachSpeedComments'));
  addIfSet(m, 'MIRRORS_MC_REAR_SIG_COMMENT', getCompetencyComments(t, 'useOfMirrorsSignallingComments'));
  addIfSet(m, 'CLEARANCE_OBSTRUCT_COMMENT', getCompetencyComments(t, 'clearanceOrObstructionsComments'));
  addIfSet(m, 'JUNCTIONS_TURN_CUT_COMMENT', getCompetencyComments(t, 'junctionsCuttingCornersComments'));
  addIfSet(m, 'MAINTAIN_PROG_HES_COMMENT', getCompetencyComments(t, 'progressUndueHesitationComments'));
  addIfSet(m, 'MIRRORS_MC_REAR_SPE_COMMENT', getCompetencyComments(t, 'useOfMirrorsChangeSpeedComments'));
  addIfSet(m, 'POSITIONING_NORMAL_COMMENT', getCompetencyComments(t, 'positioningNormalDrivingComments'));
  addIfSet(m, 'MAINTAIN_PROG_SPEED_COMMENT', getCompetencyComments(t, 'progressAppropriateSpeedComments'));
  addIfSet(m, 'POSITIONING_LANE_COMMENT', getCompetencyComments(t, 'positioningLaneDisciplineComments'));
  addIfSet(m, 'CONTROL_BALANCE_COMMENT', getCompetencyComments(t, 'controlsBalanceSlowControlComments'));
  addIfSet(m, 'RESPONSE_ROAD_MARK_COMMENT', getCompetencyComments(t, 'responseToSignsRoadMarkingsComments'));
  addIfSet(m, 'RESPONSE_TRAF_SIGNS_COMMENT', getCompetencyComments(t, 'responseToSignsTrafficSignsComments'));
  addIfSet(m, 'MIRRORS_MC_REAR_DIR_COMMENT', getCompetencyComments(t, 'useOfMirrorsChangeDirectionComments'));
  addIfSet(m, 'RESPONSE_TRAF_LIGHT_COMMENT', getCompetencyComments(t, 'responseToSignsTrafficLightsComments'));
  addIfSet(m, 'RESPONSE_OTHER_COMMENT', getCompetencyComments(t, 'responseToSignsOtherRoadUsersComments'));
  addIfSet(m, 'RESPONSE_TRAF_CONT_COMMENT', getCompetencyComments(t, 'responseToSignsTrafficControllersComments'));
  addIfSet(m, 'VEHICLE_CHECKS_COMMENT', optional(
    t, 'safetyAndBalanceQuestions.safetyAndBalanceComments', null));
  addIfSet(m, 'EYESIGHT_COMMENT', optional(t, 'eyesightTest.faultComments', null));
  addIfSet(m, 'INDEPENDENT_DRIVING', optional(result, 'testResult.testSummary.independentDriving', null));
  // mode of transport
  addIfSet(m, 'SURVEY_E_IND', getModeOfTransport(result, ModeOfTransport.BikeToBike));
  addIfSet(m, 'SURVEY_F_IND', getModeOfTransport(result, ModeOfTransport.CarToBike));
  // Safety and balance questions
  addIfSet(m, 'SAFETY_1_CODE', optional(
    t, 'safetyAndBalanceQuestions.safetyQuestions[0].code', null));
  addIfSet(m, 'SAFETY_1_DESCRIPTION', optional(
    t, 'safetyAndBalanceQuestions.safetyQuestions[0].description', null));
  addIfSet(m, 'SAFETY_2_CODE', optional(
    t, 'safetyAndBalanceQuestions.safetyQuestions[1].code', null));
  addIfSet(m, 'SAFETY_2_DESCRIPTION', optional(
    t, 'safetyAndBalanceQuestions.safetyQuestions[1].description', null));
  addIfSet(m, 'BALANCE_1_CODE', optional(
    t, 'safetyAndBalanceQuestions.balanceQuestions[0].code', null));
  addIfSet(m, 'BALANCE_1_DESCRIPTION', optional(
    t, 'safetyAndBalanceQuestions.balanceQuestions[0].description', null));
  return m;
};

const getModeOfTransport = (result: ResultUpload, mode: ModeOfTransport): BooleanAsNumber => {
  const modeOfTransport = get(result, 'testResult.testSummary.modeOfTransport', null);

  if (mode === modeOfTransport) {
    return 1;
  }
  return 0;
};
