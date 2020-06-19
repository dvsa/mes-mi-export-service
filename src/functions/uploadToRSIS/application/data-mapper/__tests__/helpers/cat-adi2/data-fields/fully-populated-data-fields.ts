import { DataField } from '../../../../../../domain/mi-export-data';

export function getADI2FullyPopulatedFaultDataFields(): DataField[] {
  return [
    {
      col: 'REV_PARK_CPARK_CONTROL_COMMENT',
      val: 'reverseParkCarpark control',
    },
    {
      col: 'REV_PARK_CPARK_OBSERVE_COMMENT',
      val: 'reverseParkCarpark  observation',
    },
    {
      col: 'AUTOMATIC_TEST',
      val: 0,
    },
    {
      col: 'CONTROL_STOP_PROMPT_TOTAL',
      val: 1,
    },
    {
      col: 'VEHICLE_CHECKS_TOTAL',
      val: 1,
    },
    {
      col: 'REV_RIGHT_TRAIL_CONT_TOTAL',
      val: 0,
    },
    {
      col: 'REV_RIGHT_TRAIL_OBSERV_TOTAL',
      val: 0,
    },
    {
      col: 'REV_PARK_CPARK_CONTROL_TOTAL',
      val: 1,
    },
    {
      col: 'REV_PARK_CPARK_OBSERVE_TOTAL',
      val: 1,
    },
    {
      col: 'REV_PARK_ROAD_CONTROL_TOTAL',
      val: 0,
    },
    {
      col: 'REV_PARK_ROAD_OBSERVE_TOTAL',
      val: 0,
    },
    {
      col: 'TAXI_MAN_CONTROL_TOTAL',
      val: 0,
    },
    {
      col: 'TAXI_MAN_OBSERV_TOTAL',
      val: 0,
    },
    {
      col: 'ORDIT_TRAINED',
      val: 1,
    },
    {
      col: 'TRAINING_RECS_AVAIL',
      val: 1,
    },
    {
      col: 'PRECAUTIONS_TOTAL',
      val: 2,
    },
    {
      col: 'CONTROL_ACC_TOTAL',
      val: 3,
    },
    {
      col: 'CONTROL_CLUTCH_TOTAL',
      val: 4,
    },
    {
      col: 'CONTROL_GEARS_TOTAL',
      val: 5,
    },
    {
      col: 'CONTROL_FOOTBRAKE_TOTAL',
      val: 6,
    },
    {
      col: 'CONTROL_PARK_TOTAL',
      val: 7,
    },
    {
      col: 'CONTROL_STEERING_TOTAL',
      val: 8,
    },
    {
      col: 'MOVE_OFF_SAFETY_TOTAL',
      val: 9,
    },
    {
      col: 'MOVE_OFF_CONTROL_TOTAL',
      val: 10,
    },
    {
      col: 'MIRRORS_MC_REAR_SIG_TOTAL',
      val: 11,
    },
    {
      col: 'MIRRORS_MC_REAR_DIR_TOTAL',
      val: 12,
    },
    {
      col: 'MIRRORS_MC_REAR_SPE_TOTAL',
      val: 13,
    },
    {
      col: 'SIGNALS_NECESSARY_TOTAL',
      val: 14,
    },
    {
      col: 'SIGNALS_CORRECTLY_TOTAL',
      val: 15,
    },
    {
      col: 'SIGNALS_TIMED_TOTAL',
      val: 16,
    },
    {
      col: 'CLEARANCE_OBSTRUCT_TOTAL',
      val: 17,
    },
    {
      col: 'RESPONSE_TRAF_SIGNS_TOTAL',
      val: 18,
    },
    {
      col: 'RESPONSE_ROAD_MARK_TOTAL',
      val: 19,
    },
    {
      col: 'RESPONSE_TRAF_LIGHT_TOTAL',
      val: 20,
    },
    {
      col: 'RESPONSE_TRAF_CONT_TOTAL',
      val: 21,
    },
    {
      col: 'RESPONSE_OTHER_TOTAL',
      val: 22,
    },
    {
      col: 'USE_OF_SPEED_TOTAL',
      val: 23,
    },
    {
      col: 'FOLLOWING_DISTANCE_TOTAL',
      val: 24,
    },
    {
      col: 'MAINTAIN_PROG_SPEED_TOTAL',
      val: 25,
    },
    {
      col: 'MAINTAIN_PROG_HES_TOTAL',
      val: 26,
    },
    {
      col: 'JUNCTIONS_SPEED_TOTAL',
      val: 27,
    },
    {
      col: 'JUNCTIONS_OBSERV_TOTAL',
      val: 28,
    },
    {
      col: 'JUNCTIONS_TURN_RIGHT_TOTAL',
      val: 29,
    },
    {
      col: 'JUNCTIONS_TURN_LEFT_TOTAL',
      val: 30,
    },
    {
      col: 'JUNCTIONS_TURN_CUT_TOTAL',
      val: 31,
    },
    {
      col: 'JUDGEMENT_OVER_TOTAL',
      val: 32,
    },
    {
      col: 'JUDGEMENT_MEET_TOTAL',
      val: 33,
    },
    {
      col: 'JUDGEMENT_CROSS_TOTAL',
      val: 34,
    },
    {
      col: 'POSITIONING_NORMAL_TOTAL',
      val: 35,
    },
    {
      col: 'POSITIONING_LANE_TOTAL',
      val: 36,
    },
    {
      col: 'PEDESTRIAN_CROSSING_TOTAL',
      val: 37,
    },
    {
      col: 'POSTITION_STOPS_TOTAL',
      val: 38,
    },
    {
      col: 'AWARENESS_PLAN_TOTAL',
      val: 39,
    },
    {
      col: 'ANCILLARY_CONTROLS_TOTAL',
      val: 40,
    },
    {
      col: 'EYESIGHT_SERIOUS',
      val: 0,
    },
    {
      col: 'CONTROL_STOP_PROMPT_SERIOUS',
      val: 0,
    },
    {
      col: 'REV_RIGHT_TRAIL_CONT_SERIOUS',
      val: 0,
    },
    {
      col: 'REV_RIGHT_TRAIL_OBSERV_SERIOUS',
      val: 0,
    },
    {
      col: 'REV_PARK_CPARK_CONTROL_SERIOUS',
      val: 0,
    },
    {
      col: 'REV_PARK_CPARK_OBSERVE_SERIOUS',
      val: 0,
    },
    {
      col: 'REV_PARK_ROAD_CONTROL_SERIOUS',
      val: 0,
    },
    {
      col: 'REV_PARK_ROAD_OBSERVE_SERIOUS',
      val: 0,
    },
    {
      col: 'VEHICLE_CHECKS_SERIOUS',
      val: 0,
    },
    {
      col: 'TAXI_MAN_CONTROL_SERIOUS',
      val: 0,
    },
    {
      col: 'TAXI_MAN_OBSERV_SERIOUS',
      val: 0,
    },
    {
      col: 'PRECAUTIONS_SERIOUS',
      val: 0,
    },
    {
      col: 'CONTROL_ACC_SERIOUS',
      val: 0,
    },
    {
      col: 'CONTROL_CLUTCH_SERIOUS',
      val: 0,
    },
    {
      col: 'CONTROL_GEARS_SERIOUS',
      val: 0,
    },
    {
      col: 'CONTROL_FOOTBRAKE_SERIOUS',
      val: 0,
    },
    {
      col: 'CONTROL_PARK_SERIOUS',
      val: 0,
    },
    {
      col: 'CONTROL_STEERING_SERIOUS',
      val: 0,
    },
    {
      col: 'MOVE_OFF_SAFETY_SERIOUS',
      val: 0,
    },
    {
      col: 'MOVE_OFF_CONTROL_SERIOUS',
      val: 0,
    },
    {
      col: 'MIRRORS_MC_REAR_SIG_SERIOUS',
      val: 0,
    },
    {
      col: 'MIRRORS_MC_REAR_DIR_SERIOUS',
      val: 0,
    },
    {
      col: 'MIRRORS_MC_REAR_SPE_SERIOUS',
      val: 0,
    },
    {
      col: 'SIGNALS_NECESSARY_SERIOUS',
      val: 0,
    },
    {
      col: 'SIGNALS_CORRECTLY_SERIOUS',
      val: 0,
    },
    {
      col: 'SIGNALS_TIMED_SERIOUS',
      val: 0,
    },
    {
      col: 'CLEARANCE_OBSTRUCT_SERIOUS',
      val: 0,
    },
    {
      col: 'RESPONSE_TRAF_SIGNS_SERIOUS',
      val: 0,
    },
    {
      col: 'RESPONSE_ROAD_MARK_SERIOUS',
      val: 0,
    },
    {
      col: 'RESPONSE_TRAF_LIGHT_SERIOUS',
      val: 0,
    },
    {
      col: 'RESPONSE_TRAF_CONT_SERIOUS',
      val: 0,
    },
    {
      col: 'RESPONSE_OTHER_SERIOUS',
      val: 0,
    },
    {
      col: 'USE_OF_SPEED_SERIOUS',
      val: 0,
    },
    {
      col: 'FOLLOWING_DISTANCE_SERIOUS',
      val: 0,
    },
    {
      col: 'MAINTAIN_PROG_SPEED_SERIOUS',
      val: 0,
    },
    {
      col: 'MAINTAIN_PROG_HES_SERIOUS',
      val: 0,
    },
    {
      col: 'JUNCTIONS_SPEED_SERIOUS',
      val: 0,
    },
    {
      col: 'JUNCTIONS_OBSERV_SERIOUS',
      val: 0,
    },
    {
      col: 'JUNCTIONS_TURN_RIGHT_SERIOUS',
      val: 0,
    },
    {
      col: 'JUNCTIONS_TURN_LEFT_SERIOUS',
      val: 0,
    },
    {
      col: 'JUNCTIONS_TURN_CUT_SERIOUS',
      val: 0,
    },
    {
      col: 'JUDGEMENT_OVER_SERIOUS',
      val: 0,
    },
    {
      col: 'JUDGEMENT_MEET_SERIOUS',
      val: 0,
    },
    {
      col: 'JUDGEMENT_CROSS_SERIOUS',
      val: 0,
    },
    {
      col: 'POSITIONING_NORMAL_SERIOUS',
      val: 0,
    },
    {
      col: 'POSITIONING_LANE_SERIOUS',
      val: 0,
    },
    {
      col: 'PEDESTRIAN_CROSSING_SERIOUS',
      val: 0,
    },
    {
      col: 'POSTITION_STOPS_SERIOUS',
      val: 0,
    },
    {
      col: 'AWARENESS_PLAN_SERIOUS',
      val: 0,
    },
    {
      col: 'ANCILLARY_CONTROLS_SERIOUS',
      val: 0,
    },
    {
      col: 'CONTROL_STOP_PROMPT_DANGEROUS',
      val: 0,
    },
    {
      col: 'REV_RIGHT_TRAIL_CONT_DANGER',
      val: 0,
    },
    {
      col: 'REV_RIGHT_TRAIL_OBSERV_DANGER',
      val: 0,
    },
    {
      col: 'REV_PARK_CPARK_CONTROL_DANGER',
      val: 0,
    },
    {
      col: 'REV_PARK_CPARK_OBSERVE_DANGER',
      val: 0,
    },
    {
      col: 'REV_PARK_ROAD_CONTROL_DANGER',
      val: 0,
    },
    {
      col: 'REV_PARK_ROAD_OBSERVE_DANGER',
      val: 0,
    },
    {
      col: 'VEHICLE_CHECKS_DANGEROUS',
      val: 0,
    },
    {
      col: 'TAXI_MAN_CONTROL_DANGEROUS',
      val: 0,
    },
    {
      col: 'TAXI_MAN_OBSERV_DANGEROUS',
      val: 0,
    },
    {
      col: 'PRECAUTIONS_DANGEROUS',
      val: 0,
    },
    {
      col: 'CONTROL_ACC_DANGEROUS',
      val: 0,
    },
    {
      col: 'CONTROL_CLUTCH_DANGEROUS',
      val: 0,
    },
    {
      col: 'CONTROL_GEARS_DANGEROUS',
      val: 0,
    },
    {
      col: 'CONTROL_FOOTBRAKE_DANGEROUS',
      val: 0,
    },
    {
      col: 'CONTROL_PARK_DANGEROUS',
      val: 0,
    },
    {
      col: 'CONTROL_STEERING_DANGEROUS',
      val: 0,
    },
    {
      col: 'MOVE_OFF_SAFETY_DANGEROUS',
      val: 0,
    },
    {
      col: 'MOVE_OFF_CONTROL_DANGEROUS',
      val: 0,
    },
    {
      col: 'MIRRORS_MC_REAR_SIG_DANGEROUS',
      val: 0,
    },
    {
      col: 'MIRRORS_MC_REAR_DIR_DANGEROUS',
      val: 0,
    },
    {
      col: 'MIRRORS_MC_REAR_SPE_DANGEROUS',
      val: 0,
    },
    {
      col: 'SIGNALS_NECESSARY_DANGEROUS',
      val: 0,
    },
    {
      col: 'SIGNALS_CORRECTLY_DANGEROUS',
      val: 0,
    },
    {
      col: 'SIGNALS_TIMED_DANGEROUS',
      val: 0,
    },
    {
      col: 'CLEARANCE_OBSTRUCT_DANGEROUS',
      val: 0,
    },
    {
      col: 'RESPONSE_TRAF_SIGNS_DANGEROUS',
      val: 0,
    },
    {
      col: 'RESPONSE_ROAD_MARK_DANGEROUS',
      val: 0,
    },
    {
      col: 'RESPONSE_TRAF_LIGHT_DANGEROUS',
      val: 0,
    },
    {
      col: 'RESPONSE_TRAF_CONT_DANGEROUS',
      val: 0,
    },
    {
      col: 'RESPONSE_OTHER_DANGEROUS',
      val: 0,
    },
    {
      col: 'USE_OF_SPEED_DANGEROUS',
      val: 0,
    },
    {
      col: 'FOLLOWING_DISTANCE_DANGEROUS',
      val: 0,
    },
    {
      col: 'MAINTAIN_PROG_SPEED_DANGEROUS',
      val: 0,
    },
    {
      col: 'MAINTAIN_PROG_HES_DANGEROUS',
      val: 0,
    },
    {
      col: 'JUNCTIONS_SPEED_DANGEROUS',
      val: 0,
    },
    {
      col: 'JUNCTIONS_OBSERV_DANGEROUS',
      val: 0,
    },
    {
      col: 'JUNCTIONS_TURN_RIGHT_DANGEROUS',
      val: 0,
    },
    {
      col: 'JUNCTIONS_TURN_LEFT_DANGEROUS',
      val: 0,
    },
    {
      col: 'JUNCTIONS_TURN_CUT_DANGEROUS',
      val: 0,
    },
    {
      col: 'JUDGEMENT_OVER_DANGEROUS',
      val: 0,
    },
    {
      col: 'JUDGEMENT_MEET_DANGEROUS',
      val: 0,
    },
    {
      col: 'JUDGEMENT_CROSS_DANGEROUS',
      val: 0,
    },
    {
      col: 'POSITIONING_NORMAL_DANGEROUS',
      val: 0,
    },
    {
      col: 'POSITIONING_LANE_DANGEROUS',
      val: 0,
    },
    {
      col: 'PEDESTRIAN_CROSSING_DANGEROUS',
      val: 0,
    },
    {
      col: 'POSTITION_STOPS_DANGEROUS',
      val: 0,
    },
    {
      col: 'AWARENESS_PLAN_DANGEROUS',
      val: 0,
    },
    {
      col: 'ANCILLARY_CONTROLS_DANGEROUS',
      val: 0,
    },
    {
      col: 'EYESIGHT_COMPLETED',
      val: 1,
    },
    {
      col: 'CONTROL_STOP_COMPLETED',
      val: 1,
    },
    {
      col: 'REV_RIGHT_TRAIL_COMPLETED',
      val: 0,
    },
    {
      col: 'REVERSE_PARK_CARPARK',
      val: 1,
    },
    {
      col: 'REVERSE_PARK_ROAD',
      val: 0,
    },
    {
      col: 'VEHICLE_CHECKS_COMPLETED',
      val: 0,
    },
    {
      col: 'TAXI_MANOEUVRE_COMPLETED',
      val: 0,
    },
    {
      col: 'NORMAL_STOP_1_COMPLETED',
      val: 1,
    },
    {
      col: 'NORMAL_STOP_2_COMPLETED',
      val: 1,
    },
    {
      col: 'ANGLED_START_COMPLETED',
      val: 0,
    },
    {
      col: 'UPHILL_START',
      val: 1,
    },
    {
      col: 'DOWN_HILL_START',
      val: 1,
    },
    {
      col: 'CONTROL_STOP_COMMENT',
      val: 'controlled stop',
    },
    {
      col: 'PRECAUTIONS_COMMENT',
      val: 'Driving fault comment: precautions fault',
    },
    {
      col: 'CONTROL_ACC_COMMENT',
      val: 'Driving fault comment: controls accelerator fault',
    },
    {
      col: 'CONTROL_CLUTCH_COMMENT',
      val: 'Driving fault comment: controls clutch fault',
    },
    {
      col: 'CONTROL_GEARS_COMMENT',
      val: 'Driving fault comment: controls gears fault',
    },
    {
      col: 'CONTROL_FOOTBRAKE_COMMENT',
      val: 'Driving fault comment: controls footbrake fault',
    },
    {
      col: 'CONTROL_PARK_COMMENT',
      val: 'Driving fault comment: controls parking brake fault',
    },
    {
      col: 'CONTROL_STEERING_COMMENT',
      val: 'Driving fault comment: controls steering fault',
    },
    {
      col: 'MOVE_OFF_SAFETY_COMMENT',
      val: 'Driving fault comment: move off safety fault',
    },
    {
      col: 'MOVE_OFF_CONTROL_COMMENT',
      val: 'Driving fault comment: move off control fault',
    },
    {
      col: 'MIRRORS_MC_REAR_SIG_COMMENT',
      val: 'Driving fault comment: use of mirrors signalling fault',
    },
    {
      col: 'MIRRORS_MC_REAR_DIR_COMMENT',
      val: 'Driving fault comment: use of mirrors change direction fault',
    },
    {
      col: 'MIRRORS_MC_REAR_SPE_COMMENT',
      val: 'Driving fault comment: use of mirrors change speed fault',
    },
    {
      col: 'SIGNALS_NECESSARY_COMMENT',
      val: 'Driving fault comment: signals necessary fault',
    },
    {
      col: 'SIGNALS_CORRECTLY_COMMENT',
      val: 'Driving fault comment: signals correctly fault',
    },
    {
      col: 'SIGNALS_TIMED_COMMENT',
      val: 'Driving fault comment: signals timed fault',
    },
    {
      col: 'CLEARANCE_OBSTRUCT_COMMENT',
      val: 'Driving fault comment: clearance fault',
    },
    {
      col: 'RESPONSE_TRAF_SIGNS_COMMENT',
      val: 'Driving fault comment: response to signs traffic signs fault',
    },
    {
      col: 'RESPONSE_ROAD_MARK_COMMENT',
      val: 'Driving fault comment: response to signs road markings fault',
    },
    {
      col: 'RESPONSE_TRAF_LIGHT_COMMENT',
      val: 'Driving fault comment: response to signs traffic lights fault',
    },
    {
      col: 'RESPONSE_TRAF_CONT_COMMENT',
      val: 'Driving fault comment: response to signs traffic controllers fault',
    },
    {
      col: 'RESPONSE_OTHER_COMMENT',
      val: 'Driving fault comment: response to signs other road users fault',
    },
    {
      col: 'USE_OF_SPEED_COMMENT',
      val: 'Driving fault comment: use of speed fault',
    },
    {
      col: 'FOLLOWING_DISTANCE_COMMENT',
      val: 'Driving fault comment: following distance fault',
    },
    {
      col: 'MAINTAIN_PROG_SPEED_COMMENT',
      val: 'Driving fault comment: progress appropriate speed fault',
    },
    {
      col: 'MAINTAIN_PROG_HES_COMMENT',
      val: 'Driving fault comment: progress undue hesitation fault',
    },
    {
      col: 'JUNCTIONS_SPEED_COMMENT',
      val: 'Driving fault comment: junctions approach speed fault',
    },
    {
      col: 'JUNCTIONS_OBSERV_COMMENT',
      val: 'Driving fault comment: junctions observation fault',
    },
    {
      col: 'JUNCTIONS_TURN_RIGHT_COMMENT',
      val: 'Driving fault comment: junctions turning right fault',
    },
    {
      col: 'JUNCTIONS_TURN_LEFT_COMMENT',
      val: 'Driving fault comment: junctions turning left fault',
    },
    {
      col: 'JUNCTIONS_TURN_CUT_COMMENT',
      val: 'Driving fault comment: junctions cutting corners fault',
    },
    {
      col: 'JUDGEMENT_OVER_COMMENT',
      val: 'Driving fault comment: judgement overtaking fault',
    },
    {
      col: 'JUDGEMENT_MEET_COMMENT',
      val: 'Driving fault comment: judgement meeting fault',
    },
    {
      col: 'JUDGEMENT_CROSS_COMMENT',
      val: 'Driving fault comment: judgement crossing fault',
    },
    {
      col: 'POSITIONING_NORMAL_COMMENT',
      val: 'Driving fault comment: positioning normal driving fault',
    },
    {
      col: 'POSITIONING_LANE_COMMENT',
      val: 'Driving fault comment: positioning lane discipline fault',
    },
    {
      col: 'PEDESTRIAN_CROSSING_COMMENT',
      val: 'Driving fault comment: pedestrian crossings fault',
    },
    {
      col: 'POSITION_STOPS_COMMENT',
      val: 'Driving fault comment: position normal stops fault',
    },
    {
      col: 'AWARENESS_PLAN_COMMENT',
      val: 'Driving fault comment: awareness planning fault',
    },
    {
      col: 'ANCILLARY_CONTROLS_COMMENT',
      val: 'Driving fault comment: ancillary controls fault',
    },
    {
      col: 'SHOW_ME_1_CODE',
      val: 'S1',
    },
    {
      col: 'SHOW_ME_1_DESCRIPTION',
      val: 'First Show Me Question',
    },
    {
      col: 'TELL_ME_1_CODE',
      val: 'T1',
    },
    {
      col: 'TELL_ME_1_DESCRIPTION',
      val: 'First Tell Me Question',
    },
    {
      col: 'TELL_ME_2_CODE',
      val: 'T2',
    },
    {
      col: 'TELL_ME_2_DESCRIPTION',
      val: 'Second Tell Me Question',
    },
    {
      col: 'TELL_ME_3_CODE',
      val: 'T3',
    },
    {
      col: 'TELL_ME_3_DESCRIPTION',
      val: 'Third Tell Me Question',
    },
    {
      col: 'VEHICLE_CHECKS_COMMENT',
      val: 'show me tell me fault',
    },
    {
      col: 'INDEPENDENT_DRIVING',
      val: 'Sat nav',
    },
  ];
}

