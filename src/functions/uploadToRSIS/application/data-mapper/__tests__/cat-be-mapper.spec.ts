import { DataField } from '../../../domain/mi-export-data';
import { mapCatBEData } from '../cat-be-mapper';
import { getCatBEMinimalInput } from './helpers/cat-be/inputs/minimal-inputs';
import { getCatBEMinimalDataFields } from './helpers/cat-be/data-fields/minimal-data-fields';
import {
  getFullyPopulatedDrivingFaults,
  getFullyPopulatedSeriousFaults,
  getFullyPopulatedDangerousFaults,
  getFullyPopulatedDelegatedTest,
} from './helpers/cat-be/inputs/fully-populated-inputs';
import {
  getCatBEFullyPopulatedSeriousDataFields,
  getCatBEFullyPopulatedDangerousDataFields,
  getCatBEFullyPopulatedDelegatedExaminer,
} from './helpers/cat-be/data-fields/fully-populated-data-fields';
import { doesResultMatchExpectations } from './helpers/result-comparer';

describe('mapCatBEData', () => {

  it('Should map a minimally populated test result (test terminated early as possible)', () => {
    const minimalInput = getCatBEMinimalInput();

    const expected = getCatBEMinimalDataFields();
    const result = mapCatBEData(minimalInput);
    // expect no faults, serious or dangerous...
    const arraysMatched: boolean = doesResultMatchExpectations(result, expected);
    expect(arraysMatched).toEqual(true);
  });

  it('Should map a fully populated regular test result (every possible driving fault)', () => {
    const fullyPopulated = getFullyPopulatedDrivingFaults(getCatBEMinimalInput());

    const expected: DataField[] = [
      { col: 'AUTOMATIC_TEST', val: 0 },
      { col: 'REV_LEFT_TRAIL_CONT_TOTAL', val: 1 },
      { col: 'REV_LEFT_TRAIL_OBSERV_TOTAL', val: 1 },
      { col: 'VEHICLE_CHECKS_TOTAL', val: 4 },
      { col: 'VEHICLE_CHECKS_SERIOUS', val: 0 },
      { col: 'UNCOUPLE_RECOUPLE_TOTAL', val: 1 },
      { col: 'PRECAUTIONS_TOTAL', val: 2 },
      { col: 'CONTROL_ACC_TOTAL', val: 3 },
      { col: 'CONTROL_CLUTCH_TOTAL', val: 4 },
      { col: 'CONTROL_GEARS_TOTAL', val: 5 },
      { col: 'CONTROL_FOOTBRAKE_TOTAL', val: 6 },
      { col: 'CONTROL_PARK_TOTAL', val: 7 },
      { col: 'CONTROL_STEERING_TOTAL', val: 8 },
      { col: 'MOVE_OFF_SAFETY_TOTAL', val: 9 },
      { col: 'MOVE_OFF_CONTROL_TOTAL', val: 10 },
      { col: 'MIRRORS_MC_REAR_SIG_TOTAL', val: 11 },
      { col: 'MIRRORS_MC_REAR_DIR_TOTAL', val: 12 },
      { col: 'MIRRORS_MC_REAR_SPE_TOTAL', val: 13 },
      { col: 'SIGNALS_NECESSARY_TOTAL', val: 14 },
      { col: 'SIGNALS_CORRECTLY_TOTAL', val: 15 },
      { col: 'SIGNALS_TIMED_TOTAL', val: 16 },
      { col: 'CLEARANCE_OBSTRUCT_TOTAL', val: 17 },
      { col: 'RESPONSE_TRAF_SIGNS_TOTAL', val: 18 },
      { col: 'RESPONSE_ROAD_MARK_TOTAL', val: 19 },
      { col: 'RESPONSE_TRAF_LIGHT_TOTAL', val: 20 },
      { col: 'RESPONSE_TRAF_CONT_TOTAL', val: 21 },
      { col: 'RESPONSE_OTHER_TOTAL', val: 22 },
      { col: 'USE_OF_SPEED_TOTAL', val: 23 },
      { col: 'FOLLOWING_DISTANCE_TOTAL', val: 24 },
      { col: 'MAINTAIN_PROG_SPEED_TOTAL', val: 25 },
      { col: 'MAINTAIN_PROG_HES_TOTAL', val: 26 },
      { col: 'JUNCTIONS_SPEED_TOTAL', val: 27 },
      { col: 'JUNCTIONS_OBSERV_TOTAL', val: 28 },
      { col: 'JUNCTIONS_TURN_RIGHT_TOTAL', val: 29 },
      { col: 'JUNCTIONS_TURN_LEFT_TOTAL', val: 30 },
      { col: 'JUNCTIONS_TURN_CUT_TOTAL', val: 31 },
      { col: 'JUDGEMENT_OVER_TOTAL', val: 32 },
      { col: 'JUDGEMENT_MEET_TOTAL', val: 33 },
      { col: 'JUDGEMENT_CROSS_TOTAL', val: 34 },
      { col: 'POSITIONING_NORMAL_TOTAL', val: 35 },
      { col: 'POSITIONING_LANE_TOTAL', val: 36 },
      { col: 'PEDESTRIAN_CROSSING_TOTAL', val: 37 },
      { col: 'POSTITION_STOPS_TOTAL', val: 38 },
      { col: 'AWARENESS_PLAN_TOTAL', val: 39 },
      { col: 'ANCILLARY_CONTROLS_TOTAL', val: 40 },
      { col: 'EYESIGHT_SERIOUS', val: 0 },
      { col: 'REV_LEFT_TRAIL_CONT_SERIOUS', val: 0 },
      { col: 'REV_LEFT_TRAIL_OBSERV_SERIOUS', val: 0 },
      { col: 'UNCOUPLE_RECOUPLE_SERIOUS', val: 0 },
      { col: 'PRECAUTIONS_SERIOUS', val: 0 },
      { col: 'CONTROL_ACC_SERIOUS', val: 0 },
      { col: 'CONTROL_CLUTCH_SERIOUS', val: 0 },
      { col: 'CONTROL_GEARS_SERIOUS', val: 0 },
      { col: 'CONTROL_FOOTBRAKE_SERIOUS', val: 0 },
      { col: 'CONTROL_PARK_SERIOUS', val: 0 },
      { col: 'CONTROL_STEERING_SERIOUS', val: 0 },
      { col: 'MOVE_OFF_SAFETY_SERIOUS', val: 0 },
      { col: 'MOVE_OFF_CONTROL_SERIOUS', val: 0 },
      { col: 'MIRRORS_MC_REAR_SIG_SERIOUS', val: 0 },
      { col: 'MIRRORS_MC_REAR_DIR_SERIOUS', val: 0 },
      { col: 'MIRRORS_MC_REAR_SPE_SERIOUS', val: 0 },
      { col: 'SIGNALS_NECESSARY_SERIOUS', val: 0 },
      { col: 'SIGNALS_CORRECTLY_SERIOUS', val: 0 },
      { col: 'SIGNALS_TIMED_SERIOUS', val: 0 },
      { col: 'CLEARANCE_OBSTRUCT_SERIOUS', val: 0 },
      { col: 'RESPONSE_TRAF_SIGNS_SERIOUS', val: 0 },
      { col: 'RESPONSE_ROAD_MARK_SERIOUS', val: 0 },
      { col: 'RESPONSE_TRAF_LIGHT_SERIOUS', val: 0 },
      { col: 'RESPONSE_TRAF_CONT_SERIOUS', val: 0 },
      { col: 'RESPONSE_OTHER_SERIOUS', val: 0 },
      { col: 'USE_OF_SPEED_SERIOUS', val: 0 },
      { col: 'FOLLOWING_DISTANCE_SERIOUS', val: 0 },
      { col: 'MAINTAIN_PROG_SPEED_SERIOUS', val: 0 },
      { col: 'MAINTAIN_PROG_HES_SERIOUS', val: 0 },
      { col: 'JUNCTIONS_SPEED_SERIOUS', val: 0 },
      { col: 'JUNCTIONS_OBSERV_SERIOUS', val: 0 },
      { col: 'JUNCTIONS_TURN_RIGHT_SERIOUS', val: 0 },
      { col: 'JUNCTIONS_TURN_LEFT_SERIOUS', val: 0 },
      { col: 'JUNCTIONS_TURN_CUT_SERIOUS', val: 0 },
      { col: 'JUDGEMENT_OVER_SERIOUS', val: 0 },
      { col: 'JUDGEMENT_MEET_SERIOUS', val: 0 },
      { col: 'JUDGEMENT_CROSS_SERIOUS', val: 0 },
      { col: 'POSITIONING_NORMAL_SERIOUS', val: 0 },
      { col: 'POSITIONING_LANE_SERIOUS', val: 0 },
      { col: 'PEDESTRIAN_CROSSING_SERIOUS', val: 0 },
      { col: 'POSTITION_STOPS_SERIOUS', val: 0 },
      { col: 'AWARENESS_PLAN_SERIOUS', val: 0 },
      { col: 'ANCILLARY_CONTROLS_SERIOUS', val: 0 },
      { col: 'REV_LEFT_TRAIL_CONT_DANGEROUS', val: 0 },
      { col: 'REV_LEFT_TRAIL_OBSER_DANGEROUS', val: 0 },
      { col: 'VEHICLE_CHECKS_DANGEROUS', val: 0 },
      { col: 'UNCOUPLE_RECOUPLE_DANGEROUS', val: 0 },
      { col: 'PRECAUTIONS_DANGEROUS', val: 0 },
      { col: 'CONTROL_ACC_DANGEROUS', val: 0 },
      { col: 'CONTROL_CLUTCH_DANGEROUS', val: 0 },
      { col: 'CONTROL_GEARS_DANGEROUS', val: 0 },
      { col: 'CONTROL_FOOTBRAKE_DANGEROUS', val: 0 },
      { col: 'CONTROL_PARK_DANGEROUS', val: 0 },
      { col: 'CONTROL_STEERING_DANGEROUS', val: 0 },
      { col: 'MOVE_OFF_SAFETY_DANGEROUS', val: 0 },
      { col: 'MOVE_OFF_CONTROL_DANGEROUS', val: 0 },
      { col: 'MIRRORS_MC_REAR_SIG_DANGEROUS', val: 0 },
      { col: 'MIRRORS_MC_REAR_DIR_DANGEROUS', val: 0 },
      { col: 'MIRRORS_MC_REAR_SPE_DANGEROUS', val: 0 },
      { col: 'SIGNALS_NECESSARY_DANGEROUS', val: 0 },
      { col: 'SIGNALS_CORRECTLY_DANGEROUS', val: 0 },
      { col: 'SIGNALS_TIMED_DANGEROUS', val: 0 },
      { col: 'CLEARANCE_OBSTRUCT_DANGEROUS', val: 0 },
      { col: 'RESPONSE_TRAF_SIGNS_DANGEROUS', val: 0 },
      { col: 'RESPONSE_ROAD_MARK_DANGEROUS', val: 0 },
      { col: 'RESPONSE_TRAF_LIGHT_DANGEROUS', val: 0 },
      { col: 'RESPONSE_TRAF_CONT_DANGEROUS', val: 0 },
      { col: 'RESPONSE_OTHER_DANGEROUS', val: 0 },
      { col: 'USE_OF_SPEED_DANGEROUS', val: 0 },
      { col: 'FOLLOWING_DISTANCE_DANGEROUS', val: 0 },
      { col: 'MAINTAIN_PROG_SPEED_DANGEROUS', val: 0 },
      { col: 'MAINTAIN_PROG_HES_DANGEROUS', val: 0 },
      { col: 'JUNCTIONS_SPEED_DANGEROUS', val: 0 },
      { col: 'JUNCTIONS_OBSERV_DANGEROUS', val: 0 },
      { col: 'JUNCTIONS_TURN_RIGHT_DANGEROUS', val: 0 },
      { col: 'JUNCTIONS_TURN_LEFT_DANGEROUS', val: 0 },
      { col: 'JUNCTIONS_TURN_CUT_DANGEROUS', val: 0 },
      { col: 'JUDGEMENT_OVER_DANGEROUS', val: 0 },
      { col: 'JUDGEMENT_MEET_DANGEROUS', val: 0 },
      { col: 'JUDGEMENT_CROSS_DANGEROUS', val: 0 },
      { col: 'POSITIONING_NORMAL_DANGEROUS', val: 0 },
      { col: 'POSITIONING_LANE_DANGEROUS', val: 0 },
      { col: 'PEDESTRIAN_CROSSING_DANGEROUS', val: 0 },
      { col: 'POSTITION_STOPS_DANGEROUS', val: 0 },
      { col: 'AWARENESS_PLAN_DANGEROUS', val: 0 },
      { col: 'ANCILLARY_CONTROLS_DANGEROUS', val: 0 },
      { col: 'EYESIGHT_COMPLETED', val: 1 },
      { col: 'REV_LEFT_TRAIL_COMPLETED', val: 1 },
      { col: 'VEHICLE_CHECKS_COMPLETED', val: 1 },
      { col: 'UNCOUPLE_RECOUPLE_COMPLETED', val: 1 },
      { col: 'NORMAL_STOP_1_COMPLETED', val: 1 },
      { col: 'NORMAL_STOP_2_COMPLETED', val: 1 },
      { col: 'ANGLED_START_COMPLETED', val: 1 },
      { col: 'UPHILL_START', val: 1 },
      { col: 'DOWN_HILL_START', val: 1 },
      { col: 'PRECAUTIONS_COMMENT', val: 'Driving fault comment: precautions fault' },
      { col: 'CONTROL_ACC_COMMENT', val: 'Driving fault comment: controls accelerator fault' },
      { col: 'CONTROL_CLUTCH_COMMENT', val: 'Driving fault comment: controls clutch fault' },
      { col: 'CONTROL_GEARS_COMMENT', val: 'Driving fault comment: controls gears fault' },
      { col: 'CONTROL_FOOTBRAKE_COMMENT', val: 'Driving fault comment: controls footbrake fault' },
      { col: 'CONTROL_PARK_COMMENT', val: 'Driving fault comment: controls parking brake fault' },
      { col: 'CONTROL_STEERING_COMMENT', val: 'Driving fault comment: controls steering fault' },
      { col: 'MOVE_OFF_SAFETY_COMMENT', val: 'Driving fault comment: move off safety fault' },
      { col: 'MOVE_OFF_CONTROL_COMMENT', val: 'Driving fault comment: move off control fault' },
      { col: 'MIRRORS_MC_REAR_SIG_COMMENT', val: 'Driving fault comment: use of mirrors signalling fault' },
      { col: 'MIRRORS_MC_REAR_DIR_COMMENT', val: 'Driving fault comment: use of mirrors change direction fault' },
      { col: 'MIRRORS_MC_REAR_SPE_COMMENT', val: 'Driving fault comment: use of mirrors change speed fault' },
      { col: 'SIGNALS_NECESSARY_COMMENT', val: 'Driving fault comment: signals necessary fault' },
      { col: 'SIGNALS_CORRECTLY_COMMENT', val: 'Driving fault comment: signals correctly fault' },
      { col: 'SIGNALS_TIMED_COMMENT', val: 'Driving fault comment: signals timed fault' },
      { col: 'CLEARANCE_OBSTRUCT_COMMENT', val: 'Driving fault comment: clearance fault' },
      { col: 'RESPONSE_TRAF_SIGNS_COMMENT', val: 'Driving fault comment: response to signs traffic signs fault' },
      { col: 'RESPONSE_ROAD_MARK_COMMENT', val: 'Driving fault comment: response to signs road markings fault' },
      { col: 'RESPONSE_TRAF_LIGHT_COMMENT', val: 'Driving fault comment: response to signs traffic lights fault' },
      { col: 'RESPONSE_TRAF_CONT_COMMENT', val: 'Driving fault comment: response to signs traffic controllers fault' },
      { col: 'RESPONSE_OTHER_COMMENT', val: 'Driving fault comment: response to signs other road users fault' },
      { col: 'USE_OF_SPEED_COMMENT', val: 'Driving fault comment: use of speed fault' },
      { col: 'FOLLOWING_DISTANCE_COMMENT', val: 'Driving fault comment: following distance fault' },
      { col: 'MAINTAIN_PROG_SPEED_COMMENT', val: 'Driving fault comment: progress appropriate speed fault' },
      { col: 'MAINTAIN_PROG_HES_COMMENT', val: 'Driving fault comment: progress undue hesitation fault' },
      { col: 'JUNCTIONS_SPEED_COMMENT', val: 'Driving fault comment: junctions approach speed fault' },
      { col: 'JUNCTIONS_OBSERV_COMMENT', val: 'Driving fault comment: junctions observation fault' },
      { col: 'JUNCTIONS_TURN_RIGHT_COMMENT', val: 'Driving fault comment: junctions turning right fault' },
      { col: 'JUNCTIONS_TURN_LEFT_COMMENT', val: 'Driving fault comment: junctions turning left fault' },
      { col: 'JUNCTIONS_TURN_CUT_COMMENT', val: 'Driving fault comment: junctions cutting corners fault' },
      { col: 'JUDGEMENT_OVER_COMMENT', val: 'Driving fault comment: judgement overtaking fault' },
      { col: 'JUDGEMENT_MEET_COMMENT', val: 'Driving fault comment: judgement meeting fault' },
      { col: 'JUDGEMENT_CROSS_COMMENT', val: 'Driving fault comment: judgement crossing fault' },
      { col: 'POSITIONING_NORMAL_COMMENT', val: 'Driving fault comment: positioning normal driving fault' },
      { col: 'POSITIONING_LANE_COMMENT', val: 'Driving fault comment: positioning lane discipline fault' },
      { col: 'PEDESTRIAN_CROSSING_COMMENT', val: 'Driving fault comment: pedestrian crossings fault' },
      { col: 'POSITION_STOPS_COMMENT', val: 'Driving fault comment: position normal stops fault' },
      { col: 'AWARENESS_PLAN_COMMENT', val: 'Driving fault comment: awareness planning fault' },
      { col: 'ANCILLARY_CONTROLS_COMMENT', val: 'Driving fault comment: ancillary controls fault' },
      { col: 'REV_LEFT_TRAIL_CONT_COMMENT', val: 'reverse left control' },
      { col: 'REV_LEFT_TRAIL_OBSERV_COMMENT', val: 'reverse left observation' },
      { col: 'UNCOUPLE_RECOUPLE_COMMENT', val: 'uncouple recouple' },
      { col: 'SHOW_ME_1_CODE', val: 'S1' },
      { col: 'SHOW_ME_1_DESCRIPTION', val: 'First Show Me Question' },
      { col: 'SHOW_ME_2_CODE', val: 'S2' },
      { col: 'SHOW_ME_2_DESCRIPTION', val: 'Second Show Me Question' },
      { col: 'SHOW_ME_3_CODE', val: 'S3' },
      { col: 'SHOW_ME_3_DESCRIPTION', val: 'Third Show Me Question' },
      { col: 'TELL_ME_1_CODE', val: 'T1' },
      { col: 'TELL_ME_1_DESCRIPTION', val: 'First Tell Me Question' },
      { col: 'TELL_ME_2_CODE', val: 'T2' },
      { col: 'TELL_ME_2_DESCRIPTION', val: 'Second Tell Me Question' },
      { col: 'VEHICLE_CHECKS_COMMENT', val: 'show me tell me fault' },
      { col: 'INDEPENDENT_DRIVING', val: 'Sat nav' },
    ];

    // expect the right number of faults, with no serious or dangerous
    const result = mapCatBEData(fullyPopulated);
    const arraysMatched: boolean = doesResultMatchExpectations(result, expected);
    expect(arraysMatched).toEqual(true);
  });

  it('Should map a fully populated regular test result (every possible serious fault)', () => {
    const fullyPopulated = getFullyPopulatedSeriousFaults(getCatBEMinimalInput());

    const expected = getCatBEFullyPopulatedSeriousDataFields();

    // expect all serious, no faults or dangerous
    const arraysMatched: boolean = doesResultMatchExpectations(mapCatBEData(fullyPopulated), expected);
    expect(arraysMatched).toEqual(true);
  });

  it('Should map a fully populated regular test result (every possible dangerous fault)', () => {
    const fullyPopulated = getFullyPopulatedDangerousFaults(getCatBEMinimalInput());

    const expected = getCatBEFullyPopulatedDangerousDataFields();

    // expect all dangerous, no faults or serious
    const arraysMatched: boolean = doesResultMatchExpectations(mapCatBEData(fullyPopulated), expected);
    expect(arraysMatched).toEqual(true);
  });

  it('Should map a fully populated delegated test result', () => {
    const fullyPopulated = getFullyPopulatedDelegatedTest(getCatBEMinimalInput());

    const expected = getCatBEFullyPopulatedDelegatedExaminer();

    const arraysMatched: boolean = doesResultMatchExpectations(mapCatBEData(fullyPopulated), expected);
    expect(arraysMatched).toEqual(true);
  });
});
