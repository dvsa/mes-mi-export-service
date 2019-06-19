import { ResultUpload } from '../result-client';
import { DataField } from '../../domain/mi-export-data';
import {
  field,
  formatManoeuvreFault,
  formatEyesightResult,
  formatQuestionFault,
  formatManoeuvreSerious,
  optional,
  formatQuestionSerious,
  optionalBoolean,
  formatManoeuvreDangerous,
  formatQuestionDangerous,
  formatQuestionCompleted,
} from './data-mapper';

/**
 * Maps data specific to the ``B`` (Car) test category.
 *
 * @param result The MES test result
 * @returns The mapped MI Export data
 * @throws MissingTestResultDataError If mandatory data missing from MES test result
 */
export const mapCatBData = (result: ResultUpload): DataField[] => {
  const testData = result.testResult.testData;

  const mappedFields: DataField[] = [
    field('EYESIGHT_SERIOUS', formatEyesightResult(result)),
    //  unused - H_CODE_SAFETY_TOTAL
    field('CONTROL_STOP_PROMPT_TOTAL', formatManoeuvreFault(testData, 'controlledStop.fault')),
    //  unused - CONTROL_STOP_CONTROL_TOTAL
    //  unused - REV_LEFT_TRAIL_CONT_TOTAL
    //  unused - REV_LEFT_TRAIL_OBSERV_TOTAL
    field('REV_RIGHT_TRAIL_CONT_TOTAL', formatManoeuvreFault(testData, 'manoeuvres.reverseRight.controlFault')),
    field('REV_RIGHT_TRAIL_OBSERV_TOTAL', formatManoeuvreFault(testData, 'manoeuvres.reverseRight.observationFault')),

    // ?? question with Gez, as MES records reverse park road and reverse park car park, but RSIS only has 1?
    //  REVERSE_PARK_CONT_TOTAL                            NUMBER(2)
    //  REVERSE_PARK_OBSERV_TOTAL                          NUMBER(2)

    //  unused - TURN_IN_ROAD_CONT_TOTAL
    //  unused - TURN_IN_ROAD_OBSERV_TOTAL
    field('VEHICLE_CHECKS_TOTAL', formatQuestionFault(testData)),
    field('TAXI_MAN_CONTROL_TOTAL', formatManoeuvreFault(testData, 'manoeuvres.forwardPark.controlFault')),
    field('TAXI_MAN_OBSERV_TOTAL', formatManoeuvreFault(testData, 'manoeuvres.forwardPark.observationFault')),
    //  unused - TAXI_WHEELCHAIR_TOTAL
    //  unused - UNCOUPLE_RECOUPLE_TOTAL
    field('PRECAUTIONS_TOTAL', optional(testData, 'drivingFaults.precautions', 0)),
    field('CONTROL_ACC_TOTAL', optional(testData, 'drivingFaults.controlsAccelerator', 0)),
    field('CONTROL_CLUTCH_TOTAL', optional(testData, 'drivingFaults.controlsClutch', 0)),
    field('CONTROL_GEARS_TOTAL', optional(testData, 'drivingFaults.controlsGears', 0)),
    field('CONTROL_FOOTBRAKE_TOTAL', optional(testData, 'drivingFaults.controlsFootbrake', 0)),
    field('CONTROL_PARK_TOTAL', optional(testData, 'drivingFaults.controlsParkingBrake', 0)),
    field('CONTROL_STEERING_TOTAL', optional(testData, 'drivingFaults.controlsSteering', 0)),
    //  unused - CONTROL_BALANCE_TOTAL
    //  unused - CONTROL_LGV_PCV_GEAR_TOTAL
    //  unused - CONTROL_PCV_DOOR_TOTAL
    field('MOVE_OFF_SAFETY_TOTAL', optional(testData, 'drivingFaults.moveOffSafety', 0)),
    field('MOVE_OFF_CONTROL_TOTAL', optional(testData, 'drivingFaults.moveOffControl', 0)),
    field('MIRRORS_MC_REAR_SIG_TOTAL', optional(testData, 'drivingFaults.useOfMirrorsSignalling', 0)),
    field('MIRRORS_MC_REAR_DIR_TOTAL', optional(testData, 'drivingFaults.useOfMirrorsChangeDirection', 0)),
    field('MIRRORS_MC_REAR_SPE_TOTAL', optional(testData, 'drivingFaults.useOfMirrorsChangeSpeed', 0)),
    field('SIGNALS_NECESSARY_TOTAL', optional(testData, 'drivingFaults.signalsNecessary', 0)),
    field('SIGNALS_CORRECTLY_TOTAL', optional(testData, 'drivingFaults.signalsCorrectly', 0)),
    field('SIGNALS_TIMED_TOTAL', optional(testData, 'drivingFaults.signalsTimed', 0)),
    field('CLEARANCE_OBSTRUCT_TOTAL', optional(testData, 'drivingFaults.clearance', 0)),
    field('RESPONSE_TRAF_SIGNS_TOTAL', optional(testData, 'drivingFaults.responseToSignsTrafficSigns', 0)),
    field('RESPONSE_ROAD_MARK_TOTAL', optional(testData, 'drivingFaults.responseToSignsRoadMarkings', 0)),
    field('RESPONSE_TRAF_LIGHT_TOTAL', optional(testData, 'drivingFaults.responseToSignsTrafficLights', 0)),
    field('RESPONSE_TRAF_CONT_TOTAL', optional(testData, 'drivingFaults.responseToSignsTrafficControllers', 0)),
    field('RESPONSE_OTHER_TOTAL', optional(testData, 'drivingFaults.responseToSignsOtherRoadUsers', 0)),
    field('USE_OF_SPEED_TOTAL', optional(testData, 'drivingFaults.useOfSpeed', 0)),
    field('FOLLOWING_DISTANCE_TOTAL', optional(testData, 'drivingFaults.followingDistance', 0)),
    field('MAINTAIN_PROG_SPEED_TOTAL', optional(testData, 'drivingFaults.progressAppropriateSpeed', 0)),
    field('MAINTAIN_PROG_HES_TOTAL', optional(testData, 'drivingFaults.progressUndueHesitation', 0)),
    field('JUNCTIONS_SPEED_TOTAL', optional(testData, 'drivingFaults.junctionsApproachSpeed', 0)),
    field('JUNCTIONS_OBSERV_TOTAL', optional(testData, 'drivingFaults.junctionsObservation', 0)),
    field('JUNCTIONS_TURN_RIGHT_TOTAL', optional(testData, 'drivingFaults.junctionsTurningRight', 0)),
    field('JUNCTIONS_TURN_LEFT_TOTAL', optional(testData, 'drivingFaults.junctionsTurningLeft', 0)),
    field('JUNCTIONS_TURN_CUT_TOTAL', optional(testData, 'drivingFaults.junctionsCuttingCorners', 0)),
    field('JUDGEMENT_OVER_TOTAL', optional(testData, 'drivingFaults.judgementOvertaking', 0)),
    field('JUDGEMENT_MEET_TOTAL', optional(testData, 'drivingFaults.judgementMeeting', 0)),
    field('JUDGEMENT_CROSS_TOTAL', optional(testData, 'drivingFaults.judgementCrossing', 0)),
    field('POSITIONING_NORMAL_TOTAL', optional(testData, 'drivingFaults.positioningNormalDriving', 0)),
    field('POSITIONING_LANE_TOTAL', optional(testData, 'drivingFaults.positioningLaneDiscipline', 0)),
    field('PEDESTRIAN_CROSSING_TOTAL', optional(testData, 'drivingFaults.pedestrianCrossings', 0)),
    field('POSTITION_STOPS_TOTAL', optional(testData, 'drivingFaults.positionNormalStops', 0)),
    field('AWARENESS_PLAN_TOTAL', optional(testData, 'drivingFaults.awarenessPlanning', 0)),
    field('ANCILLARY_CONTROLS_TOTAL', optional(testData, 'drivingFaults.ancillaryControls', 0)),
    //  unused - SPARE1_TOTAL
    //  unused - SPARE2_TOTAL
    //  unused - SPARE3_TOTAL
    //  unused - SPARE4_TOTAL
    //  unused - SPARE5_TOTAL
    //  unused - H_CODE_SAFETY_SERIOUS
    field('CONTROL_STOP_PROMPT_SERIOUS', formatManoeuvreSerious(testData, 'controlledStop.fault')),
    //  unused - CONTROL_STOP_CONTROL_SERIOUS
    //  unused - REV_LEFT_TRAIL_CONT_SERIOUS
    //  unused - REV_LEFT_TRAIL_OBSERV_SERIOUS
    field('REV_RIGHT_TRAIL_CONT_SERIOUS', formatManoeuvreSerious(testData, 'manoeuvres.reverseRight.controlFault')),
    field('REV_RIGHT_TRAIL_OBSERV_SERIOUS',
          formatManoeuvreSerious(testData, 'manoeuvres.reverseRight.observationFault')),

    // ?? question with Gez, as MES records reverse park road and reverse park car park, but RSIS only has 1?
    //  REVERSE_PARK_CONT_SERIOUS                          NUMBER(1)
    //  REVERSE_PARK_OBSERV_SERIOUS                        NUMBER(1)

    //  unused - TURN_IN_ROAD_CONT_SERIOUS
    //  unused - TURN_IN_ROAD_OBSERV_SERIOUS
    field('VEHICLE_CHECKS_SERIOUS', formatQuestionSerious(testData)),
    field('TAXI_MAN_CONTROL_SERIOUS', formatManoeuvreSerious(testData, 'manoeuvres.forwardPark.controlFault')),
    field('TAXI_MAN_OBSERV_SERIOUS', formatManoeuvreSerious(testData, 'manoeuvres.forwardPark.observationFault')),
    //  unused - TAXI_WHEELCHAIR_SERIOUS
    //  unused - UNCOUPLE_RECOUPLE_SERIOUS
    field('PRECAUTIONS_SERIOUS', optionalBoolean(testData, 'seriousFaults.precautions')),
    field('CONTROL_ACC_SERIOUS', optionalBoolean(testData, 'seriousFaults.controlsAccelerator')),
    field('CONTROL_CLUTCH_SERIOUS', optionalBoolean(testData, 'seriousFaults.controlsClutch')),
    field('CONTROL_GEARS_SERIOUS', optionalBoolean(testData, 'seriousFaults.controlsGears')),
    field('CONTROL_FOOTBRAKE_SERIOUS', optionalBoolean(testData, 'seriousFaults.controlsFootbrake')),
    field('CONTROL_PARK_SERIOUS', optionalBoolean(testData, 'seriousFaults.controlsParkingBrake')),
    field('CONTROL_STEERING_SERIOUS', optionalBoolean(testData, 'seriousFaults.controlsSteering')),
    //  unused - CONTROL_BALANCE_SERIOUS
    //  unused - CONTROL_LGV_PCV_GEAR_SERIOUS
    //  unused - CONTROL_PCV_DOOR_SERIOUS
    field('MOVE_OFF_SAFETY_SERIOUS', optionalBoolean(testData, 'seriousFaults.moveOffSafety')),
    field('MOVE_OFF_CONTROL_SERIOUS', optionalBoolean(testData, 'seriousFaults.moveOffControl')),
    field('MIRRORS_MC_REAR_SIG_SERIOUS', optionalBoolean(testData, 'seriousFaults.useOfMirrorsSignalling')),
    field('MIRRORS_MC_REAR_DIR_SERIOUS', optionalBoolean(testData, 'seriousFaults.useOfMirrorsChangeDirection')),
    field('MIRRORS_MC_REAR_SPE_SERIOUS', optionalBoolean(testData, 'seriousFaults.useOfMirrorsChangeSpeed')),
    field('SIGNALS_NECESSARY_SERIOUS', optionalBoolean(testData, 'seriousFaults.signalsNecessary')),
    field('SIGNALS_CORRECTLY_SERIOUS', optionalBoolean(testData, 'seriousFaults.signalsCorrectly')),
    field('SIGNALS_TIMED_SERIOUS', optionalBoolean(testData, 'seriousFaults.signalsTimed')),
    field('CLEARANCE_OBSTRUCT_SERIOUS', optionalBoolean(testData, 'seriousFaults.clearance')),
    field('RESPONSE_TRAF_SIGNS_SERIOUS', optionalBoolean(testData, 'seriousFaults.responseToSignsTrafficSigns')),
    field('RESPONSE_ROAD_MARK_SERIOUS', optionalBoolean(testData, 'seriousFaults.responseToSignsRoadMarkings')),
    field('RESPONSE_TRAF_LIGHT_SERIOUS', optionalBoolean(testData, 'seriousFaults.responseToSignsTrafficLights')),
    field('RESPONSE_TRAF_CONT_SERIOUS', optionalBoolean(testData, 'seriousFaults.responseToSignsTrafficControllers')),
    field('RESPONSE_OTHER_SERIOUS', optionalBoolean(testData, 'seriousFaults.responseToSignsOtherRoadUsers')),
    field('USE_OF_SPEED_SERIOUS', optionalBoolean(testData, 'seriousFaults.useOfSpeed')),
    field('FOLLOWING_DISTANCE_SERIOUS', optionalBoolean(testData, 'seriousFaults.followingDistance')),
    field('MAINTAIN_PROG_SPEED_SERIOUS', optionalBoolean(testData, 'seriousFaults.progressAppropriateSpeed')),
    field('MAINTAIN_PROG_HES_SERIOUS', optionalBoolean(testData, 'seriousFaults.progressUndueHesitation')),
    field('JUNCTIONS_SPEED_SERIOUS', optionalBoolean(testData, 'seriousFaults.junctionsApproachSpeed')),
    field('JUNCTIONS_OBSERV_SERIOUS', optionalBoolean(testData, 'seriousFaults.junctionsObservation')),
    field('JUNCTIONS_TURN_RIGHT_SERIOUS', optionalBoolean(testData, 'seriousFaults.junctionsTurningRight')),
    field('JUNCTIONS_TURN_LEFT_SERIOUS', optionalBoolean(testData, 'seriousFaults.junctionsTurningLeft')),
    field('JUNCTIONS_TURN_CUT_SERIOUS', optionalBoolean(testData, 'seriousFaults.junctionsCuttingCorners')),
    field('JUDGEMENT_OVER_SERIOUS', optionalBoolean(testData, 'seriousFaults.judgementOvertaking')),
    field('JUDGEMENT_MEET_SERIOUS', optionalBoolean(testData, 'seriousFaults.judgementMeeting')),
    field('JUDGEMENT_CROSS_SERIOUS', optionalBoolean(testData, 'seriousFaults.judgementCrossing')),
    field('POSITIONING_NORMAL_SERIOUS', optionalBoolean(testData, 'seriousFaults.positioningNormalDriving')),
    field('POSITIONING_LANE_SERIOUS', optionalBoolean(testData, 'seriousFaults.positioningLaneDiscipline')),
    field('PEDESTRIAN_CROSSING_SERIOUS', optionalBoolean(testData, 'seriousFaults.pedestrianCrossings')),
    field('POSTITION_STOPS_SERIOUS', optionalBoolean(testData, 'seriousFaults.positionNormalStops')),
    field('AWARENESS_PLAN_SERIOUS', optionalBoolean(testData, 'seriousFaults.awarenessPlanning')),
    field('ANCILLARY_CONTROLS_SERIOUS', optionalBoolean(testData, 'seriousFaults.ancillaryControls')),
    //  unused - SPARE1_SERIOUS
    //  unused - SPARE2_SERIOUS
    //  unused - SPARE3_SERIOUS
    //  unused - SPARE4_SERIOUS
    //  unused - SPARE5_SERIOUS
    //  unused - H_CODE_SAFETY_DANGEROUS
    field('CONTROL_STOP_PROMPT_DANGEROUS', formatManoeuvreDangerous(testData, 'controlledStop.fault')),
    //  unused - CONTROL_STOP_CONTROL_DANGEROUS
    //  unused - REV_LEFT_TRAIL_CONT_DANGEROUS
    //  unused - REV_LEFT_TRAIL_OBSER_DANGEROUS
    field('REV_RIGHT_TRAIL_CONT_DANGER', formatManoeuvreDangerous(testData, 'manoeuvres.reverseRight.controlFault')),
    field('REV_RIGHT_TRAIL_OBSERV_DANGER',
          formatManoeuvreDangerous(testData, 'manoeuvres.reverseRight.observationFault')),

    // ?? question with Gez, as MES records reverse park road and reverse park car park, but RSIS only has 1?
    //  REVERSE_PARK_CONT_SERIOUS                          NUMBER(1)
    //  REVERSE_PARK_OBSERV_SERIOUS                        NUMBER(1)

    //  unused - TURN_IN_ROAD_CONT_DANGEROUS
    //  unused - TURN_IN_ROAD_OBSERV_DANGEROUS
    field('VEHICLE_CHECKS_DANGEROUS', formatQuestionDangerous(testData)),
    field('TAXI_MAN_CONTROL_DANGEROUS', formatManoeuvreDangerous(testData, 'manoeuvres.forwardPark.controlFault')),
    field('TAXI_MAN_OBSERV_DANGEROUS', formatManoeuvreDangerous(testData, 'manoeuvres.forwardPark.observationFault')),
    //  unused - TAXI_WHEELCHAIR_DANGEROUS
    //  unused - UNCOUPLE_RECOUPLE_DANGEROUS
    field('PRECAUTIONS_DANGEROUS', optionalBoolean(testData, 'dangerousFaults.precautions')),
    field('CONTROL_ACC_DANGEROUS', optionalBoolean(testData, 'dangerousFaults.controlsAccelerator')),
    field('CONTROL_CLUTCH_DANGEROUS', optionalBoolean(testData, 'dangerousFaults.controlsClutch')),
    field('CONTROL_GEARS_DANGEROUS', optionalBoolean(testData, 'dangerousFaults.controlsGears')),
    field('CONTROL_FOOTBRAKE_DANGEROUS', optionalBoolean(testData, 'dangerousFaults.controlsFootbrake')),
    field('CONTROL_PARK_DANGEROUS', optionalBoolean(testData, 'dangerousFaults.controlsParkingBrake')),
    field('CONTROL_STEERING_DANGEROUS', optionalBoolean(testData, 'dangerousFaults.controlsSteering')),
    //  unused - CONTROL_BALANCE_DANGEROUS
    //  unused - CONTROL_LGV_PCV_GEAR_DANGEROUS
    //  unused - CONTROL_PCV_DOOR_DANGEROUS
    field('MOVE_OFF_SAFETY_DANGEROUS', optionalBoolean(testData, 'dangerousFaults.moveOffSafety')),
    field('MOVE_OFF_CONTROL_DANGEROUS', optionalBoolean(testData, 'dangerousFaults.moveOffControl')),
    field('MIRRORS_MC_REAR_SIG_DANGEROUS', optionalBoolean(testData, 'dangerousFaults.useOfMirrorsSignalling')),
    field('MIRRORS_MC_REAR_DIR_DANGEROUS', optionalBoolean(testData, 'dangerousFaults.useOfMirrorsChangeDirection')),
    field('MIRRORS_MC_REAR_SPE_DANGEROUS', optionalBoolean(testData, 'dangerousFaults.useOfMirrorsChangeSpeed')),
    field('SIGNALS_NECESSARY_DANGEROUS', optionalBoolean(testData, 'dangerousFaults.signalsNecessary')),
    field('SIGNALS_CORRECTLY_DANGEROUS', optionalBoolean(testData, 'dangerousFaults.signalsCorrectly')),
    field('SIGNALS_TIMED_DANGEROUS', optionalBoolean(testData, 'dangerousFaults.signalsTimed')),
    field('CLEARANCE_OBSTRUCT_DANGEROUS', optionalBoolean(testData, 'dangerousFaults.clearance')),
    field('RESPONSE_TRAF_SIGNS_DANGEROUS', optionalBoolean(testData, 'dangerousFaults.responseToSignsTrafficSigns')),
    field('RESPONSE_ROAD_MARK_DANGEROUS', optionalBoolean(testData, 'dangerousFaults.responseToSignsRoadMarkings')),
    field('RESPONSE_TRAF_LIGHT_DANGEROUS', optionalBoolean(testData, 'dangerousFaults.responseToSignsTrafficLights')),
    field('RESPONSE_TRAF_CONT_DANGEROUS',
          optionalBoolean(testData, 'dangerousFaults.responseToSignsTrafficControllers')),
    field('RESPONSE_OTHER_DANGEROUS', optionalBoolean(testData, 'dangerousFaults.responseToSignsOtherRoadUsers')),
    field('USE_OF_SPEED_DANGEROUS', optionalBoolean(testData, 'dangerousFaults.useOfSpeed')),
    field('FOLLOWING_DISTANCE_DANGEROUS', optionalBoolean(testData, 'dangerousFaults.followingDistance')),
    field('MAINTAIN_PROG_SPEED_DANGEROUS', optionalBoolean(testData, 'dangerousFaults.progressAppropriateSpeed')),
    field('MAINTAIN_PROG_HES_DANGEROUS', optionalBoolean(testData, 'dangerousFaults.progressUndueHesitation')),
    field('JUNCTIONS_SPEED_DANGEROUS', optionalBoolean(testData, 'dangerousFaults.junctionsApproachSpeed')),
    field('JUNCTIONS_OBSERV_DANGEROUS', optionalBoolean(testData, 'dangerousFaults.junctionsObservation')),
    field('JUNCTIONS_TURN_RIGHT_DANGEROUS', optionalBoolean(testData, 'dangerousFaults.junctionsTurningRight')),
    field('JUNCTIONS_TURN_LEFT_DANGEROUS', optionalBoolean(testData, 'dangerousFaults.junctionsTurningLeft')),
    field('JUNCTIONS_TURN_CUT_DANGEROUS', optionalBoolean(testData, 'dangerousFaults.junctionsCuttingCorners')),
    field('JUDGEMENT_OVER_DANGEROUS', optionalBoolean(testData, 'dangerousFaults.judgementOvertaking')),
    field('JUDGEMENT_MEET_DANGEROUS', optionalBoolean(testData, 'dangerousFaults.judgementMeeting')),
    field('JUDGEMENT_CROSS_DANGEROUS', optionalBoolean(testData, 'dangerousFaults.judgementCrossing')),
    field('POSITIONING_NORMAL_DANGEROUS', optionalBoolean(testData, 'dangerousFaults.positioningNormalDriving')),
    field('POSITIONING_LANE_DANGEROUS', optionalBoolean(testData, 'dangerousFaults.positioningLaneDiscipline')),
    field('PEDESTRIAN_CROSSING_DANGEROUS', optionalBoolean(testData, 'dangerousFaults.pedestrianCrossings')),
    field('POSTITION_STOPS_DANGEROUS', optionalBoolean(testData, 'dangerousFaults.positionNormalStops')),
    field('AWARENESS_PLAN_DANGEROUS', optionalBoolean(testData, 'dangerousFaults.awarenessPlanning')),
    field('ANCILLARY_CONTROLS_DANGEROUS', optionalBoolean(testData, 'dangerousFaults.ancillaryControls')),
    //  unused - SPARE1_DANGEROUS
    //  unused - SPARE2_DANGEROUS
    //  unused - SPARE3_DANGEROUS
    //  unused - SPARE4_DANGEROUS
    //  unused - SPARE5_DANGEROUS
    field('CONTROL_STOP_COMPLETED', optionalBoolean(testData, 'controlledStop.selected')),
    //  unused - REV_LEFT_TRAIL_COMPLETED
    field('REV_RIGHT_TRAIL_COMPLETED', optionalBoolean(testData, 'manoeuvres.reverseRight.selected')),

    //  ?? REVERSE_PARK_COMPLETED                             NUMBER(1)

    //  unused - TURN_IN_ROAD_COMPLETED
    field('VEHICLE_CHECKS_COMPLETED', formatQuestionCompleted(testData)),
    field('TAXI_MANOEUVRE_COMPLETED', optionalBoolean(testData, 'manoeuvres.forwardPark.selected')),
    //  unused - TAXI_WHEELCHAIR_COMPLETED
    //  unused - UNCOUPLE_RECOUPLE_COMPLETED

    //  reverse park - CATEGORY_5_REVERSE_ROAD                            NUMBER(1)
    //  reverse park - CATEGORY_5_REVERSE_CAR_PARK                        NUMBER(1)

    //  unused - MC_AVOIDANCE_DANGEROUS                             NUMBER(1)
    //  unused - MC_AVOIDANCE_L                                     NUMBER(1)
    //  unused - MC_AVOIDANCE_R                                     NUMBER(1)
    //  unused - MC_AVOIDANCE_SERIOUS                               NUMBER(1)
    //  unused - MC_AVOIDANCE_SPEED_FIRST                           NUMBER(2)
    //  unused - MC_AVOIDANCE_SPEED_NOT_MET                         NUMBER(1)
    //  unused - MC_AVOIDANCE_SPEED_SECOND                          NUMBER(2)
    //  unused - MC_AVOIDANCE_TOTAL                                 NUMBER(2)
    //  unused - MC_BENDS_DANGEROUS                                 NUMBER(1)
    //  unused - MC_BENDS_SERIOUS                                   NUMBER(1)
    //  unused - MC_BENDS_TOTAL                                     NUMBER(2)
    //  unused - MC_DL196_CBT_CERT_NO                               NUMBER(8)
    //  unused - MC_EMERGENCY_STOP_SPEED_FIRST                      NUMBER(2)
    //  unused - MC_EMERGENCY_STOP_SPEED_SECOND                     NUMBER(2)
    //  unused - MC_EMER_STOP_SPEED_NOT_MET                         NUMBER(1)
    //  unused - MC_MANUAL_HANDLING_DANGEROUS                       NUMBER(1)
    //  unused - MC_MANUAL_HANDLING_SERIOUS                         NUMBER(1)
    //  unused - MC_MANUAL_HANDLING_TOTAL                           NUMBER(2)
    //  unused - MC_SLALOM_DANGEROUS                                NUMBER(1)
    //  unused - MC_SLALOM_SERIOUS                                  NUMBER(1)
    //  unused - MC_SLALOM_TOTAL                                    NUMBER(2)
    //  unused - MC_SLOW_CONTROL_DANGEROUS                          NUMBER(1)
    //  unused - MC_SLOW_CONTROL_SERIOUS                            NUMBER(1)
    //  unused - MC_SLOW_CONTROL_TOTAL                              NUMBER(2)
    //  unused - MC_USE_OF_STAND_DANGEROUS                          NUMBER(1)
    //  unused - MC_USE_OF_STAND_SERIOUS                            NUMBER(1)
    //  unused - MC_USE_OF_STAND_TOTAL                              NUMBER(2)
    //  unused - MC_UTURN_DANGEROUS                                 NUMBER(1)
    //  unused - MC_UTURN_SERIOUS                                   NUMBER(1)
    //  unused - MC_UTURN_TOTAL                                     NUMBER(2)
    //  unused - SPARE6_DANGEROUS                                   NUMBER(1)
    //  unused - SPARE6_SERIOUS                                     NUMBER(1)
    //  unused - SPARE6_TOTAL                                       NUMBER(2)
  ];
  return mappedFields;
};