export function getADIFullyPopulatedSeriousDataFields(): DataField[] {
  return [
    {
      col: 'REV_PARK_CPARK_CONTROL_COMMENT',
      val: 'reverseParkCarpark control',
    },
    {
      col: 'REV_PARK_CPARK_OBSERVE_COMMENT',
      val: 'reverseParkCarpark  observation',
    },
    {
      col: 'AUTOMATIC_TEST',
      val: 0,
    },
    {
      col: 'CONTROL_STOP_PROMPT_TOTAL',
      val: 0,
    },
    {
      col: 'VEHICLE_CHECKS_TOTAL',
      val: 0,
    },
    {
      col: 'REV_RIGHT_TRAIL_CONT_TOTAL',
      val: 0,
    },
    {
      col: 'REV_RIGHT_TRAIL_OBSERV_TOTAL',
      val: 0,
    },
    {
      col: 'REV_PARK_CPARK_CONTROL_TOTAL',
      val: 0,
    },
    {
      col: 'REV_PARK_CPARK_OBSERVE_TOTAL',
      val: 0,
    },
    {
      col: 'REV_PARK_ROAD_CONTROL_TOTAL',
      val: 0,
    },
    {
      col: 'REV_PARK_ROAD_OBSERVE_TOTAL',
      val: 0,
    },
    {
      col: 'TAXI_MAN_CONTROL_TOTAL',
      val: 0,
    },
    {
      col: 'TAXI_MAN_OBSERV_TOTAL',
      val: 0,
    },
    {
      col: 'PRECAUTIONS_TOTAL',
      val: 0,
    },
    {
      col: 'CONTROL_ACC_TOTAL',
      val: 0,
    },
    {
      col: 'CONTROL_CLUTCH_TOTAL',
      val: 0,
    },
    {
      col: 'CONTROL_GEARS_TOTAL',
      val: 0,
    },
    {
      col: 'CONTROL_FOOTBRAKE_TOTAL',
      val: 0,
    },
    {
      col: 'CONTROL_PARK_TOTAL',
      val: 0,
    },
    {
      col: 'CONTROL_STEERING_TOTAL',
      val: 0,
    },
    {
      col: 'MOVE_OFF_SAFETY_TOTAL',
      val: 0,
    },
    {
      col: 'MOVE_OFF_CONTROL_TOTAL',
      val: 0,
    },
    {
      col: 'MIRRORS_MC_REAR_SIG_TOTAL',
      val: 0,
    },
    {
      col: 'MIRRORS_MC_REAR_DIR_TOTAL',
      val: 0,
    },
    {
      col: 'MIRRORS_MC_REAR_SPE_TOTAL',
      val: 0,
    },
    {
      col: 'SIGNALS_NECESSARY_TOTAL',
      val: 0,
    },
    {
      col: 'SIGNALS_CORRECTLY_TOTAL',
      val: 0,
    },
    {
      col: 'SIGNALS_TIMED_TOTAL',
      val: 0,
    },
    {
      col: 'CLEARANCE_OBSTRUCT_TOTAL',
      val: 0,
    },
    {
      col: 'RESPONSE_TRAF_SIGNS_TOTAL',
      val: 0,
    },
    {
      col: 'RESPONSE_ROAD_MARK_TOTAL',
      val: 0,
    },
    {
      col: 'RESPONSE_TRAF_LIGHT_TOTAL',
      val: 0,
    },
    {
      col: 'RESPONSE_TRAF_CONT_TOTAL',
      val: 0,
    },
    {
      col: 'RESPONSE_OTHER_TOTAL',
      val: 0,
    },
    {
      col: 'USE_OF_SPEED_TOTAL',
      val: 0,
    },
    {
      col: 'FOLLOWING_DISTANCE_TOTAL',
      val: 0,
    },
    {
      col: 'MAINTAIN_PROG_SPEED_TOTAL',
      val: 0,
    },
    {
      col: 'MAINTAIN_PROG_HES_TOTAL',
      val: 0,
    },
    {
      col: 'JUNCTIONS_SPEED_TOTAL',
      val: 0,
    },
    {
      col: 'JUNCTIONS_OBSERV_TOTAL',
      val: 0,
    },
    {
      col: 'JUNCTIONS_TURN_RIGHT_TOTAL',
      val: 0,
    },
    {
      col: 'JUNCTIONS_TURN_LEFT_TOTAL',
      val: 0,
    },
    {
      col: 'JUNCTIONS_TURN_CUT_TOTAL',
      val: 0,
    },
    {
      col: 'JUDGEMENT_OVER_TOTAL',
      val: 0,
    },
    {
      col: 'JUDGEMENT_MEET_TOTAL',
      val: 0,
    },
    {
      col: 'JUDGEMENT_CROSS_TOTAL',
      val: 0,
    },
    {
      col: 'POSITIONING_NORMAL_TOTAL',
      val: 0,
    },
    {
      col: 'POSITIONING_LANE_TOTAL',
      val: 0,
    },
    {
      col: 'PEDESTRIAN_CROSSING_TOTAL',
      val: 0,
    },
    {
      col: 'POSTITION_STOPS_TOTAL',
      val: 0,
    },
    {
      col: 'AWARENESS_PLAN_TOTAL',
      val: 0,
    },
    {
      col: 'ANCILLARY_CONTROLS_TOTAL',
      val: 0,
    },
    {
      col: 'EYESIGHT_SERIOUS',
      val: 1,
    },
    {
      col: 'CONTROL_STOP_PROMPT_SERIOUS',
      val: 1,
    },
    {
      col: 'REV_RIGHT_TRAIL_CONT_SERIOUS',
      val: 0,
    },
    {
      col: 'REV_RIGHT_TRAIL_OBSERV_SERIOUS',
      val: 0,
    },
    {
      col: 'REV_PARK_CPARK_CONTROL_SERIOUS',
      val: 1,
    },
    {
      col: 'REV_PARK_CPARK_OBSERVE_SERIOUS',
      val: 1,
    },
    {
      col: 'REV_PARK_ROAD_CONTROL_SERIOUS',
      val: 0,
    },
    {
      col: 'REV_PARK_ROAD_OBSERVE_SERIOUS',
      val: 0,
    },
    {
      col: 'VEHICLE_CHECKS_SERIOUS',
      val: 0,
    },
    {
      col: 'TAXI_MAN_CONTROL_SERIOUS',
      val: 0,
    },
    {
      col: 'TAXI_MAN_OBSERV_SERIOUS',
      val: 0,
    },
    {
      col: 'PRECAUTIONS_SERIOUS',
      val: 1,
    },
    {
      col: 'CONTROL_ACC_SERIOUS',
      val: 1,
    },
    {
      col: 'CONTROL_CLUTCH_SERIOUS',
      val: 1,
    },
    {
      col: 'CONTROL_GEARS_SERIOUS',
      val: 1,
    },
    {
      col: 'CONTROL_FOOTBRAKE_SERIOUS',
      val: 1,
    },
    {
      col: 'CONTROL_PARK_SERIOUS',
      val: 1,
    },
    {
      col: 'CONTROL_STEERING_SERIOUS',
      val: 1,
    },
    {
      col: 'MOVE_OFF_SAFETY_SERIOUS',
      val: 1,
    },
    {
      col: 'MOVE_OFF_CONTROL_SERIOUS',
      val: 1,
    },
    {
      col: 'MIRRORS_MC_REAR_SIG_SERIOUS',
      val: 1,
    },
    {
      col: 'MIRRORS_MC_REAR_DIR_SERIOUS',
      val: 1,
    },
    {
      col: 'MIRRORS_MC_REAR_SPE_SERIOUS',
      val: 1,
    },
    {
      col: 'SIGNALS_NECESSARY_SERIOUS',
      val: 1,
    },
    {
      col: 'SIGNALS_CORRECTLY_SERIOUS',
      val: 1,
    },
    {
      col: 'SIGNALS_TIMED_SERIOUS',
      val: 1,
    },
    {
      col: 'CLEARANCE_OBSTRUCT_SERIOUS',
      val: 1,
    },
    {
      col: 'RESPONSE_TRAF_SIGNS_SERIOUS',
      val: 1,
    },
    {
      col: 'RESPONSE_ROAD_MARK_SERIOUS',
      val: 1,
    },
    {
      col: 'RESPONSE_TRAF_LIGHT_SERIOUS',
      val: 1,
    },
    {
      col: 'RESPONSE_TRAF_CONT_SERIOUS',
      val: 1,
    },
    {
      col: 'RESPONSE_OTHER_SERIOUS',
      val: 1,
    },
    {
      col: 'USE_OF_SPEED_SERIOUS',
      val: 1,
    },
    {
      col: 'FOLLOWING_DISTANCE_SERIOUS',
      val: 1,
    },
    {
      col: 'MAINTAIN_PROG_SPEED_SERIOUS',
      val: 1,
    },
    {
      col: 'MAINTAIN_PROG_HES_SERIOUS',
      val: 1,
    },
    {
      col: 'JUNCTIONS_SPEED_SERIOUS',
      val: 1,
    },
    {
      col: 'JUNCTIONS_OBSERV_SERIOUS',
      val: 1,
    },
    {
      col: 'JUNCTIONS_TURN_RIGHT_SERIOUS',
      val: 1,
    },
    {
      col: 'JUNCTIONS_TURN_LEFT_SERIOUS',
      val: 1,
    },
    {
      col: 'JUNCTIONS_TURN_CUT_SERIOUS',
      val: 1,
    },
    {
      col: 'JUDGEMENT_OVER_SERIOUS',
      val: 1,
    },
    {
      col: 'JUDGEMENT_MEET_SERIOUS',
      val: 1,
    },
    {
      col: 'JUDGEMENT_CROSS_SERIOUS',
      val: 1,
    },
    {
      col: 'POSITIONING_NORMAL_SERIOUS',
      val: 1,
    },
    {
      col: 'POSITIONING_LANE_SERIOUS',
      val: 1,
    },
    {
      col: 'PEDESTRIAN_CROSSING_SERIOUS',
      val: 1,
    },
    {
      col: 'POSTITION_STOPS_SERIOUS',
      val: 1,
    },
    {
      col: 'AWARENESS_PLAN_SERIOUS',
      val: 1,
    },
    {
      col: 'ANCILLARY_CONTROLS_SERIOUS',
      val: 1,
    },
    {
      col: 'CONTROL_STOP_PROMPT_DANGEROUS',
      val: 0,
    },
    {
      col: 'REV_RIGHT_TRAIL_CONT_DANGER',
      val: 0,
    },
    {
      col: 'REV_RIGHT_TRAIL_OBSERV_DANGER',
      val: 0,
    },
    {
      col: 'REV_PARK_CPARK_CONTROL_DANGER',
      val: 0,
    },
    {
      col: 'REV_PARK_CPARK_OBSERVE_DANGER',
      val: 0,
    },
    {
      col: 'REV_PARK_ROAD_CONTROL_DANGER',
      val: 0,
    },
    {
      col: 'REV_PARK_ROAD_OBSERVE_DANGER',
      val: 0,
    },
    {
      col: 'VEHICLE_CHECKS_DANGEROUS',
      val: 0,
    },
    {
      col: 'TAXI_MAN_CONTROL_DANGEROUS',
      val: 0,
    },
    {
      col: 'TAXI_MAN_OBSERV_DANGEROUS',
      val: 0,
    },
    {
      col: 'PRECAUTIONS_DANGEROUS',
      val: 0,
    },
    {
      col: 'CONTROL_ACC_DANGEROUS',
      val: 0,
    },
    {
      col: 'CONTROL_CLUTCH_DANGEROUS',
      val: 0,
    },
    {
      col: 'CONTROL_GEARS_DANGEROUS',
      val: 0,
    },
    {
      col: 'CONTROL_FOOTBRAKE_DANGEROUS',
      val: 0,
    },
    {
      col: 'CONTROL_PARK_DANGEROUS',
      val: 0,
    },
    {
      col: 'CONTROL_STEERING_DANGEROUS',
      val: 0,
    },
    {
      col: 'MOVE_OFF_SAFETY_DANGEROUS',
      val: 0,
    },
    {
      col: 'MOVE_OFF_CONTROL_DANGEROUS',
      val: 0,
    },
    {
      col: 'MIRRORS_MC_REAR_SIG_DANGEROUS',
      val: 0,
    },
    {
      col: 'MIRRORS_MC_REAR_DIR_DANGEROUS',
      val: 0,
    },
    {
      col: 'MIRRORS_MC_REAR_SPE_DANGEROUS',
      val: 0,
    },
    {
      col: 'SIGNALS_NECESSARY_DANGEROUS',
      val: 0,
    },
    {
      col: 'SIGNALS_CORRECTLY_DANGEROUS',
      val: 0,
    },
    {
      col: 'SIGNALS_TIMED_DANGEROUS',
      val: 0,
    },
    {
      col: 'CLEARANCE_OBSTRUCT_DANGEROUS',
      val: 0,
    },
    {
      col: 'RESPONSE_TRAF_SIGNS_DANGEROUS',
      val: 0,
    },
    {
      col: 'RESPONSE_ROAD_MARK_DANGEROUS',
      val: 0,
    },
    {
      col: 'RESPONSE_TRAF_LIGHT_DANGEROUS',
      val: 0,
    },
    {
      col: 'RESPONSE_TRAF_CONT_DANGEROUS',
      val: 0,
    },
    {
      col: 'RESPONSE_OTHER_DANGEROUS',
      val: 0,
    },
    {
      col: 'USE_OF_SPEED_DANGEROUS',
      val: 0,
    },
    {
      col: 'FOLLOWING_DISTANCE_DANGEROUS',
      val: 0,
    },
    {
      col: 'MAINTAIN_PROG_SPEED_DANGEROUS',
      val: 0,
    },
    {
      col: 'MAINTAIN_PROG_HES_DANGEROUS',
      val: 0,
    },
    {
      col: 'JUNCTIONS_SPEED_DANGEROUS',
      val: 0,
    },
    {
      col: 'JUNCTIONS_OBSERV_DANGEROUS',
      val: 0,
    },
    {
      col: 'JUNCTIONS_TURN_RIGHT_DANGEROUS',
      val: 0,
    },
    {
      col: 'JUNCTIONS_TURN_LEFT_DANGEROUS',
      val: 0,
    },
    {
      col: 'JUNCTIONS_TURN_CUT_DANGEROUS',
      val: 0,
    },
    {
      col: 'JUDGEMENT_OVER_DANGEROUS',
      val: 0,
    },
    {
      col: 'JUDGEMENT_MEET_DANGEROUS',
      val: 0,
    },
    {
      col: 'JUDGEMENT_CROSS_DANGEROUS',
      val: 0,
    },
    {
      col: 'POSITIONING_NORMAL_DANGEROUS',
      val: 0,
    },
    {
      col: 'POSITIONING_LANE_DANGEROUS',
      val: 0,
    },
    {
      col: 'PEDESTRIAN_CROSSING_DANGEROUS',
      val: 0,
    },
    {
      col: 'POSTITION_STOPS_DANGEROUS',
      val: 0,
    },
    {
      col: 'AWARENESS_PLAN_DANGEROUS',
      val: 0,
    },
    {
      col: 'ANCILLARY_CONTROLS_DANGEROUS',
      val: 0,
    },
    {
      col: 'EYESIGHT_COMPLETED',
      val: 1,
    },
    {
      col: 'CONTROL_STOP_COMPLETED',
      val: 1,
    },
    {
      col: 'REV_RIGHT_TRAIL_COMPLETED',
      val: 0,
    },
    {
      col: 'REVERSE_PARK_CARPARK',
      val: 1,
    },
    {
      col: 'REVERSE_PARK_ROAD',
      val: 0,
    },
    {
      col: 'VEHICLE_CHECKS_COMPLETED',
      val: 0,
    },
    {
      col: 'TAXI_MANOEUVRE_COMPLETED',
      val: 0,
    },
    {
      col: 'NORMAL_STOP_1_COMPLETED',
      val: 1,
    },
    {
      col: 'NORMAL_STOP_2_COMPLETED',
      val: 1,
    },
    {
      col: 'ORDIT_TRAINED',
      val: 1,
    },
    {
      col: 'TRAINING_RECS_AVAIL',
      val: 1,
    },
    {
      col: 'ANGLED_START_COMPLETED',
      val: 1,
    },
    {
      col: 'UPHILL_START',
      val: 0,
    },
    {
      col: 'DOWN_HILL_START',
      val: 0,
    },
    {
      col: 'EYESIGHT_COMMENT',
      val: 'eyesight serious',
    },
    {
      col: 'CONTROL_STOP_COMMENT',
      val: 'controlled stop',
    },
    {
      col: 'PRECAUTIONS_COMMENT',
      val: 'Serious fault comment: precautions serious',
    },
    {
      col: 'CONTROL_ACC_COMMENT',
      val: 'Serious fault comment: controls accelerator serious',
    },
    {
      col: 'CONTROL_CLUTCH_COMMENT',
      val: 'Serious fault comment: controls clutch serious',
    },
    {
      col: 'CONTROL_GEARS_COMMENT',
      val: 'Serious fault comment: controls gears serious',
    },
    {
      col: 'CONTROL_FOOTBRAKE_COMMENT',
      val: 'Serious fault comment: controls footbrake serious',
    },
    {
      col: 'CONTROL_PARK_COMMENT',
      val: 'Serious fault comment: controls parking brake serious',
    },
    {
      col: 'CONTROL_STEERING_COMMENT',
      val: 'Serious fault comment: controls steering serious',
    },
    {
      col: 'MOVE_OFF_SAFETY_COMMENT',
      val: 'Serious fault comment: move off safety serious',
    },
    {
      col: 'MOVE_OFF_CONTROL_COMMENT',
      val: 'Serious fault comment: move off control serious',
    },
    {
      col: 'MIRRORS_MC_REAR_SIG_COMMENT',
      val: 'Serious fault comment: use of mirrors signalling serious',
    },
    {
      col: 'MIRRORS_MC_REAR_DIR_COMMENT',
      val: 'Serious fault comment: use of mirrors change direction serious',
    },
    {
      col: 'MIRRORS_MC_REAR_SPE_COMMENT',
      val: 'Serious fault comment: use of mirrors change speed serious',
    },
    {
      col: 'SIGNALS_NECESSARY_COMMENT',
      val: 'Serious fault comment: signals necessary serious',
    },
    {
      col: 'SIGNALS_CORRECTLY_COMMENT',
      val: 'Serious fault comment: signals correctly serious',
    },
    {
      col: 'SIGNALS_TIMED_COMMENT',
      val: 'Serious fault comment: signals timed serious',
    },
    {
      col: 'CLEARANCE_OBSTRUCT_COMMENT',
      val: 'Serious fault comment: clearance serious',
    },
    {
      col: 'RESPONSE_TRAF_SIGNS_COMMENT',
      val: 'Serious fault comment: response to signs traffic signs serious',
    },
    {
      col: 'RESPONSE_ROAD_MARK_COMMENT',
      val: 'Serious fault comment: response to signs road markings serious',
    },
    {
      col: 'RESPONSE_TRAF_LIGHT_COMMENT',
      val: 'Serious fault comment: response to signs traffic lights serious',
    },
    {
      col: 'RESPONSE_TRAF_CONT_COMMENT',
      val: 'Serious fault comment: response to signs traffic controllers serious',
    },
    {
      col: 'RESPONSE_OTHER_COMMENT',
      val: 'Serious fault comment: response to signs other road users serious',
    },
    {
      col: 'USE_OF_SPEED_COMMENT',
      val: 'Serious fault comment: use of speed serious',
    },
    {
      col: 'FOLLOWING_DISTANCE_COMMENT',
      val: 'Serious fault comment: following distance serious',
    },
    {
      col: 'MAINTAIN_PROG_SPEED_COMMENT',
      val: 'Serious fault comment: progress appropriate speed serious',
    },
    {
      col: 'MAINTAIN_PROG_HES_COMMENT',
      val: 'Serious fault comment: progress undue hesitation serious',
    },
    {
      col: 'JUNCTIONS_SPEED_COMMENT',
      val: 'Serious fault comment: junctions approach speed serious',
    },
    {
      col: 'JUNCTIONS_OBSERV_COMMENT',
      val: 'Serious fault comment: junctions observation serious',
    },
    {
      col: 'JUNCTIONS_TURN_RIGHT_COMMENT',
      val: 'Serious fault comment: junctions turning right serious',
    },
    {
      col: 'JUNCTIONS_TURN_LEFT_COMMENT',
      val: 'Serious fault comment: junctions turning left serious',
    },
    {
      col: 'JUNCTIONS_TURN_CUT_COMMENT',
      val: 'Serious fault comment: junctions cutting corners serious',
    },
    {
      col: 'JUDGEMENT_OVER_COMMENT',
      val: 'Serious fault comment: judgement overtaking serious',
    },
    {
      col: 'JUDGEMENT_MEET_COMMENT',
      val: 'Serious fault comment: judgement meeting serious',
    },
    {
      col: 'JUDGEMENT_CROSS_COMMENT',
      val: 'Serious fault comment: judgement crossing serious',
    },
    {
      col: 'POSITIONING_NORMAL_COMMENT',
      val: 'Serious fault comment: positioning normal driving serious',
    },
    {
      col: 'POSITIONING_LANE_COMMENT',
      val: 'Serious fault comment: positioning lane discipline serious',
    },
    {
      col: 'PEDESTRIAN_CROSSING_COMMENT',
      val: 'Serious fault comment: pedestrian crossings serious',
    },
    {
      col: 'POSITION_STOPS_COMMENT',
      val: 'Serious fault comment: position normal stops serious',
    },
    {
      col: 'AWARENESS_PLAN_COMMENT',
      val: 'Serious fault comment: awareness planning serious',
    },
    {
      col: 'ANCILLARY_CONTROLS_COMMENT',
      val: 'Serious fault comment: ancillary controls serious',
    },
    {
      col: 'SHOW_ME_1_CODE',
      val: 'S1',
    },
    {
      col: 'SHOW_ME_1_DESCRIPTION',
      val: 'First Show Me Question',
    },
    {
      col: 'TELL_ME_1_CODE',
      val: 'T1',
    },
    {
      col: 'TELL_ME_1_DESCRIPTION',
      val: 'First Tell Me Question',
    },
    {
      col: 'TELL_ME_2_CODE',
      val: 'T2',
    },
    {
      col: 'TELL_ME_2_DESCRIPTION',
      val: 'Second Tell Me Question',
    },
    {
      col: 'TELL_ME_3_CODE',
      val: 'T3',
    },
    {
      col: 'TELL_ME_3_DESCRIPTION',
      val: 'Third Tell Me Question',
    },
    {
      col: 'VEHICLE_CHECKS_COMMENT',
      val: 'show me tell me serious',
    },
    {
      col: 'INDEPENDENT_DRIVING',
      val: 'Traffic signs',
    },
  ];
}

