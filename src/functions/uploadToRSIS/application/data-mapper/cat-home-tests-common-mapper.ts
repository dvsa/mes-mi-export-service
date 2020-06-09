import { ResultUpload } from '../result-client';
import { DataField } from '../../domain/mi-export-data';
import {
  addIfSet,
  field,
  formatManoeuvreFault,
  formatManoeuvreSerious, formatQuestionDangerous,
  getCompetencyComments,
  optional,
  optionalBoolean,
  formatQuestionFaultF,
  formatManoeuvreDangerous,
  formatQuestionCompleted,
  formatManoeuvreComment,
} from './data-mapper';
import { formatGearboxCategoryWithOverride } from '../helpers/shared-formatters';
import { CatFUniqueTypes } from '@dvsa/mes-test-schema/categories/F';
import { get } from 'lodash';
import { HighwayCodeSafety } from '@dvsa/mes-test-schema/categories/F/partial';

export const mapCommonCatHomeTestsData = (result: ResultUpload): DataField[] => {
  const t = result.testResult.testData as CatFUniqueTypes.TestData;
  const category = result.testResult.category;

  const m: DataField[] = [
    field('AUTOMATIC_TEST', formatGearboxCategoryWithOverride(category, result)),
    field('H_CODE_SAFETY_TOTAL', getSafetyQuestionFaultCount(t)),
    field('CONTROL_STOP_PROMPT_TOTAL', formatManoeuvreFault(t, 'controlledStop.fault')),
    // unused - CONTROL_STOP_CONTROL_TOTAL
    field('REV_LEFT_TRAIL_CONT_TOTAL', formatManoeuvreFault(t, 'manoeuvres.reverseLeft.controlFault')),
    field('REV_LEFT_TRAIL_OBSERV_TOTAL', formatManoeuvreFault(t, 'manoeuvres.reverseLeft.observationFault')),
    // unused - REV_RIGHT_TRAIL_CONT_TOTAL
    // unused - REV_RIGHT_TRAIL_OBSERV_TOTAL
    // unused - REVERSE_PARK_CONT_TOTAL
    // unused - REVERSE_PARK_OBSERV_TOTAL
    // unused - REV_PARK_CPARK_CONTROL_TOTAL
    // unused - REV_PARK_CPARK_OBSERVE_TOTAL
    // unused - REV_PARK_ROAD_CONTROL_TOTAL
    // unused - REV_PARK_ROAD_OBSERVE_TOTAL
    // unused - TURN_IN_ROAD_CONT_TOTAL
    // unused - TURN_IN_ROAD_OBSERV_TOTAL
    field('VEHICLE_CHECKS_TOTAL', formatQuestionFaultF(t)),
    field('VEHICLE_CHECKS_COMPLETED', formatQuestionCompleted(t, 2)),
    // unused - TAXI_MAN_CONTROL_TOTAL
    // unused - TAXI_MAN_OBSERV_TOTAL
    // unused - TAXI_WHEELCHAIR_TOTAL
    field('PRECAUTIONS_TOTAL', optional(t, 'drivingFaults.precautions', 0)),
    field('CONTROL_ACC_TOTAL', optional(t, 'drivingFaults.controlsAccelerator', 0)),
    field('CONTROL_CLUTCH_TOTAL', optional(t, 'drivingFaults.controlsClutch', 0)),
    field('CONTROL_GEARS_TOTAL', optional(t, 'drivingFaults.controlsGears', 0)),
    field('CONTROL_FOOTBRAKE_TOTAL', optional(t, 'drivingFaults.controlsFootbrake', 0)),
    field('CONTROL_PARK_TOTAL', optional(t, 'drivingFaults.controlsParkingBrake', 0)),
    field('CONTROL_STEERING_TOTAL', optional(t, 'drivingFaults.controlsSteering', 0)),
    //  unused - CONTROL_BALANCE_TOTAL
    //  unused - CONTROL_LGV_PCV_GEAR_TOTAL
    // unused - CONTROL_PCV_DOOR_TOTAL
    field('MOVE_OFF_SAFETY_TOTAL', optional(t, 'drivingFaults.moveOffSafety', 0)),
    field('MOVE_OFF_CONTROL_TOTAL', optional(t, 'drivingFaults.moveOffControl', 0)),
    field('MIRRORS_MC_REAR_SIG_TOTAL', optional(t, 'drivingFaults.useOfMirrorsSignalling', 0)),
    field('MIRRORS_MC_REAR_DIR_TOTAL', optional(t, 'drivingFaults.useOfMirrorsChangeDirection', 0)),
    field('MIRRORS_MC_REAR_SPE_TOTAL', optional(t, 'drivingFaults.useOfMirrorsChangeSpeed', 0)),
    field('SIGNALS_NECESSARY_TOTAL', optional(t, 'drivingFaults.signalsNecessary', 0)),
    field('SIGNALS_CORRECTLY_TOTAL', optional(t, 'drivingFaults.signalsCorrectly', 0)),
    field('SIGNALS_TIMED_TOTAL', optional(t, 'drivingFaults.signalsTimed', 0)),
    field('CLEARANCE_OBSTRUCT_TOTAL', optional(t, 'drivingFaults.clearance', 0)),
    field('RESPONSE_TRAF_SIGNS_TOTAL', optional(t, 'drivingFaults.responseToSignsTrafficSigns', 0)),
    field('RESPONSE_ROAD_MARK_TOTAL', optional(t, 'drivingFaults.responseToSignsRoadMarkings', 0)),
    field('RESPONSE_TRAF_LIGHT_TOTAL', optional(t, 'drivingFaults.responseToSignsTrafficLights', 0)),
    field('RESPONSE_TRAF_CONT_TOTAL', optional(t, 'drivingFaults.responseToSignsTrafficControllers', 0)),
    field('RESPONSE_OTHER_TOTAL', optional(t, 'drivingFaults.responseToSignsOtherRoadUsers', 0)),
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
    // unused - SPARE1_TOTAL
    // unused - SPARE2_TOTAL
    // unused - SPARE3_TOTAL
    // unused - SPARE4_TOTAL
    // unused - SPARE5_TOTAL
    field('EYESIGHT_SERIOUS', optionalBoolean(t, 'eyesightTest.seriousFault')),
    field('CONTROL_STOP_PROMPT_SERIOUS', formatManoeuvreSerious(t, 'controlledStop.fault')),
    // unused - CONTROL_STOP_CONTROL_SERIOUS
    field('REV_LEFT_TRAIL_CONT_SERIOUS', formatManoeuvreSerious(t, 'manoeuvres.reverseLeft.controlFault')),
    field('REV_LEFT_TRAIL_OBSERV_SERIOUS', formatManoeuvreSerious(t, 'manoeuvres.reverseLeft.observationFault')),
    //  unused - REV_RIGHT_TRAIL_CONT_SERIOUS
    //  unused - REV_RIGHT_TRAIL_OBSERV_SERIOUS
    //  unused - REVERSE_PARK_CONT_SERIOUS
    //  unused - REVERSE_PARK_OBSERV_SERIOUS
    //  unused - REV_PARK_CPARK_CONTROL_SERIOUS
    //  unused - REV_PARK_CPARK_OBSERVE_SERIOUS
    //  unused - REV_PARK_ROAD_CONTROL_SERIOUS
    //  unused - REV_PARK_ROAD_OBSERVE_SERIOUS
    //  unused - TURN_IN_ROAD_CONT_SERIOUS
    //  unused - TURN_IN_ROAD_OBSERV_SERIOUS
    //  unused - TAXI_MAN_CONTROL_SERIOUS
    //  unused - TAXI_MAN_OBSERV_SERIOUS
    //  unused - TAXI_WHEELCHAIR_SERIOUS
    field('PRECAUTIONS_SERIOUS', optionalBoolean(t, 'seriousFaults.precautions')),
    field('CONTROL_ACC_SERIOUS', optionalBoolean(t, 'seriousFaults.controlsAccelerator')),
    field('CONTROL_CLUTCH_SERIOUS', optionalBoolean(t, 'seriousFaults.controlsClutch')),
    field('CONTROL_GEARS_SERIOUS', optionalBoolean(t, 'seriousFaults.controlsGears')),
    field('CONTROL_FOOTBRAKE_SERIOUS', optionalBoolean(t, 'seriousFaults.controlsFootbrake')),
    field('CONTROL_PARK_SERIOUS', optionalBoolean(t, 'seriousFaults.controlsParkingBrake')),
    field('CONTROL_STEERING_SERIOUS', optionalBoolean(t, 'seriousFaults.controlsSteering')),
    //  unused - CONTROL_BALANCE_SERIOUS
    //  unused - CONTROL_LGV_PCV_GEAR_SERIOUS
    //  unused - CONTROL_PCV_DOOR_SERIOUS
    field('MOVE_OFF_SAFETY_SERIOUS', optionalBoolean(t, 'seriousFaults.moveOffSafety')),
    field('MOVE_OFF_CONTROL_SERIOUS', optionalBoolean(t, 'seriousFaults.moveOffControl')),
    field('MIRRORS_MC_REAR_SIG_SERIOUS', optionalBoolean(t, 'seriousFaults.useOfMirrorsSignalling')),
    field('MIRRORS_MC_REAR_DIR_SERIOUS', optionalBoolean(t, 'seriousFaults.useOfMirrorsChangeDirection')),
    field('MIRRORS_MC_REAR_SPE_SERIOUS', optionalBoolean(t, 'seriousFaults.useOfMirrorsChangeSpeed')),
    field('SIGNALS_NECESSARY_SERIOUS', optionalBoolean(t, 'seriousFaults.signalsNecessary')),
    field('SIGNALS_CORRECTLY_SERIOUS', optionalBoolean(t, 'seriousFaults.signalsCorrectly')),
    field('SIGNALS_TIMED_SERIOUS', optionalBoolean(t, 'seriousFaults.signalsTimed')),
    field('CLEARANCE_OBSTRUCT_SERIOUS', optionalBoolean(t, 'seriousFaults.clearance')),
    field('RESPONSE_TRAF_SIGNS_SERIOUS', optionalBoolean(t, 'seriousFaults.responseToSignsTrafficSigns')),
    field('RESPONSE_ROAD_MARK_SERIOUS', optionalBoolean(t, 'seriousFaults.responseToSignsRoadMarkings')),
    field('RESPONSE_TRAF_LIGHT_SERIOUS', optionalBoolean(t, 'seriousFaults.responseToSignsTrafficLights')),
    field('RESPONSE_TRAF_CONT_SERIOUS', optionalBoolean(t, 'seriousFaults.responseToSignsTrafficControllers')),
    field('RESPONSE_OTHER_SERIOUS', optionalBoolean(t, 'seriousFaults.responseToSignsOtherRoadUsers')),
    field('USE_OF_SPEED_SERIOUS', optionalBoolean(t, 'seriousFaults.useOfSpeed')),
    field('FOLLOWING_DISTANCE_SERIOUS', optionalBoolean(t, 'seriousFaults.followingDistance')),
    field('MAINTAIN_PROG_SPEED_SERIOUS', optionalBoolean(t, 'seriousFaults.progressAppropriateSpeed')),
    field('MAINTAIN_PROG_HES_SERIOUS', optionalBoolean(t, 'seriousFaults.progressUndueHesitation')),
    field('JUNCTIONS_SPEED_SERIOUS', optionalBoolean(t, 'seriousFaults.junctionsApproachSpeed')),
    field('JUNCTIONS_OBSERV_SERIOUS', optionalBoolean(t, 'seriousFaults.junctionsObservation')),
    field('JUNCTIONS_TURN_RIGHT_SERIOUS', optionalBoolean(t, 'seriousFaults.junctionsTurningRight')),
    field('JUNCTIONS_TURN_LEFT_SERIOUS', optionalBoolean(t, 'seriousFaults.junctionsTurningLeft')),
    field('JUNCTIONS_TURN_CUT_SERIOUS', optionalBoolean(t, 'seriousFaults.junctionsCuttingCorners')),
    field('JUDGEMENT_OVER_SERIOUS', optionalBoolean(t, 'seriousFaults.judgementOvertaking')),
    field('JUDGEMENT_MEET_SERIOUS', optionalBoolean(t, 'seriousFaults.judgementMeeting')),
    field('JUDGEMENT_CROSS_SERIOUS', optionalBoolean(t, 'seriousFaults.judgementCrossing')),
    field('POSITIONING_NORMAL_SERIOUS', optionalBoolean(t, 'seriousFaults.positioningNormalDriving')),
    field('POSITIONING_LANE_SERIOUS', optionalBoolean(t, 'seriousFaults.positioningLaneDiscipline')),
    field('PEDESTRIAN_CROSSING_SERIOUS', optionalBoolean(t, 'seriousFaults.pedestrianCrossings')),
    field('POSTITION_STOPS_SERIOUS', optionalBoolean(t, 'seriousFaults.positionNormalStops')),
    field('AWARENESS_PLAN_SERIOUS', optionalBoolean(t, 'seriousFaults.awarenessPlanning')),
    field('ANCILLARY_CONTROLS_SERIOUS', optionalBoolean(t, 'seriousFaults.ancillaryControls')),
    field('H_CODE_SAFETY_SERIOUS', optionalBoolean(t, 'highwayCodeSafety.seriousFault')),

    // unused - SPARE1_SERIOUS
    // unused - SPARE2_SERIOUS
    // unused - SPARE3_SERIOUS
    // unused - SPARE4_SERIOUS
    // unused - SPARE5_SERIOUS
    // unusued - H_CODE_SAFETY_DANGEROUS
    field('CONTROL_STOP_PROMPT_DANGEROUS', formatManoeuvreDangerous(t, 'controlledStop.fault')),
    // unused - CONTROL_STOP_CONTROL_DANGEROUS
    field('REV_LEFT_TRAIL_CONT_DANGEROUS', formatManoeuvreDangerous(t, 'manoeuvres.reverseLeft.controlFault')),
    field('REV_LEFT_TRAIL_OBSER_DANGEROUS', formatManoeuvreDangerous(t, 'manoeuvres.reverseLeft.observationFault')),
    // unused - REV_RIGHT_TRAIL_CONT_DANGER
    // unused - REV_RIGHT_TRAIL_OBSERV_DANGER
    // unused - REVERSE_PARK_CONTROL_DANGEROUS
    // unused - REVERSE_PARK_OBSERV_DANGEROUS
    // unused - REV_PARK_CPARK_CONTROL_DANGER
    // unused - REV_PARK_CPARK_OBSERVE_DANGER
    // unused - REV_PARK_ROAD_CONTROL_DANGER
    // unused - REV_PARK_ROAD_OBSERVE_DANGER
    //  unused - TURN_IN_ROAD_CONT_DANGEROUS
    //  unused - TURN_IN_ROAD_OBSERV_DANGEROUS
    //  unused - TAXI_MAN_CONTROL_DANGEROUS
    //  unused - TAXI_MAN_OBSERV_DANGEROUS
    //  unused - TAXI_WHEELCHAIR_DANGEROUS
    field('PRECAUTIONS_DANGEROUS', optionalBoolean(t, 'dangerousFaults.precautions')),
    field('CONTROL_ACC_DANGEROUS', optionalBoolean(t, 'dangerousFaults.controlsAccelerator')),
    field('CONTROL_CLUTCH_DANGEROUS', optionalBoolean(t, 'dangerousFaults.controlsClutch')),
    field('CONTROL_GEARS_DANGEROUS', optionalBoolean(t, 'dangerousFaults.controlsGears')),
    field('CONTROL_FOOTBRAKE_DANGEROUS', optionalBoolean(t, 'dangerousFaults.controlsFootbrake')),
    field('CONTROL_PARK_DANGEROUS', optionalBoolean(t, 'dangerousFaults.controlsParkingBrake')),
    field('CONTROL_STEERING_DANGEROUS', optionalBoolean(t, 'dangerousFaults.controlsSteering')),
    //  unused - CONTROL_BALANCE_DANGEROUS
    //  unused - CONTROL_LGV_PCV_GEAR_DANGEROUS
    //  unused - PCV_DOOR_DANGEROUS
    field('MOVE_OFF_SAFETY_DANGEROUS', optionalBoolean(t, 'dangerousFaults.moveOffSafety')),
    field('MOVE_OFF_CONTROL_DANGEROUS', optionalBoolean(t, 'dangerousFaults.moveOffControl')),
    field('MIRRORS_MC_REAR_SIG_DANGEROUS', optionalBoolean(t, 'dangerousFaults.useOfMirrorsSignalling')),
    field('MIRRORS_MC_REAR_DIR_DANGEROUS', optionalBoolean(t, 'dangerousFaults.useOfMirrorsChangeDirection')),
    field('MIRRORS_MC_REAR_SPE_DANGEROUS', optionalBoolean(t, 'dangerousFaults.useOfMirrorsChangeSpeed')),
    field('SIGNALS_NECESSARY_DANGEROUS', optionalBoolean(t, 'dangerousFaults.signalsNecessary')),
    field('SIGNALS_CORRECTLY_DANGEROUS', optionalBoolean(t, 'dangerousFaults.signalsCorrectly')),
    field('SIGNALS_TIMED_DANGEROUS', optionalBoolean(t, 'dangerousFaults.signalsTimed')),
    field('CLEARANCE_OBSTRUCT_DANGEROUS', optionalBoolean(t, 'dangerousFaults.clearance')),
    field('RESPONSE_TRAF_SIGNS_DANGEROUS', optionalBoolean(t, 'dangerousFaults.responseToSignsTrafficSigns')),
    field('RESPONSE_ROAD_MARK_DANGEROUS', optionalBoolean(t, 'dangerousFaults.responseToSignsRoadMarkings')),
    field('RESPONSE_TRAF_LIGHT_DANGEROUS', optionalBoolean(t, 'dangerousFaults.responseToSignsTrafficLights')),
    field('RESPONSE_TRAF_CONT_DANGEROUS', optionalBoolean(t, 'dangerousFaults.responseToSignsTrafficControllers')),
    field('RESPONSE_OTHER_DANGEROUS', optionalBoolean(t, 'dangerousFaults.responseToSignsOtherRoadUsers')),
    field('USE_OF_SPEED_DANGEROUS', optionalBoolean(t, 'dangerousFaults.useOfSpeed')),
    field('FOLLOWING_DISTANCE_DANGEROUS', optionalBoolean(t, 'dangerousFaults.followingDistance')),
    field('MAINTAIN_PROG_SPEED_DANGEROUS', optionalBoolean(t, 'dangerousFaults.progressAppropriateSpeed')),
    field('MAINTAIN_PROG_HES_DANGEROUS', optionalBoolean(t, 'dangerousFaults.progressUndueHesitation')),
    field('JUNCTIONS_SPEED_DANGEROUS', optionalBoolean(t, 'dangerousFaults.junctionsApproachSpeed')),
    field('JUNCTIONS_OBSERV_DANGEROUS', optionalBoolean(t, 'dangerousFaults.junctionsObservation')),
    field('JUNCTIONS_TURN_RIGHT_DANGEROUS', optionalBoolean(t, 'dangerousFaults.junctionsTurningRight')),
    field('JUNCTIONS_TURN_LEFT_DANGEROUS', optionalBoolean(t, 'dangerousFaults.junctionsTurningLeft')),
    field('JUNCTIONS_TURN_CUT_DANGEROUS', optionalBoolean(t, 'dangerousFaults.junctionsCuttingCorners')),
    field('JUDGEMENT_OVER_DANGEROUS', optionalBoolean(t, 'dangerousFaults.judgementOvertaking')),
    field('JUDGEMENT_MEET_DANGEROUS', optionalBoolean(t, 'dangerousFaults.judgementMeeting')),
    field('JUDGEMENT_CROSS_DANGEROUS', optionalBoolean(t, 'dangerousFaults.judgementCrossing')),
    field('POSITIONING_NORMAL_DANGEROUS', optionalBoolean(t, 'dangerousFaults.positioningNormalDriving')),
    field('POSITIONING_LANE_DANGEROUS', optionalBoolean(t, 'dangerousFaults.positioningLaneDiscipline')),
    field('PEDESTRIAN_CROSSING_DANGEROUS', optionalBoolean(t, 'dangerousFaults.pedestrianCrossings')),
    field('POSTITION_STOPS_DANGEROUS', optionalBoolean(t, 'dangerousFaults.positionNormalStops')),
    field('AWARENESS_PLAN_DANGEROUS', optionalBoolean(t, 'dangerousFaults.awarenessPlanning')),
    field('ANCILLARY_CONTROLS_DANGEROUS', optionalBoolean(t, 'dangerousFaults.ancillaryControls')),
    //  unused - SPARE1_DANGEROUS
    //  unused - SPARE2_DANGEROUS
    //  unused - SPARE3_DANGEROUS
    //  unused - SPARE4_DANGEROUS
    //  unused - SPARE5_DANGEROUS
    field('EYESIGHT_COMPLETED', optionalBoolean(t, 'eyesightTest.complete')),
    field('CONTROL_STOP_COMPLETED', optionalBoolean(t, 'controlledStop.selected')),
    field('REV_LEFT_TRAIL_COMPLETED', optionalBoolean(t, 'manoeuvres.reverseLeft.selected')),
    //  unused - REV_RIGHT_TRAIL_COMPLETED
    //  unused - REVERSE_PARK_COMPLETED
    //  unused - REVERSE_PARK_CARPARK
    //  unused - REVERSE_PARK_ROAD
    //  unused - TURN_IN_ROAD_COMPLETED
    //  unused - TAXI_MANOEUVRE_COMPLETED
    //  unused - TAXI_WHEELCHAIR_COMPLETED
    //  unused - CATEGORY_5_REVERSE_ROAD
    //  unused - CATEGORY_5_REVERSE_CAR_PARK
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
    field('NORMAL_STOP_1_COMPLETED', optionalBoolean(t, 'testRequirements.normalStart1')),
    field('NORMAL_STOP_2_COMPLETED', optionalBoolean(t, 'testRequirements.normalStart2')),
    // field('BUS_STOP_1_COMPLETED', optionalBoolean(t, 'testRequirements.busStop1')),
    // field('BUS_STOP_2_COMPLETED', optionalBoolean(t, 'testRequirements.busStop2')),
    field('ANGLED_START_COMPLETED', optionalBoolean(t, 'testRequirements.angledStart')),
    field('UPHILL_START', optionalBoolean(t, 'testRequirements.uphillStartDesignatedStart')),
    field('DOWN_HILL_START', optionalBoolean(t, 'testRequirements.downhillStart')),
    field('HILL_START_COMPLETED', optionalBoolean(t, 'testRequirements.hillStart')),
    field('H_CODE_SAFETY_COMPLETED', optionalBoolean(t, 'highwayCodeSafety.selected')),
  ];

  // add the optional fields, only if set
  addIfSet(m, 'EYESIGHT_COMMENT', optional(t, 'eyesightTest.faultComments', null));
  addIfSet(m, 'PRECAUTIONS_COMMENT', getCompetencyComments(t, 'precautionsComments'));
  addIfSet(m, 'CONTROL_ACC_COMMENT', getCompetencyComments(t, 'controlsAcceleratorComments'));
  addIfSet(m, 'CONTROL_CLUTCH_COMMENT', getCompetencyComments(t, 'controlsClutchComments'));
  addIfSet(m, 'CONTROL_GEARS_COMMENT', getCompetencyComments(t, 'controlsGearsComments'));
  addIfSet(m, 'CONTROL_FOOTBRAKE_COMMENT', getCompetencyComments(t, 'controlsFootbrakeComments'));
  addIfSet(m, 'CONTROL_PARK_COMMENT', getCompetencyComments(t, 'controlsParkingBrakeComments'));
  addIfSet(m, 'CONTROL_STEERING_COMMENT', getCompetencyComments(t, 'controlsSteeringComments'));
//  unused - CONTROL_PCV_DOOR_COMMENT
  addIfSet(m, 'H_CODE_SAFETY_COMMENT', getSafetyQuestionFaultComment(t));
  addIfSet(m, 'CONTROL_STOP_PROMPT_COMMENT', optional(t, 'controlledStop.faultComments', null));
  addIfSet(m, 'MOVE_OFF_SAFETY_COMMENT', getCompetencyComments(t, 'moveOffSafetyComments'));
  addIfSet(m, 'MOVE_OFF_CONTROL_COMMENT', getCompetencyComments(t, 'moveOffControlComments'));
  addIfSet(m, 'MIRRORS_MC_REAR_SIG_COMMENT', getCompetencyComments(t, 'useOfMirrorsSignallingComments'));
  addIfSet(m, 'MIRRORS_MC_REAR_DIR_COMMENT', getCompetencyComments(t, 'useOfMirrorsChangeDirectionComments'));
  addIfSet(m, 'MIRRORS_MC_REAR_SPE_COMMENT', getCompetencyComments(t, 'useOfMirrorsChangeSpeedComments'));
  addIfSet(m, 'SIGNALS_NECESSARY_COMMENT', getCompetencyComments(t, 'signalsNecessaryComments'));
  addIfSet(m, 'SIGNALS_CORRECTLY_COMMENT', getCompetencyComments(t, 'signalsCorrectlyComments'));
  addIfSet(m, 'SIGNALS_TIMED_COMMENT', getCompetencyComments(t, 'signalsTimedComments'));
  addIfSet(m, 'CLEARANCE_OBSTRUCT_COMMENT', getCompetencyComments(t, 'clearanceComments'));
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
  addIfSet(m, 'REV_LEFT_TRAIL_CONT_COMMENT',
           formatManoeuvreComment(t, 'manoeuvres.reverseLeft.controlFaultComments'));
  addIfSet(m, 'REV_LEFT_TRAIL_OBSERV_COMMENT',
           formatManoeuvreComment(t, 'manoeuvres.reverseLeft.observationFaultComments'));
  addIfSet(m, 'SHOW_ME_1_CODE', optional(t, 'vehicleChecks.showMeQuestions[0].code', null));
  addIfSet(m, 'SHOW_ME_1_DESCRIPTION', optional(t, 'vehicleChecks.showMeQuestions[0].description', null));
  addIfSet(m, 'SHOW_ME_2_CODE', optional(t, 'vehicleChecks.showMeQuestions[1].code', null));
  addIfSet(m, 'SHOW_ME_2_DESCRIPTION', optional(t, 'vehicleChecks.showMeQuestions[1].description', null));
  addIfSet(m, 'SHOW_ME_3_CODE', optional(t, 'vehicleChecks.showMeQuestions[2].code', null));
  addIfSet(m, 'SHOW_ME_3_DESCRIPTION', optional(t, 'vehicleChecks.showMeQuestions[2].description', null));
  addIfSet(m, 'TELL_ME_1_CODE', optional(t, 'vehicleChecks.tellMeQuestions[0].code', null));
  addIfSet(m, 'TELL_ME_1_DESCRIPTION', optional(t, 'vehicleChecks.tellMeQuestions[0].description', null));
  addIfSet(m, 'TELL_ME_2_CODE', optional(t, 'vehicleChecks.tellMeQuestions[1].code', null));
  addIfSet(m, 'TELL_ME_2_DESCRIPTION', optional(t, 'vehicleChecks.tellMeQuestions[1].description', null));
  addIfSet(m, 'VEHICLE_CHECKS_COMMENT', optional(t, 'vehicleChecks.showMeTellMeComments', null));
  addIfSet(m, 'INDEPENDENT_DRIVING', optional(result, 'testResult.testSummary.independentDriving', null));

  return m;
};

// TODO unit test
export const getSafetyQuestionFaultCount =
  (testData: CatFUniqueTypes.TestData | undefined): number => {

    if (!testData) {
      return 0;
    }

    const highwayCodeSafety: HighwayCodeSafety | undefined = testData.highwayCodeSafety;

    if (highwayCodeSafety !== undefined) {
      if (highwayCodeSafety.drivingFault) {
        return 1;
      }
    }

    return 0;
  };

export const getSafetyQuestionFaultComment = (testData: CatFUniqueTypes.TestData | undefined): number => {
  return get(testData, 'highwayCodeSafety.faultComments', null);
};
