import { ResultUpload } from '../result-client';
import { DataField } from '../../domain/mi-export-data';
import {
  addIfSet,
  field,
  getCompetencyComments,
  optional,
  optionalBoolean,
} from './data-mapper';

export const mapCatAMod2Data = (result: ResultUpload): DataField[] => {
  const t = result.testResult.testData;

  const m: DataField[] = [
    field('CONTROL_ACC_TOTAL', optional(t, 'drivingFaults.controlsThrottle', 0)),
    field('CONTROL_CLUTCH_TOTAL', optional(t, 'drivingFaults.controlsClutch', 0)),
    field('CONTROL_GEARS_TOTAL', optional(t, 'drivingFaults.controlsGears', 0)),
    field('CONTROL_FOOTBRAKE_TOTAL', optional(t, 'drivingFaults.controlsFootbrake', 0)),
    field('CONTROL_PARK_TOTAL', optional(t, 'drivingFaults.controlsParkingBrake', 0)),
    field('CONTROL_STEERING_TOTAL', optional(t, 'drivingFaults.controlsSteering', 0)),
    field('CONTROL_BALANCE_TOTAL', optional(t, 'drivingFaults.controlsBalanceSlowControl', 0)),
    field('MOVE_OFF_SAFETY_TOTAL', optional(t, 'drivingFaults.moveOffSafety', 0)),
    field('MOVE_OFF_CONTROL_TOTAL', optional(t, 'drivingFaults.moveOffControl', 0)),
    field('MIRRORS_MC_REAR_SIG_TOTAL', optional(t, 'drivingFaults.useOfMirrorsSignalling', 0)),
    field('MIRRORS_MC_REAR_DIR_TOTAL', optional(t, 'drivingFaults.useOfMirrorsChangeDirection', 0)),
    field('MIRRORS_MC_REAR_SPE_TOTAL', optional(t, 'drivingFaults.useOfMirrorsChangeSpeed', 0)),
    field('SIGNALS_NECESSARY_TOTAL', optional(t, 'drivingFaults.signalsNecessary', 0)),
    field('SIGNALS_CORRECTLY_TOTAL', optional(t, 'drivingFaults.signalsCorrectly', 0)),
    field('CLEARANCE_OBSTRUCT_TOTAL', optional(t, 'drivingFaults.clearanceOrObstructions', 0)),
    field('SIGNALS_TIMED_TOTAL', optionalBoolean(t, 'drivingFaults.signalsTimed')),
    field('RESPONSE_TRAF_SIGNS_TOTAL', optionalBoolean(t, 'drivingFaults.responseToSignsTrafficSigns')),
    field('RESPONSE_ROAD_MARK_TOTAL', optionalBoolean(t, 'drivingFaults.responseToSignsRoadMarkings')),
    field('RESPONSE_TRAF_LIGHT_TOTAL', optionalBoolean(t, 'drivingFaults.responseToSignsTrafficLights')),
    field('RESPONSE_TRAF_CONT_TOTAL', optionalBoolean(t, 'drivingFaults.responseToSignsTrafficControllers')),
    field('RESPONSE_OTHER_TOTAL', optionalBoolean(t, 'drivingFaults.responseToSignsOtherRoadUsers')),
    field('USE_OF_SPEED_TOTAL', optional(t, 'drivingFaults.useOfSpeed', 0)),
    field('FOLLOWING_DISTANCE_TOTAL', optional(t, 'drivingFaults.followingDistance', 0)),
    field('MAINTAIN_PROG_SPEED_TOTAL', optional(t, 'drivingFaults.progressAppropriateSpeed', 0)),
    field('MAINTAIN_PROG_HES_TOTAL', optional(t, 'drivingFaults.progressUndueHesitation', 0)),
    field('JUNCTIONS_SPEED_TOTAL', optional(t, 'drivingFaults.junctionsApproachSpeed', 0)),
    field('JUNCTIONS_OBSERV_TOTAL', optional(t, 'drivingFaults.junctionsObservation', 0)),
    field('JUNCTIONS_TURN_RIGHT_TOTAL', optional(t, 'drivingFaults.junctionsTurningRight', 0)),
    field('JUNCTIONS_TURN_LEFT_TOTAL', optional(t, 'drivingFaults.junctionsTurningLeft', 0)),
    field('JUNCTIONS_TURN_CUT_TOTAL', optional(t, 'drivingFaults.junctionsCuttingCorners', 0)),
    field('JUDGEMENT_OVER_TOTAL', optional(t, 'drivingFaults.judgementOvertaking', 0)),
    field('JUDGEMENT_MEET_TOTAL', optional(t, 'drivingFaults.judgementMeeting', 0)),
    field('JUDGEMENT_CROSS_TOTAL', optional(t, 'drivingFaults.judgementCrossing', 0)),
    field('POSITIONING_NORMAL_TOTAL', optional(t, 'drivingFaults.positioningNormalDriving', 0)),
    field('POSITIONING_LANE_TOTAL', optional(t, 'drivingFaults.positioningLaneDiscipline', 0)),
    field('PEDESTRIAN_CROSSING_TOTAL', optional(t, 'drivingFaults.pedestrianCrossings', 0)),
    field('POSTITION_STOPS_TOTAL', optional(t, 'drivingFaults.positionNormalStops', 0)),
    field('AWARENESS_PLAN_TOTAL', optional(t, 'drivingFaults.awarenessPlanning', 0)),
    field('ANCILLARY_CONTROLS_TOTAL', optional(t, 'drivingFaults.ancillaryControls', 0)),
    field('CONTROL_ACC_SERIOUS', optional(t, 'seriousFaults.controlsThrottle', 0)),
    field('CONTROL_CLUTCH_SERIOUS', optional(t, 'seriousFaults.controlsClutch', 0)),
    field('CONTROL_GEARS_SERIOUS', optional(t, 'seriousFaults.controlsGears', 0)),
    field('CONTROL_FOOTBRAKE_SERIOUS', optional(t, 'seriousFaults.controlsFootbrake', 0)),
    field('CONTROL_PARK_SERIOUS', optional(t, 'seriousFaults.controlsParkingBrake', 0)),
    field('CONTROL_STEERING_SERIOUS', optional(t, 'seriousFaults.controlsSteering', 0)),
    field('CONTROL_BALANCE_SERIOUS', optional(t, 'seriousFaults.controlsBalanceSlowControl', 0)),
    field('MOVE_OFF_SAFETY_SERIOUS', optional(t, 'seriousFaults.moveOffSafety', 0)),
    field('MOVE_OFF_CONTROL_SERIOUS', optional(t, 'seriousFaults.moveOffControl', 0)),
    field('MIRRORS_MC_REAR_SIG_SERIOUS', optional(t, 'seriousFaults.useOfMirrorsSignalling', 0)),
    field('MIRRORS_MC_REAR_DIR_SERIOUS', optional(t, 'seriousFaults.useOfMirrorsChangeDirection', 0)),
    field('MIRRORS_MC_REAR_SPE_SERIOUS', optional(t, 'seriousFaults.useOfMirrorsChangeSpeed', 0)),
    field('SIGNALS_NECESSARY_SERIOUS', optional(t, 'seriousFaults.signalsNecessary', 0)),
    field('SIGNALS_CORRECTLY_SERIOUS', optional(t, 'seriousFaults.signalsCorrectly', 0)),
    field('SIGNALS_TIMED_SERIOUS', optionalBoolean(t, 'seriousFaults.signalsTimed')),
    field('CLEARANCE_OBSTRUCT_SERIOUS', optional(t, 'seriousFaults.clearanceOrObstructions', 0)),
    field('RESPONSE_TRAF_SIGNS_SERIOUS', optionalBoolean(t, 'seriousFaults.responseToSignsTrafficSigns')),
    field('RESPONSE_ROAD_MARK_SERIOUS', optionalBoolean(t, 'seriousFaults.responseToSignsRoadMarkings')),
    field('RESPONSE_TRAF_LIGHT_SERIOUS', optionalBoolean(t, 'seriousFaults.responseToSignsTrafficLights')),
    field('RESPONSE_TRAF_CONT_SERIOUS', optionalBoolean(t, 'seriousFaults.responseToSignsTrafficControllers')),
    field('RESPONSE_OTHER_SERIOUS', optionalBoolean(t, 'seriousFaults.responseToSignsOtherRoadUsers')),
    field('USE_OF_SPEED_SERIOUS', optional(t, 'seriousFaults.useOfSpeed', 0)),
    field('FOLLOWING_DISTANCE_SERIOUS', optional(t, 'seriousFaults.followingDistance', 0)),
    field('MAINTAIN_PROG_SPEED_SERIOUS', optional(t, 'seriousFaults.progressAppropriateSpeed', 0)),
    field('MAINTAIN_PROG_HES_SERIOUS', optional(t, 'seriousFaults.progressUndueHesitation', 0)),
    field('JUNCTIONS_SPEED_SERIOUS', optional(t, 'seriousFaults.junctionsApproachSpeed', 0)),
    field('JUNCTIONS_OBSERV_SERIOUS', optional(t, 'seriousFaults.junctionsObservation', 0)),
    field('JUNCTIONS_TURN_RIGHT_SERIOUS', optional(t, 'seriousFaults.junctionsTurningRight', 0)),
    field('JUNCTIONS_TURN_LEFT_SERIOUS', optional(t, 'seriousFaults.junctionsTurningLeft', 0)),
    field('JUNCTIONS_TURN_CUT_SERIOUS', optional(t, 'seriousFaults.junctionsCuttingCorners', 0)),
    field('JUDGEMENT_OVER_SERIOUS', optional(t, 'seriousFaults.judgementOvertaking', 0)),
    field('JUDGEMENT_MEET_SERIOUS', optional(t, 'seriousFaults.judgementMeeting', 0)),
    field('JUDGEMENT_CROSS_SERIOUS', optional(t, 'seriousFaults.judgementCrossing', 0)),
    field('POSITIONING_NORMAL_SERIOUS', optional(t, 'seriousFaults.positioningNormalDriving', 0)),
    field('POSITIONING_LANE_SERIOUS', optional(t, 'seriousFaults.positioningLaneDiscipline', 0)),
    field('PEDESTRIAN_CROSSING_SERIOUS', optional(t, 'seriousFaults.pedestrianCrossings', 0)),
    field('POSTITION_STOPS_SERIOUS', optional(t, 'seriousFaults.positionNormalStops', 0)),
    field('AWARENESS_PLAN_SERIOUS', optional(t, 'seriousFaults.awarenessPlanning', 0)),
    field('ANCILLARY_CONTROLS_SERIOUS', optional(t, 'seriousFaults.ancillaryControls', 0)),
    field('CONTROL_ACC_DANGEROUS', optional(t, 'dangerousFaults.controlsThrottle', 0)),
    field('CONTROL_CLUTCH_DANGEROUS', optional(t, 'dangerousFaults.controlsClutch', 0)),
    field('CONTROL_GEARS_DANGEROUS', optional(t, 'dangerousFaults.controlsGears', 0)),
    field('CONTROL_FOOTBRAKE_DANGEROUS', optional(t, 'dangerousFaults.controlsFootbrake', 0)),
    field('CONTROL_PARK_DANGEROUS', optional(t, 'dangerousFaults.controlsParkingBrake', 0)),
    field('CONTROL_STEERING_DANGEROUS', optional(t, 'dangerousFaults.controlsSteering', 0)),
    field('CONTROL_BALANCE_DANGEROUS', optional(t, 'dangerousFaults.controlsBalanceSlowControl', 0)),
    field('MOVE_OFF_SAFETY_DANGEROUS', optional(t, 'dangerousFaults.moveOffSafety', 0)),
    field('MOVE_OFF_CONTROL_DANGEROUS', optional(t, 'dangerousFaults.moveOffControl', 0)),
    field('MIRRORS_MC_REAR_SIG_DANGEROUS', optional(t, 'dangerousFaults.useOfMirrorsSignalling', 0)),
    field('MIRRORS_MC_REAR_DIR_DANGEROUS', optional(t, 'dangerousFaults.useOfMirrorsChangeDirection', 0)),
    field('MIRRORS_MC_REAR_SPE_DANGEROUS', optional(t, 'dangerousFaults.useOfMirrorsChangeSpeed', 0)),
    field('SIGNALS_NECESSARY_DANGEROUS', optional(t, 'dangerousFaults.signalsNecessary', 0)),
    field('SIGNALS_CORRECTLY_DANGEROUS', optional(t, 'dangerousFaults.signalsCorrectly', 0)),
    field('SIGNALS_TIMED_DANGEROUS', optionalBoolean(t, 'dangerousFaults.signalsTimed')),
    field('CLEARANCE_OBSTRUCT_DANGEROUS', optional(t, 'dangerousFaults.clearanceOrObstructions', 0)),
    field('RESPONSE_TRAF_SIGNS_DANGEROUS', optionalBoolean(t, 'dangerousFaults.responseToSignsTrafficSigns')),
    field('RESPONSE_ROAD_MARK_DANGEROUS', optionalBoolean(t, 'dangerousFaults.responseToSignsRoadMarkings')),
    field('RESPONSE_TRAF_LIGHT_DANGEROUS', optionalBoolean(t, 'dangerousFaults.responseToSignsTrafficLights')),
    field('RESPONSE_TRAF_CONT_DANGEROUS', optionalBoolean(t, 'dangerousFaults.responseToSignsTrafficControllers')),
    field('RESPONSE_OTHER_DANGEROUS', optionalBoolean(t, 'dangerousFaults.responseToSignsOtherRoadUsers')),
    field('USE_OF_SPEED_DANGEROUS', optional(t, 'dangerousFaults.useOfSpeed', 0)),
    field('FOLLOWING_DISTANCE_DANGEROUS', optional(t, 'dangerousFaults.followingDistance', 0)),
    field('MAINTAIN_PROG_SPEED_DANGEROUS', optional(t, 'dangerousFaults.progressAppropriateSpeed', 0)),
    field('MAINTAIN_PROG_HES_DANGEROUS', optional(t, 'dangerousFaults.progressUndueHesitation', 0)),
    field('JUNCTIONS_SPEED_DANGEROUS', optional(t, 'dangerousFaults.junctionsApproachSpeed', 0)),
    field('JUNCTIONS_OBSERV_DANGEROUS', optional(t, 'dangerousFaults.junctionsObservation', 0)),
    field('JUNCTIONS_TURN_RIGHT_DANGEROUS', optional(t, 'dangerousFaults.junctionsTurningRight', 0)),
    field('JUNCTIONS_TURN_LEFT_DANGEROUS', optional(t, 'dangerousFaults.junctionsTurningLeft', 0)),
    field('JUNCTIONS_TURN_CUT_DANGEROUS', optional(t, 'dangerousFaults.junctionsCuttingCorners', 0)),
    field('JUDGEMENT_OVER_DANGEROUS', optional(t, 'dangerousFaults.judgementOvertaking', 0)),
    field('JUDGEMENT_MEET_DANGEROUS', optional(t, 'dangerousFaults.judgementMeeting', 0)),
    field('JUDGEMENT_CROSS_DANGEROUS', optional(t, 'dangerousFaults.judgementCrossing', 0)),
    field('POSITIONING_NORMAL_DANGEROUS', optional(t, 'dangerousFaults.positioningNormalDriving', 0)),
    field('POSITIONING_LANE_DANGEROUS', optional(t, 'dangerousFaults.positioningLaneDiscipline', 0)),
    field('PEDESTRIAN_CROSSING_DANGEROUS', optional(t, 'dangerousFaults.pedestrianCrossings', 0)),
    field('POSTITION_STOPS_DANGEROUS', optional(t, 'dangerousFaults.positionNormalStops', 0)),
    field('AWARENESS_PLAN_DANGEROUS', optional(t, 'dangerousFaults.awarenessPlanning', 0)),
    field('ANCILLARY_CONTROLS_DANGEROUS', optional(t, 'dangerousFaults.ancillaryControls', 0)),
    field('EYESIGHT_SERIOUS', optionalBoolean(t, 'eyesightTest.seriousFault')),
    field('EYESIGHT_COMPLETED', optionalBoolean(t, 'eyesightTest.complete')),
  ];

  addIfSet(m, 'EYESIGHT_COMMENT', optional(t, 'eyesightTest.faultComments', null));
  addIfSet(m, 'PRECAUTIONS_COMMENT', getCompetencyComments(t, 'precautionsComments'));
  addIfSet(m, 'CONTROL_ACC_COMMENT', getCompetencyComments(t, 'controlsThrottleComments'));
  addIfSet(m, 'CONTROL_CLUTCH_COMMENT', getCompetencyComments(t, 'controlsClutchComments'));
  addIfSet(m, 'CONTROL_GEARS_COMMENT', getCompetencyComments(t, 'controlsGearsComments'));
  addIfSet(m, 'CONTROL_FOOTBRAKE_COMMENT', getCompetencyComments(t, 'controlsFootbrakeComments'));
  addIfSet(m, 'CONTROL_PARK_COMMENT', getCompetencyComments(t, 'controlsParkingBrakeComments'));
  addIfSet(m, 'CONTROL_STEERING_COMMENT', getCompetencyComments(t, 'controlsSteeringComments'));
  addIfSet(m, 'MOVE_OFF_SAFETY_COMMENT', getCompetencyComments(t, 'moveOffSafetyComments'));
  addIfSet(m, 'MOVE_OFF_CONTROL_COMMENT', getCompetencyComments(t, 'moveOffControlComments'));
  addIfSet(m, 'MIRRORS_MC_REAR_SIG_COMMENT', getCompetencyComments(t, 'useOfMirrorsSignallingComments'));
  addIfSet(m, 'MIRRORS_MC_REAR_DIR_COMMENT', getCompetencyComments(t, 'useOfMirrorsChangeDirectionComments'));
  addIfSet(m, 'MIRRORS_MC_REAR_SPE_COMMENT', getCompetencyComments(t, 'useOfMirrorsChangeSpeedComments'));
  addIfSet(m, 'SIGNALS_NECESSARY_COMMENT', getCompetencyComments(t, 'signalsNecessaryComments'));
  addIfSet(m, 'SIGNALS_CORRECTLY_COMMENT', getCompetencyComments(t, 'signalsCorrectlyComments'));
  addIfSet(m, 'SIGNALS_TIMED_COMMENT', getCompetencyComments(t, 'signalsTimedComments'));
  addIfSet(m, 'CLEARANCE_OBSTRUCT_COMMENT', getCompetencyComments(t, 'clearanceOrObstructionsComments'));
  addIfSet(m, 'RESPONSE_TRAF_SIGNS_COMMENT', getCompetencyComments(t, 'responseToSignsTrafficSignsComments'));
  addIfSet(m, 'RESPONSE_ROAD_MARK_COMMENT', getCompetencyComments(t, 'responseToSignsRoadMarkingsComments'));
  addIfSet(m, 'RESPONSE_TRAF_LIGHT_COMMENT', getCompetencyComments(t, 'responseToSignsTrafficLightsComments'));
  addIfSet(m, 'RESPONSE_TRAF_CONT_COMMENT', getCompetencyComments(t, 'responseToSignsTrafficControllersComments'));
  addIfSet(m, 'RESPONSE_OTHER_COMMENT', getCompetencyComments(t, 'responseToSignsOtherRoadUsersComments'));
  addIfSet(m, 'USE_OF_SPEED_COMMENT', getCompetencyComments(t, 'useOfSpeedComments'));
  addIfSet(m, 'FOLLOWING_DISTANCE_COMMENT', getCompetencyComments(t, 'followingDistanceComments'));
  addIfSet(m, 'MAINTAIN_PROG_SPEED_COMMENT', getCompetencyComments(t, 'progressAppropriateSpeedComments'));
  addIfSet(m, 'MAINTAIN_PROG_HES_COMMENT', getCompetencyComments(t, 'progressUndueHesitationComments'));
  addIfSet(m, 'JUNCTIONS_SPEED_COMMENT', getCompetencyComments(t, 'junctionsApproachSpeedComments'));
  addIfSet(m, 'JUNCTIONS_OBSERV_COMMENT', getCompetencyComments(t, 'junctionsObservationComments'));
  addIfSet(m, 'JUNCTIONS_TURN_RIGHT_COMMENT', getCompetencyComments(t, 'junctionsTurningRightComments'));
  addIfSet(m, 'JUNCTIONS_TURN_LEFT_COMMENT', getCompetencyComments(t, 'junctionsTurningLeftComments'));
  addIfSet(m, 'JUNCTIONS_TURN_CUT_COMMENT', getCompetencyComments(t, 'junctionsCuttingCornersComments'));
  addIfSet(m, 'JUDGEMENT_OVER_COMMENT', getCompetencyComments(t, 'judgementOvertakingComments'));
  addIfSet(m, 'JUDGEMENT_MEET_COMMENT', getCompetencyComments(t, 'judgementMeetingComments'));
  addIfSet(m, 'JUDGEMENT_CROSS_COMMENT', getCompetencyComments(t, 'judgementCrossingComments'));
  addIfSet(m, 'POSITIONING_NORMAL_COMMENT', getCompetencyComments(t, 'positioningNormalDrivingComments'));
  addIfSet(m, 'POSITIONING_LANE_COMMENT', getCompetencyComments(t, 'positioningLaneDisciplineComments'));
  addIfSet(m, 'PEDESTRIAN_CROSSING_COMMENT', getCompetencyComments(t, 'pedestrianCrossingsComments'));
  addIfSet(m, 'POSITION_STOPS_COMMENT', getCompetencyComments(t, 'positionNormalStopsComments'));
  addIfSet(m, 'AWARENESS_PLAN_COMMENT', getCompetencyComments(t, 'awarenessPlanningComments'));
  addIfSet(m, 'ANCILLARY_CONTROLS_COMMENT', getCompetencyComments(t, 'ancillaryControlsComments'));
  addIfSet(m, 'INDEPENDENT_DRIVING', optional(result, 'testResult.testSummary.independentDriving', null));

  return m;
};