export function getADIFullyPopulatedDangerousDataFields(): DataField[] {
  return [
    {
      col: 'REV_PARK_ROAD_CONTROL_COMMENT',
      val: 'reverseParkRoad control',
    },
    {
      col: 'REV_PARK_ROAD_OBSERVE_COMMENT',
      val: 'reverseParkRoad  observation',
    },
    {
      col: 'REV_PARK_CPARK_CONTROL_COMMENT',
      val: 'reverseParkCarpark control',
    },
    {
      col: 'REV_PARK_CPARK_OBSERVE_COMMENT',
      val: 'reverseParkCarpark  observation',
    },
    {
      col: 'AUTOMATIC_TEST',
      val: 0,
    },
    {
      col: 'CONTROL_STOP_PROMPT_TOTAL',
      val: 0,
    },
    {
      col: 'VEHICLE_CHECKS_TOTAL',
      val: 0,
    },
    {
      col: 'REV_RIGHT_TRAIL_CONT_TOTAL',
      val: 0,
    },
    {
      col: 'REV_RIGHT_TRAIL_OBSERV_TOTAL',
      val: 0,
    },
    {
      col: 'REV_PARK_CPARK_CONTROL_TOTAL',
      val: 0,
    },
    {
      col: 'REV_PARK_CPARK_OBSERVE_TOTAL',
      val: 0,
    },
    {
      col: 'REV_PARK_ROAD_CONTROL_TOTAL',
      val: 0,
    },
    {
      col: 'REV_PARK_ROAD_OBSERVE_TOTAL',
      val: 0,
    },
    {
      col: 'TAXI_MAN_CONTROL_TOTAL',
      val: 0,
    },
    {
      col: 'TAXI_MAN_OBSERV_TOTAL',
      val: 0,
    },
    {
      col: 'PRECAUTIONS_TOTAL',
      val: 0,
    },
    {
      col: 'CONTROL_ACC_TOTAL',
      val: 0,
    },
    {
      col: 'CONTROL_CLUTCH_TOTAL',
      val: 0,
    },
    {
      col: 'ORDIT_TRAINED',
      val: 1,
    },
    {
      col: 'TRAINING_RECS_AVAIL',
      val: 0,
    },
    {
      col: 'CONTROL_GEARS_TOTAL',
      val: 0,
    },
    {
      col: 'CONTROL_FOOTBRAKE_TOTAL',
      val: 0,
    },
    {
      col: 'CONTROL_PARK_TOTAL',
      val: 0,
    },
    {
      col: 'CONTROL_STEERING_TOTAL',
      val: 0,
    },
    {
      col: 'MOVE_OFF_SAFETY_TOTAL',
      val: 0,
    },
    {
      col: 'MOVE_OFF_CONTROL_TOTAL',
      val: 0,
    },
    {
      col: 'MIRRORS_MC_REAR_SIG_TOTAL',
      val: 0,
    },
    {
      col: 'MIRRORS_MC_REAR_DIR_TOTAL',
      val: 0,
    },
    {
      col: 'MIRRORS_MC_REAR_SPE_TOTAL',
      val: 0,
    },
    {
      col: 'SIGNALS_NECESSARY_TOTAL',
      val: 0,
    },
    {
      col: 'SIGNALS_CORRECTLY_TOTAL',
      val: 0,
    },
    {
      col: 'SIGNALS_TIMED_TOTAL',
      val: 0,
    },
    {
      col: 'CLEARANCE_OBSTRUCT_TOTAL',
      val: 0,
    },
    {
      col: 'RESPONSE_TRAF_SIGNS_TOTAL',
      val: 0,
    },
    {
      col: 'RESPONSE_ROAD_MARK_TOTAL',
      val: 0,
    },
    {
      col: 'RESPONSE_TRAF_LIGHT_TOTAL',
      val: 0,
    },
    {
      col: 'RESPONSE_TRAF_CONT_TOTAL',
      val: 0,
    },
    {
      col: 'RESPONSE_OTHER_TOTAL',
      val: 0,
    },
    {
      col: 'USE_OF_SPEED_TOTAL',
      val: 0,
    },
    {
      col: 'FOLLOWING_DISTANCE_TOTAL',
      val: 0,
    },
    {
      col: 'MAINTAIN_PROG_SPEED_TOTAL',
      val: 0,
    },
    {
      col: 'MAINTAIN_PROG_HES_TOTAL',
      val: 0,
    },
    {
      col: 'JUNCTIONS_SPEED_TOTAL',
      val: 0,
    },
    {
      col: 'JUNCTIONS_OBSERV_TOTAL',
      val: 0,
    },
    {
      col: 'JUNCTIONS_TURN_RIGHT_TOTAL',
      val: 0,
    },
    {
      col: 'JUNCTIONS_TURN_LEFT_TOTAL',
      val: 0,
    },
    {
      col: 'JUNCTIONS_TURN_CUT_TOTAL',
      val: 0,
    },
    {
      col: 'JUDGEMENT_OVER_TOTAL',
      val: 0,
    },
    {
      col: 'JUDGEMENT_MEET_TOTAL',
      val: 0,
    },
    {
      col: 'JUDGEMENT_CROSS_TOTAL',
      val: 0,
    },
    {
      col: 'POSITIONING_NORMAL_TOTAL',
      val: 0,
    },
    {
      col: 'POSITIONING_LANE_TOTAL',
      val: 0,
    },
    {
      col: 'PEDESTRIAN_CROSSING_TOTAL',
      val: 0,
    },
    {
      col: 'POSTITION_STOPS_TOTAL',
      val: 0,
    },
    {
      col: 'AWARENESS_PLAN_TOTAL',
      val: 0,
    },
    {
      col: 'ANCILLARY_CONTROLS_TOTAL',
      val: 0,
    },
    {
      col: 'EYESIGHT_SERIOUS',
      val: 0,
    },
    {
      col: 'CONTROL_STOP_PROMPT_SERIOUS',
      val: 0,
    },
    {
      col: 'REV_RIGHT_TRAIL_CONT_SERIOUS',
      val: 0,
    },
    {
      col: 'REV_RIGHT_TRAIL_OBSERV_SERIOUS',
      val: 0,
    },
    {
      col: 'REV_PARK_CPARK_CONTROL_SERIOUS',
      val: 0,
    },
    {
      col: 'REV_PARK_CPARK_OBSERVE_SERIOUS',
      val: 0,
    },
    {
      col: 'REV_PARK_ROAD_CONTROL_SERIOUS',
      val: 0,
    },
    {
      col: 'REV_PARK_ROAD_OBSERVE_SERIOUS',
      val: 0,
    },
    {
      col: 'VEHICLE_CHECKS_SERIOUS',
      val: 0,
    },
    {
      col: 'TAXI_MAN_CONTROL_SERIOUS',
      val: 0,
    },
    {
      col: 'TAXI_MAN_OBSERV_SERIOUS',
      val: 0,
    },
    {
      col: 'PRECAUTIONS_SERIOUS',
      val: 0,
    },
    {
      col: 'CONTROL_ACC_SERIOUS',
      val: 0,
    },
    {
      col: 'CONTROL_CLUTCH_SERIOUS',
      val: 0,
    },
    {
      col: 'CONTROL_GEARS_SERIOUS',
      val: 0,
    },
    {
      col: 'CONTROL_FOOTBRAKE_SERIOUS',
      val: 0,
    },
    {
      col: 'CONTROL_PARK_SERIOUS',
      val: 0,
    },
    {
      col: 'CONTROL_STEERING_SERIOUS',
      val: 0,
    },
    {
      col: 'MOVE_OFF_SAFETY_SERIOUS',
      val: 0,
    },
    {
      col: 'MOVE_OFF_CONTROL_SERIOUS',
      val: 0,
    },
    {
      col: 'MIRRORS_MC_REAR_SIG_SERIOUS',
      val: 0,
    },
    {
      col: 'MIRRORS_MC_REAR_DIR_SERIOUS',
      val: 0,
    },
    {
      col: 'MIRRORS_MC_REAR_SPE_SERIOUS',
      val: 0,
    },
    {
      col: 'SIGNALS_NECESSARY_SERIOUS',
      val: 0,
    },
    {
      col: 'SIGNALS_CORRECTLY_SERIOUS',
      val: 0,
    },
    {
      col: 'SIGNALS_TIMED_SERIOUS',
      val: 0,
    },
    {
      col: 'CLEARANCE_OBSTRUCT_SERIOUS',
      val: 0,
    },
    {
      col: 'RESPONSE_TRAF_SIGNS_SERIOUS',
      val: 0,
    },
    {
      col: 'RESPONSE_ROAD_MARK_SERIOUS',
      val: 0,
    },
    {
      col: 'RESPONSE_TRAF_LIGHT_SERIOUS',
      val: 0,
    },
    {
      col: 'RESPONSE_TRAF_CONT_SERIOUS',
      val: 0,
    },
    {
      col: 'RESPONSE_OTHER_SERIOUS',
      val: 0,
    },
    {
      col: 'USE_OF_SPEED_SERIOUS',
      val: 0,
    },
    {
      col: 'FOLLOWING_DISTANCE_SERIOUS',
      val: 0,
    },
    {
      col: 'MAINTAIN_PROG_SPEED_SERIOUS',
      val: 0,
    },
    {
      col: 'MAINTAIN_PROG_HES_SERIOUS',
      val: 0,
    },
    {
      col: 'JUNCTIONS_SPEED_SERIOUS',
      val: 0,
    },
    {
      col: 'JUNCTIONS_OBSERV_SERIOUS',
      val: 0,
    },
    {
      col: 'JUNCTIONS_TURN_RIGHT_SERIOUS',
      val: 0,
    },
    {
      col: 'JUNCTIONS_TURN_LEFT_SERIOUS',
      val: 0,
    },
    {
      col: 'JUNCTIONS_TURN_CUT_SERIOUS',
      val: 0,
    },
    {
      col: 'JUDGEMENT_OVER_SERIOUS',
      val: 0,
    },
    {
      col: 'JUDGEMENT_MEET_SERIOUS',
      val: 0,
    },
    {
      col: 'JUDGEMENT_CROSS_SERIOUS',
      val: 0,
    },
    {
      col: 'POSITIONING_NORMAL_SERIOUS',
      val: 0,
    },
    {
      col: 'POSITIONING_LANE_SERIOUS',
      val: 0,
    },
    {
      col: 'PEDESTRIAN_CROSSING_SERIOUS',
      val: 0,
    },
    {
      col: 'POSTITION_STOPS_SERIOUS',
      val: 0,
    },
    {
      col: 'AWARENESS_PLAN_SERIOUS',
      val: 0,
    },
    {
      col: 'ANCILLARY_CONTROLS_SERIOUS',
      val: 0,
    },
    {
      col: 'CONTROL_STOP_PROMPT_DANGEROUS',
      val: 1,
    },
    {
      col: 'REV_RIGHT_TRAIL_CONT_DANGER',
      val: 0,
    },
    {
      col: 'REV_RIGHT_TRAIL_OBSERV_DANGER',
      val: 0,
    },
    {
      col: 'REV_PARK_CPARK_CONTROL_DANGER',
      val: 1,
    },
    {
      col: 'REV_PARK_CPARK_OBSERVE_DANGER',
      val: 1,
    },
    {
      col: 'REV_PARK_ROAD_CONTROL_DANGER',
      val: 1,
    },
    {
      col: 'REV_PARK_ROAD_OBSERVE_DANGER',
      val: 1,
    },
    {
      col: 'VEHICLE_CHECKS_DANGEROUS',
      val: 0,
    },
    {
      col: 'TAXI_MAN_CONTROL_DANGEROUS',
      val: 0,
    },
    {
      col: 'TAXI_MAN_OBSERV_DANGEROUS',
      val: 0,
    },
    {
      col: 'PRECAUTIONS_DANGEROUS',
      val: 1,
    },
    {
      col: 'CONTROL_ACC_DANGEROUS',
      val: 1,
    },
    {
      col: 'CONTROL_CLUTCH_DANGEROUS',
      val: 1,
    },
    {
      col: 'CONTROL_GEARS_DANGEROUS',
      val: 1,
    },
    {
      col: 'CONTROL_FOOTBRAKE_DANGEROUS',
      val: 1,
    },
    {
      col: 'CONTROL_PARK_DANGEROUS',
      val: 1,
    },
    {
      col: 'CONTROL_STEERING_DANGEROUS',
      val: 1,
    },
    {
      col: 'MOVE_OFF_SAFETY_DANGEROUS',
      val: 1,
    },
    {
      col: 'MOVE_OFF_CONTROL_DANGEROUS',
      val: 1,
    },
    {
      col: 'MIRRORS_MC_REAR_SIG_DANGEROUS',
      val: 1,
    },
    {
      col: 'MIRRORS_MC_REAR_DIR_DANGEROUS',
      val: 1,
    },
    {
      col: 'MIRRORS_MC_REAR_SPE_DANGEROUS',
      val: 1,
    },
    {
      col: 'SIGNALS_NECESSARY_DANGEROUS',
      val: 1,
    },
    {
      col: 'SIGNALS_CORRECTLY_DANGEROUS',
      val: 1,
    },
    {
      col: 'SIGNALS_TIMED_DANGEROUS',
      val: 1,
    },
    {
      col: 'CLEARANCE_OBSTRUCT_DANGEROUS',
      val: 1,
    },
    {
      col: 'RESPONSE_TRAF_SIGNS_DANGEROUS',
      val: 1,
    },
    {
      col: 'RESPONSE_ROAD_MARK_DANGEROUS',
      val: 1,
    },
    {
      col: 'RESPONSE_TRAF_LIGHT_DANGEROUS',
      val: 1,
    },
    {
      col: 'RESPONSE_TRAF_CONT_DANGEROUS',
      val: 1,
    },
    {
      col: 'RESPONSE_OTHER_DANGEROUS',
      val: 1,
    },
    {
      col: 'USE_OF_SPEED_DANGEROUS',
      val: 1,
    },
    {
      col: 'FOLLOWING_DISTANCE_DANGEROUS',
      val: 1,
    },
    {
      col: 'MAINTAIN_PROG_SPEED_DANGEROUS',
      val: 1,
    },
    {
      col: 'MAINTAIN_PROG_HES_DANGEROUS',
      val: 1,
    },
    {
      col: 'JUNCTIONS_SPEED_DANGEROUS',
      val: 1,
    },
    {
      col: 'JUNCTIONS_OBSERV_DANGEROUS',
      val: 1,
    },
    {
      col: 'JUNCTIONS_TURN_RIGHT_DANGEROUS',
      val: 1,
    },
    {
      col: 'JUNCTIONS_TURN_LEFT_DANGEROUS',
      val: 1,
    },
    {
      col: 'JUNCTIONS_TURN_CUT_DANGEROUS',
      val: 1,
    },
    {
      col: 'JUDGEMENT_OVER_DANGEROUS',
      val: 1,
    },
    {
      col: 'JUDGEMENT_MEET_DANGEROUS',
      val: 1,
    },
    {
      col: 'JUDGEMENT_CROSS_DANGEROUS',
      val: 1,
    },
    {
      col: 'POSITIONING_NORMAL_DANGEROUS',
      val: 1,
    },
    {
      col: 'POSITIONING_LANE_DANGEROUS',
      val: 1,
    },
    {
      col: 'PEDESTRIAN_CROSSING_DANGEROUS',
      val: 1,
    },
    {
      col: 'POSTITION_STOPS_DANGEROUS',
      val: 1,
    },
    {
      col: 'AWARENESS_PLAN_DANGEROUS',
      val: 1,
    },
    {
      col: 'ANCILLARY_CONTROLS_DANGEROUS',
      val: 1,
    },
    {
      col: 'EYESIGHT_COMPLETED',
      val: 0,
    },
    {
      col: 'CONTROL_STOP_COMPLETED',
      val: 1,
    },
    {
      col: 'REV_RIGHT_TRAIL_COMPLETED',
      val: 0,
    },
    {
      col: 'REVERSE_PARK_CARPARK',
      val: 1,
    },
    {
      col: 'REVERSE_PARK_ROAD',
      val: 1,
    },
    {
      col: 'VEHICLE_CHECKS_COMPLETED',
      val: 0,
    },
    {
      col: 'TAXI_MANOEUVRE_COMPLETED',
      val: 0,
    },
    {
      col: 'NORMAL_STOP_1_COMPLETED',
      val: 1,
    },
    {
      col: 'NORMAL_STOP_2_COMPLETED',
      val: 1,
    },
    {
      col: 'ANGLED_START_COMPLETED',
      val: 1,
    },
    {
      col: 'UPHILL_START',
      val: 0,
    },
    {
      col: 'DOWN_HILL_START',
      val: 0,
    },
    {
      col: 'CONTROL_STOP_COMMENT',
      val: 'controlled stop',
    },
    {
      col: 'PRECAUTIONS_COMMENT',
      val: 'Dangerous fault comment: precautions dangerous',
    },
    {
      col: 'CONTROL_ACC_COMMENT',
      val: 'Dangerous fault comment: controls accelerator dangerous',
    },
    {
      col: 'CONTROL_CLUTCH_COMMENT',
      val: 'Dangerous fault comment: controls clutch dangerous',
    },
    {
      col: 'CONTROL_GEARS_COMMENT',
      val: 'Dangerous fault comment: controls gears dangerous',
    },
    {
      col: 'CONTROL_FOOTBRAKE_COMMENT',
      val: 'Dangerous fault comment: controls footbrake dangerous',
    },
    {
      col: 'CONTROL_PARK_COMMENT',
      val: 'Dangerous fault comment: controls parking brake dangerous',
    },
    {
      col: 'CONTROL_STEERING_COMMENT',
      val: 'Dangerous fault comment: controls steering dangerous',
    },
    {
      col: 'MOVE_OFF_SAFETY_COMMENT',
      val: 'Dangerous fault comment: move off safety dangerous',
    },
    {
      col: 'MOVE_OFF_CONTROL_COMMENT',
      val: 'Dangerous fault comment: move off control dangerous',
    },
    {
      col: 'MIRRORS_MC_REAR_SIG_COMMENT',
      val: 'Dangerous fault comment: use of mirrors signalling dangerous',
    },
    {
      col: 'MIRRORS_MC_REAR_DIR_COMMENT',
      val: 'Dangerous fault comment: use of mirrors change direction dangerous',
    },
    {
      col: 'MIRRORS_MC_REAR_SPE_COMMENT',
      val: 'Dangerous fault comment: use of mirrors change speed dangerous',
    },
    {
      col: 'SIGNALS_NECESSARY_COMMENT',
      val: 'Dangerous fault comment: signals necessary dangerous',
    },
    {
      col: 'SIGNALS_CORRECTLY_COMMENT',
      val: 'Dangerous fault comment: signals correctly dangerous',
    },
    {
      col: 'SIGNALS_TIMED_COMMENT',
      val: 'Dangerous fault comment: signals timed dangerous',
    },
    {
      col: 'CLEARANCE_OBSTRUCT_COMMENT',
      val: 'Dangerous fault comment: clearance dangerous',
    },
    {
      col: 'RESPONSE_TRAF_SIGNS_COMMENT',
      val: 'Dangerous fault comment: response to signs traffic signs dangerous',
    },
    {
      col: 'RESPONSE_ROAD_MARK_COMMENT',
      val: 'Dangerous fault comment: response to signs road markings dangerous',
    },
    {
      col: 'RESPONSE_TRAF_LIGHT_COMMENT',
      val: 'Dangerous fault comment: response to signs traffic lights dangerous',
    },
    {
      col: 'RESPONSE_TRAF_CONT_COMMENT',
      val: 'Dangerous fault comment: response to signs traffic controllers dangerous',
    },
    {
      col: 'RESPONSE_OTHER_COMMENT',
      val: 'Dangerous fault comment: response to signs other road users dangerous',
    },
    {
      col: 'USE_OF_SPEED_COMMENT',
      val: 'Dangerous fault comment: use of speed dangerous',
    },
    {
      col: 'FOLLOWING_DISTANCE_COMMENT',
      val: 'Dangerous fault comment: following distance dangerous',
    },
    {
      col: 'MAINTAIN_PROG_SPEED_COMMENT',
      val: 'Dangerous fault comment: progress appropriate speed dangerous',
    },
    {
      col: 'MAINTAIN_PROG_HES_COMMENT',
      val: 'Dangerous fault comment: progress undue hesitation dangerous',
    },
    {
      col: 'JUNCTIONS_SPEED_COMMENT',
      val: 'Dangerous fault comment: junctions approach speed dangerous',
    },
    {
      col: 'JUNCTIONS_OBSERV_COMMENT',
      val: 'Dangerous fault comment: junctions observation dangerous',
    },
    {
      col: 'JUNCTIONS_TURN_RIGHT_COMMENT',
      val: 'Dangerous fault comment: junctions turning right dangerous',
    },
    {
      col: 'JUNCTIONS_TURN_LEFT_COMMENT',
      val: 'Dangerous fault comment: junctions turning left dangerous',
    },
    {
      col: 'JUNCTIONS_TURN_CUT_COMMENT',
      val: 'Dangerous fault comment: junctions cutting corners dangerous',
    },
    {
      col: 'JUDGEMENT_OVER_COMMENT',
      val: 'Dangerous fault comment: judgement overtaking dangerous',
    },
    {
      col: 'JUDGEMENT_MEET_COMMENT',
      val: 'Dangerous fault comment: judgement meeting dangerous',
    },
    {
      col: 'JUDGEMENT_CROSS_COMMENT',
      val: 'Dangerous fault comment: judgement crossing dangerous',
    },
    {
      col: 'POSITIONING_NORMAL_COMMENT',
      val: 'Dangerous fault comment: positioning normal driving dangerous',
    },
    {
      col: 'POSITIONING_LANE_COMMENT',
      val: 'Dangerous fault comment: positioning lane discipline dangerous',
    },
    {
      col: 'PEDESTRIAN_CROSSING_COMMENT',
      val: 'Dangerous fault comment: pedestrian crossings dangerous',
    },
    {
      col: 'POSITION_STOPS_COMMENT',
      val: 'Dangerous fault comment: position normal stops dangerous',
    },
    {
      col: 'AWARENESS_PLAN_COMMENT',
      val: 'Dangerous fault comment: awareness planning dangerous',
    },
    {
      col: 'ANCILLARY_CONTROLS_COMMENT',
      val: 'Dangerous fault comment: ancillary controls dangerous',
    },
    {
      col: 'SHOW_ME_1_CODE',
      val: 'S1',
    },
    {
      col: 'SHOW_ME_1_DESCRIPTION',
      val: 'First Show Me Question',
    },
    {
      col: 'TELL_ME_1_CODE',
      val: 'T1',
    },
    {
      col: 'TELL_ME_1_DESCRIPTION',
      val: 'First Tell Me Question',
    },
    {
      col: 'TELL_ME_2_CODE',
      val: 'T2',
    },
    {
      col: 'TELL_ME_2_DESCRIPTION',
      val: 'Second Tell Me Question',
    },
    {
      col: 'TELL_ME_3_CODE',
      val: 'T3',
    },
    {
      col: 'TELL_ME_3_DESCRIPTION',
      val: 'Third Tell Me Question',
    },
    {
      col: 'VEHICLE_CHECKS_COMMENT',
      val: 'show me tell me dangerous',
    },
    {
      col: 'INDEPENDENT_DRIVING',
      val: 'N/A',
    },
  ];
}
