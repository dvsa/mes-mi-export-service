import { DataField } from '../../../../../../domain/mi-export-data';

export function getADI3FullyPopulatedFaultDataFields(): DataField[] {
  return [
    {
      col: 'APP_REF_NO',
      val: 23123428013,
    },
    {
      col: 'TEST_TYPE',
      val: 11,
    },
    {
      col: 'ADI_PRN',
      val: 4405399,
    },
    {
      col: 'CHANNEL_INDICATOR',
      val: 2,
    },
    {
      col: 'DATE_OF_TEST',
      val: '220823',
    },
    {
      col: 'TIME',
      val: '1600',
    },
    {
      col: 'DEBRIEF_WITNESSED',
      val: 0,
    },
    {
      col: 'TEST_CATEGORY_TYPE',
      val: 'ADI3',
    },
    {
      col: 'PDI_LOGBOOK',
      val: 1,
    },
    {
      col: 'TRAINEE_LICENCE',
      val: 1,
    },
    {
      col: 'ACTIVITY_CODE',
      val: 1,
    },
    {
      col:'CANDIDATE_INDIVIDUAL_ID',
      val:1125,
    },
    {
      col: 'CANDIDATE_SURNAME',
      val: 'Wheeler',
    },
    {
      col: 'DRIVER_NUMBER',
      val: 'WHEEL123456789DO',
    },
    {
      col: 'DUAL_CONTROL_IND',
      val: 1,
    },
    {
      col: 'BOOKED_STAFF_NO',
      val: '10000013',
    },
    {
      col: 'KEYED_STAFF_NO',
      val: '10000013',
    },
    {
      col: 'STAFF_NO',
      val: '10000013',
    },
    {
      col: 'DTC_AUTHORITY_CODE',
      val: 'ITC1',
    },
    {
      col: 'TEST_CENTRE_ID',
      val: 54000,
    },
    {
      col: 'ACTIVITY_CODE',
      val: 1,
    },
    {
      col: 'TEST_RESULT',
      val: 'P',
    },
    {
      col: 'INSURANCE_DECLARATION_ACCEPTED',
      val: 1,
    },
    {
      col: 'CANDIDATE_FORENAMES',
      val: 'Mike',
    },
    {
      col: 'DRIVER_NO_DOB',
      val: 870727,
    },
    {
      col: 'ETHNICITY',
      val: 'D',
    },
    {
      col: 'COMMUNICATION_METHOD',
      val: 'Email',
    },
    {
      col: 'COMMUNICATION_EMAIL',
      val: 'test@test',
    },
    {
      col: 'VEHICLE_REGISTRATION',
      val: 'ABC123',
    },
    {
      col: 'LESSON_PLAN_1',
      val: 3,
    },
    {
      col: 'LESSON_PLAN_2',
      val: 3,
    },
    {
      col: 'LESSON_PLAN_3',
      val: 3,
    },
    {
      col: 'LESSON_PLAN_4',
      val: 3,
    },
    {
      col: 'LESSON_PLAN_SCORE',
      val: 12,
    },
    {
      col: 'RISK_MANAGEMENT_1',
      val: 3,
    },
    {
      col: 'RISK_MANAGEMENT_2',
      val: 3,
    },
    {
      col: 'RISK_MANAGEMENT_3',
      val: 3,
    },
    {
      col: 'RISK_MANAGEMENT_4',
      val: 3,
    },
    {
      col: 'RISK_MANAGEMENT_5',
      val: 3,
    },
    {
      col: 'RISK_MANAGEMENT_SCORE',
      val: 15,
    },
    {
      col: 'TEACHING_LEARNING_STRATS_1',
      val: 3,
    },
    {
      col: 'TEACHING_LEARNING_STRATS_2',
      val: 3,
    },
    {
      col: 'TEACHING_LEARNING_STRATS_3',
      val: 3,
    },
    {
      col: 'TEACHING_LEARNING_STRATS_4',
      val: 3,
    },
    {
      col: 'TEACHING_LEARNING_STRATS_5',
      val: 3,
    },
    {
      col: 'TEACHING_LEARNING_STRATS_6',
      val: 3,
    },
    {
      col: 'TEACHING_LEARNING_STRATS_7',
      val: 3,
    },
    {
      col: 'TEACHING_LEARNING_STRATS_8',
      val: 3,
    },
    {
      col: 'TEACHING_LEARNING_STRATS_SCORE',
      val: 24,
    },
    {
      col: 'TOTAL_SCORE',
      val: 51,
    },
    {
      col: 'GRADE',
      val: 'A',
    },
    {
      col: 'SEEK_FURTHER_DEV',
      val: 1,
    },
    {
      col: 'REVIEW_FEEDBACK',
      val: 'Feedback',
    },
    {
      col: 'ACCOMPANIED_BY_SUPERVISOR',
      val: 1,
    },
    {
      col: 'ACCOMPANIED_BY_TRAINER',
      val: 1,
    },
    {
      col: 'FORM_TYPE',
      val: 4,
    },
    {
      col: 'WELSH_FORM_IND',
      val: 'E',
    },
    {
      col: 'EXTENDED_TEST',
      val: 0,
    },
    {
      col: 'SHORT_NOTICE_EXAMINER',
      val: 0,
    },
    {
      col: 'VEHICLE_SLOT_TYPE',
      val: 'C',
    },
    {
      col: 'NO_WRITE_UP',
      val: 0,
    },
    {
      col: 'CANDIDATE_POST_CODE',
      val: 'PO57 0DE',
    },
    {
      col: 'CANDIDATE_TITLE',
      val: 'Mr',
    },
    {
      col: 'GENDER',
      val: 'M',
    },
    {
      col:'STUDENT_LEVEL',
      val:'beginner',
    },
    {
      col:'LESSON_THEMES',
      val:'junctions|townCityDriving',
    },
    {
      col:'OTHER_LESSON_THEME',
      val:'Other theme',
    },
  ];
}

export function getSCFullyPopulatedFaultDataFields(): DataField[] {
  return [
    ...getADI3FullyPopulatedFaultDataFields(),
    { col: 'VALID_CERTIFICATE', val: 1 },
    { col: 'START_TIME', val: new Date('2023-06-14T11:45') },
    { col: 'END_TIME', val: new Date('2023-06-14T20:45') },
  ];
}
