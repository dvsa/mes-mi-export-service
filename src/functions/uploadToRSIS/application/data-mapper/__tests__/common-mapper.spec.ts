import { cloneDeep } from 'lodash';
import { MissingTestResultDataError } from '../data-mapper';
import {
  ChannelIndicator,
  DataField,
  FormType,
  Gender,
  Language,
  ResultIndicator,
} from '../../../domain/mi-export-data';
import { InterfaceType, ResultUpload } from '../../result-client';
import { mapCommonData } from '../common-mapper';
import moment = require('moment');

describe('mapCommonData', () => {

  // minimally populated pass, no gearbox or reg, staff number with leading zeros, no gender
  const minimalInput: ResultUpload = {
    uploadKey: {
      applicationReference: {
        applicationId: 2222,
        bookingSequence: 11,
        checkDigit: 3,
      },
      staffNumber: '001122',
      interfaceType: InterfaceType.RSIS,
    },
    testResult: {
      version: '0.0.1',
      category: 'B',
      rekey: false,
      changeMarker: false,
      examinerBooked: 12345679,
      examinerConducted: 12345678,
      examinerKeyed: 12345670,
      journalData: {
        examiner: {
          staffNumber: '12345678',
        },
        testCentre: {
          centreId: 1234,
          costCode: 'CC1',
        },
        testSlotAttributes: {
          slotId: 1234,
          start: '2019-06-10T09:30:00',
          vehicleTypeCode: 'C',
          welshTest: false,
          specialNeeds: false,
          extendedTest: false,
        },
        candidate: {
          candidateId: 1111,
          candidateName: {
            title: 'Mr',
            firstName: 'BBBBBB',
            lastName: 'AAAAAA',
          },
          candidateAddress: {
            postcode: 'AA12 3BB',
          },
          driverNumber: 'AAAAA111111BB9CC',
          dateOfBirth: '2000-01-31',
        },
        applicationReference: {
          applicationId: 2222,
          bookingSequence: 1,
          checkDigit: 3,
        },
      },
      activityCode: '1',
      communicationPreferences: {
        updatedEmail: 'still-noone@nowhere.com',
        communicationMethod: 'Email',
        conductedLanguage: 'English',
      },
      testData: {
        faultSummary: {
          totalDrivingFaults: 10,
        },
      },
      passCompletion: {
        provisionalLicenceProvided: true,
        passCertificateNumber: 'C4444Q',
      },
      testSummary: {
        routeNumber: 15,
      },
    },
    autosaved: 0, // false
  };

  it('Should map a minially populated regular test result (pass, no gearbox, english, minimal write up)', () => {
    const expected: DataField[] = [
      { col: 'CHANNEL_INDICATOR', val: ChannelIndicator.MES },
      { col: 'FORM_TYPE', val: FormType.MES },
      { col: 'DRIVING_SCHOOL_CANDIDATE', val: 0 },
      { col: 'SPECIAL_NEEDS', val: 0 },
      { col: 'APP_REF_NO', val: 2222013 },
      { col: 'DATE_OF_TEST', val: '190610' },
      { col: 'TIME', val: '0930' },
      { col: 'DTC_AUTHORITY_CODE', val: 'CC1' },
      { col: 'TEST_CATEGORY_TYPE', val: 'B' },
      { col: 'AUTOMATIC_TEST', val: 0 },
      { col: 'EXTENDED_TEST', val: 0 },
      { col: 'TEST_TYPE', val: 2 },
      { col: 'ACCOMPANIED_BY_DSA', val: 0 },
      { col: 'ACCOMPANIED_BY_ADI', val: 0 },
      { col: 'ACCOMPANIED_BY_INTERPRETER', val: 0 },
      { col: 'ACCOMPANIED_BY_OTHER', val: 0 },
      { col: 'VISITING_EXAMINER', val: 0 },
      { col: 'SHORT_NOTICE_EXAMINER', val: 0 },
      { col: 'BOOKED_STAFF_NO', val: '12345679' },
      { col: 'STAFF_NO', val: '12345678' },
      { col: 'KEYED_STAFF_NO', val: '12345670' },
      { col: 'TEST_RESULT', val: ResultIndicator.Pass },
      { col: 'TOTAL_FAULTS', val: 10 },
      { col: 'ROUTE_NUMBER', val: 15 },
      { col: 'EXAMINER_ACTION_VERBAL', val: 0 },
      { col: 'EXAMINER_ACTION_PHYSICAL', val: 0 },
      { col: 'DUAL_CONTROL_IND', val: 0 },
      { col: 'DEBRIEF_WITNESSED', val: 0 },
      { col: 'DEBRIEF_GIVEN', val: 1 },
      { col: 'ACTIVITY_CODE', val: 1 },
      { col: 'LICENCE_RECEIVED', val: 1 },
      { col: 'DOB', val: new Date('2000-01-31') },
      { col: 'CANDIDATE_FORENAMES', val: 'BBBBBB' },
      { col: 'CANDIDATE_INDIVIDUAL_ID', val: 1111 },
      { col: 'CANDIDATE_POST_CODE', val: 'AA12 3BB' },
      { col: 'CANDIDATE_SURNAME', val: 'AAAAAA' },
      { col: 'CANDIDATE_TITLE', val: 'Mr' },
      { col: 'DRIVER_NUMBER', val: 'AAAAA111111BB9CC' },
      { col: 'TEST_CATEGORY_REF', val: 'B' },
      { col: 'TEST_CENTRE_ID', val: 1234 },
      { col: 'VEHICLE_SLOT_TYPE', val: 'C' },
      { col: 'WELSH_FORM_IND', val: Language.English },
      { col: 'ECO_SAFE_COMPLETED', val: 0 },
      { col: 'ECO_SAFE_CONTROL', val: 0 },
      { col: 'ECO_SAFE_PLANNING', val: 0 },
      { col: 'INSURANCE_DECLARATION_ACCEPTED', val: 0 },
      { col: 'RESIDENCY_DECLARATION_ACCEPTED', val: 0 },
      { col: 'HEALTH_DECLARATION_ACCEPTED', val: 0 },
      { col: 'PASS_CERT_RECEIVED', val: 0 },
      { col: 'NO_WRITE_UP', val: 0 },
      { col: 'PASS_CERTIFICATE', val: 'C4444Q' },
      { col: 'COMMUNICATION_METHOD', val: 'Email' },
      { col: 'COMMUNICATION_EMAIL', val: 'still-noone@nowhere.com' },
    ];

    expect(mapCommonData(minimalInput)).toEqual(expected);
  });

  it('Should map a fully populated regular test result (fail, automatic, welsh, rekey, ethnicity, write up)', () => {
    const input: ResultUpload = {
      uploadKey: {
        applicationReference: {
          applicationId: 2222,
          bookingSequence: 11,
          checkDigit: 3,
        },
        staffNumber: '001122',
        interfaceType: InterfaceType.RSIS,
      },
      testResult: {
        version: '0.0.1',
        category: 'B',
        rekey: true,
        changeMarker: false,
        examinerBooked: 12345679,
        examinerConducted: 12345678,
        examinerKeyed: 12345670,
        journalData: {
          examiner: {
            staffNumber: '12345678',
          },
          testCentre: {
            centreId: 1234,
            costCode: 'CC1',
          },
          testSlotAttributes: {
            slotId: 1234,
            start: '2019-06-10T09:30:00',
            vehicleTypeCode: 'C',
            welshTest: true,
            specialNeeds: true,
            extendedTest: true,
            examinerVisiting: true,
          },
          candidate: {
            candidateId: 1111,
            candidateName: {
              title: 'Mr',
              firstName: 'BBBBBB',
              secondName: 'CCCCCC',
              thirdName: 'DDDDDD',
              lastName: 'AAAAAA',
            },
            candidateAddress: {
              addressLine1: '111',
              addressLine2: '222',
              addressLine3: '333',
              addressLine4: '444',
              addressLine5: '555',
              postcode: 'AA12 3BB',
            },
            primaryTelephone: '654321',
            secondaryTelephone: '123456',
            mobileTelephone: '777777',
            emailAddress: 'noone@nowhere.com',
            prn: 666666,
            previousADITests: 3,
            driverNumber: 'AAAAA111111BB9CC',
            dateOfBirth: '2000-01-31',
            gender: 'F',
            ethnicityCode: 'A',
          },
          applicationReference: {
            applicationId: 2222,
            bookingSequence: 11,
            checkDigit: 3,
          },
        },
        activityCode: '2',
        communicationPreferences: {
          updatedEmail: 'still-noone@nowhere.com',
          communicationMethod: 'Post',
          conductedLanguage: 'Cymraeg',
        },
        preTestDeclarations: {
          insuranceDeclarationAccepted: true,
          residencyDeclarationAccepted: true,
          preTestSignature: '**DUMMY**',
        },
        accompaniment: {
          ADI: true,
          supervisor: true,
          interpreter: true,
          other: true,
        },
        vehicleDetails: {
          registrationNumber: 'DDDDDD',
          gearboxCategory: 'Automatic',
          schoolCar: true,
          dualControls: true,
        },
        instructorDetails: {
          registrationNumber: 555555,
        },
        testData: {
          eco: {
            completed: true,
            adviceGivenControl: true,
            adviceGivenPlanning: true,
          },
          ETA: {
            physical: true,
            verbal: true,
          },
          faultSummary: {
            totalDrivingFaults: 20,
          },
        },
        testSummary: {
          routeNumber: 15,
          independentDriving: 'Sat nav',
          candidateDescription: 'Short',
          debriefWitnessed: false,
          identification: 'Passport',
          weatherConditions: ['Showers', 'Windy'],
          D255: true,
          additionalInformation: 'aaa bbb ccc',
        },
      },
      autosaved: 0, // false
    };

    const expected: DataField[] = [
      { col: 'CHANNEL_INDICATOR', val: ChannelIndicator.MES_REKEY },
      { col: 'FORM_TYPE', val: FormType.MES },
      { col: 'DRIVING_SCHOOL_CANDIDATE', val: 1 },
      { col: 'SPECIAL_NEEDS', val: 1 },
      { col: 'APP_REF_NO', val: 2222113 },
      { col: 'DATE_OF_TEST', val: '190610' },
      { col: 'TIME', val: '0930' },
      { col: 'DTC_AUTHORITY_CODE', val: 'CC1' },
      { col: 'TEST_CATEGORY_TYPE', val: 'B' },
      { col: 'AUTOMATIC_TEST', val: 1 },
      { col: 'EXTENDED_TEST', val: 1 },
      { col: 'TEST_TYPE', val: 2 },
      { col: 'ACCOMPANIED_BY_DSA', val: 1 },
      { col: 'ACCOMPANIED_BY_ADI', val: 1 },
      { col: 'ACCOMPANIED_BY_INTERPRETER', val: 1 },
      { col: 'ACCOMPANIED_BY_OTHER', val: 1 },
      { col: 'VISITING_EXAMINER', val: 1 },
      { col: 'SHORT_NOTICE_EXAMINER', val: 0 },
      { col: 'BOOKED_STAFF_NO', val: '12345679' },
      { col: 'STAFF_NO', val: '12345678' },
      { col: 'KEYED_STAFF_NO', val: '12345670' },
      { col: 'TEST_RESULT', val: ResultIndicator.Fail },
      { col: 'TOTAL_FAULTS', val: 20 },
      { col: 'ROUTE_NUMBER', val: 15 },
      { col: 'EXAMINER_ACTION_VERBAL', val: 1 },
      { col: 'EXAMINER_ACTION_PHYSICAL', val: 1 },
      { col: 'DUAL_CONTROL_IND', val: 1 },
      { col: 'DEBRIEF_WITNESSED', val: 0 },
      { col: 'DEBRIEF_GIVEN', val: 1 },
      { col: 'ACTIVITY_CODE', val: 2 },
      { col: 'LICENCE_RECEIVED', val: 0 },
      { col: 'DOB', val: new Date('2000-01-31') },
      { col: 'CANDIDATE_FORENAMES', val: 'BBBBBB' },
      { col: 'CANDIDATE_INDIVIDUAL_ID', val: 1111 },
      { col: 'CANDIDATE_POST_CODE', val: 'AA12 3BB' },
      { col: 'CANDIDATE_SURNAME', val: 'AAAAAA' },
      { col: 'CANDIDATE_TITLE', val: 'Mr' },
      { col: 'DRIVER_NUMBER', val: 'AAAAA111111BB9CC' },
      { col: 'TEST_CATEGORY_REF', val: 'B' },
      { col: 'TEST_CENTRE_ID', val: 1234 },
      { col: 'VEHICLE_SLOT_TYPE', val: 'C' },
      { col: 'WELSH_FORM_IND', val: Language.Welsh },
      { col: 'ECO_SAFE_COMPLETED', val: 1 },
      { col: 'ECO_SAFE_CONTROL', val: 1 },
      { col: 'ECO_SAFE_PLANNING', val: 1 },
      { col: 'INSURANCE_DECLARATION_ACCEPTED', val: 1 },
      { col: 'RESIDENCY_DECLARATION_ACCEPTED', val: 1 },
      { col: 'HEALTH_DECLARATION_ACCEPTED', val: 0 },
      { col: 'PASS_CERT_RECEIVED', val: 0 },
      { col: 'NO_WRITE_UP', val: 0 },
      { col: 'ADI_NUMBER', val: '555555' },
      { col: 'ETHNICITY', val: 'A' },
      { col: 'GENDER', val: Gender.Female },
      { col: 'VEHICLE_REGISTRATION', val: 'DDDDDD' },
      { col: 'CANDIDATE_PHYSICAL_DESCRIPTION', val: 'Short' },
      { col: 'WEATHER_CONDITIONS', val: 'Showers|Windy' },
      { col: 'CANDIDATE_IDENTIFICATION', val: 'Passport' },
      { col: 'ADDITIONAL_INFORMATION', val: 'aaa bbb ccc' },
      { col: 'COMMUNICATION_METHOD', val: 'Post' },
      { col: 'COMMUNICATION_EMAIL', val: 'still-noone@nowhere.com' },
    ];

    expect(mapCommonData(input)).toEqual(expected);
  });

  it('Should map a terminated test result (with defaulted route number, english, vehicle type A, write up)', () => {
    const input: ResultUpload = {
      uploadKey: {
        applicationReference: {
          applicationId: 2222,
          bookingSequence: 11,
          checkDigit: 3,
        },
        staffNumber: '1234',
        interfaceType: InterfaceType.RSIS,
      },
      testResult: {
        version: '0.0.1',
        category: 'B',
        rekey: false,
        changeMarker: false,
        examinerBooked: 12345679,
        examinerConducted: 12345678,
        examinerKeyed: 12345670,
        journalData: {
          examiner: {
            staffNumber: '12345679',
          },
          testCentre: {
            centreId: 1234,
            costCode: 'CC1',
          },
          testSlotAttributes: {
            slotId: 1234,
            start: '2019-06-10T12:45:30',
            vehicleTypeCode: 'A',
            welshTest: false,
            specialNeeds: false,
            extendedTest: false,
            examinerVisiting: false,
          },
          candidate: {
            candidateId: 1111,
            candidateName: {
              title: 'Mr',
              firstName: 'BBBBBB',
              secondName: 'CCCCCC',
              thirdName: 'DDDDDD',
              lastName: 'AAAAAA',
            },
            candidateAddress: {
              addressLine1: '111',
              addressLine2: '222',
              addressLine3: '333',
              addressLine4: '444',
              addressLine5: '555',
              postcode: 'AA12 3BB',
            },
            primaryTelephone: '654321',
            secondaryTelephone: '123456',
            mobileTelephone: '777777',
            emailAddress: 'noone@nowhere.com',
            prn: 666666,
            previousADITests: 3,
            driverNumber: 'AAAAA111111BB9CC',
            dateOfBirth: '2000-01-31',
            gender: 'M',
          },
          applicationReference: {
            applicationId: 2222,
            bookingSequence: 11,
            checkDigit: 3,
          },
        },
        activityCode: '22',
        communicationPreferences: {
          updatedEmail: 'still-noone@nowhere.com',
          communicationMethod: 'Email',
          conductedLanguage: 'English',
        },
        preTestDeclarations: {
          insuranceDeclarationAccepted: true,
          residencyDeclarationAccepted: true,
          preTestSignature: '**DUMMY**',
        },
        accompaniment: {
          ADI: false,
          supervisor: false,
          interpreter: false,
          other: false,
        },
        vehicleDetails: {
          registrationNumber: 'DDDDDD',
          gearboxCategory: 'Manual',
          schoolCar: false,
          dualControls: false,
        },
        instructorDetails: {
          registrationNumber: 555555,
        },
        testData: {
          faultSummary: {
            totalDrivingFaults: 0,
          },
          eyesightTest: {
            complete: true,
          },
        },
        testSummary: {
          independentDriving: 'Sat nav',
          debriefWitnessed: true,
          identification: 'Licence',
          candidateDescription: 'Very tall',
          weatherConditions: ['Showers', 'Windy'],
          D255: false,
          additionalInformation: 'aaa bbb ccc',
        },
      },
      autosaved: 0, // false
    };

    const expected: DataField[] = [
      { col: 'CHANNEL_INDICATOR', val: ChannelIndicator.MES },
      { col: 'FORM_TYPE', val: FormType.MES },
      { col: 'DRIVING_SCHOOL_CANDIDATE', val: 0 },
      { col: 'SPECIAL_NEEDS', val: 0 },
      { col: 'APP_REF_NO', val: 2222113 },
      { col: 'DATE_OF_TEST', val: '190610' },
      { col: 'TIME', val: '1245' },
      { col: 'DTC_AUTHORITY_CODE', val: 'CC1' },
      { col: 'TEST_CATEGORY_TYPE', val: 'B' },
      { col: 'AUTOMATIC_TEST', val: 0 },
      { col: 'EXTENDED_TEST', val: 0 },
      { col: 'TEST_TYPE', val: 2 },
      { col: 'ACCOMPANIED_BY_DSA', val: 0 },
      { col: 'ACCOMPANIED_BY_ADI', val: 0 },
      { col: 'ACCOMPANIED_BY_INTERPRETER', val: 0 },
      { col: 'ACCOMPANIED_BY_OTHER', val: 0 },
      { col: 'VISITING_EXAMINER', val: 0 },
      { col: 'SHORT_NOTICE_EXAMINER', val: 0 },
      { col: 'BOOKED_STAFF_NO', val: '12345679' },
      { col: 'STAFF_NO', val: '12345678' },
      { col: 'KEYED_STAFF_NO', val: '12345670' },
      { col: 'TEST_RESULT', val: ResultIndicator.None },
      { col: 'TOTAL_FAULTS', val: 0 },
      { col: 'ROUTE_NUMBER', val: 99 },
      { col: 'EXAMINER_ACTION_VERBAL', val: 0 },
      { col: 'EXAMINER_ACTION_PHYSICAL', val: 0 },
      { col: 'DUAL_CONTROL_IND', val: 0 },
      { col: 'DEBRIEF_WITNESSED', val: 1 },
      { col: 'DEBRIEF_GIVEN', val: 1 },
      { col: 'ACTIVITY_CODE', val: 22 },
      { col: 'LICENCE_RECEIVED', val: 0 },
      { col: 'DOB', val: new Date('2000-01-31') },
      { col: 'CANDIDATE_FORENAMES', val: 'BBBBBB' },
      { col: 'CANDIDATE_INDIVIDUAL_ID', val: 1111 },
      { col: 'CANDIDATE_POST_CODE', val: 'AA12 3BB' },
      { col: 'CANDIDATE_SURNAME', val: 'AAAAAA' },
      { col: 'CANDIDATE_TITLE', val: 'Mr' },
      { col: 'DRIVER_NUMBER', val: 'AAAAA111111BB9CC' },
      { col: 'TEST_CATEGORY_REF', val: 'B' },
      { col: 'TEST_CENTRE_ID', val: 1234 },
      { col: 'VEHICLE_SLOT_TYPE', val: 'A' },
      { col: 'WELSH_FORM_IND', val: Language.English },
      { col: 'ECO_SAFE_COMPLETED', val: 0 },
      { col: 'ECO_SAFE_CONTROL', val: 0 },
      { col: 'ECO_SAFE_PLANNING', val: 0 },
      { col: 'INSURANCE_DECLARATION_ACCEPTED', val: 1 },
      { col: 'RESIDENCY_DECLARATION_ACCEPTED', val: 1 },
      { col: 'HEALTH_DECLARATION_ACCEPTED', val: 0 },
      { col: 'PASS_CERT_RECEIVED', val: 0 },
      { col: 'NO_WRITE_UP', val: 0 },
      { col: 'ADI_NUMBER', val: '555555' },
      { col: 'GENDER', val: Gender.Male },
      { col: 'VEHICLE_REGISTRATION', val: 'DDDDDD' },
      { col: 'CANDIDATE_PHYSICAL_DESCRIPTION', val: 'Very tall' },
      { col: 'WEATHER_CONDITIONS', val: 'Showers|Windy' },
      { col: 'CANDIDATE_IDENTIFICATION', val: 'Licence' },
      { col: 'ADDITIONAL_INFORMATION', val: 'aaa bbb ccc' },
      { col: 'COMMUNICATION_METHOD', val: 'Email' },
      { col: 'COMMUNICATION_EMAIL', val: 'still-noone@nowhere.com' },
    ];

    expect(mapCommonData(input)).toEqual(expected);
  });

  it('Should map all rekey properties to the right fields', () => {
    const input: ResultUpload = {
      ...minimalInput,
      testResult: {
        ...minimalInput.testResult,
        rekeyDate: '2019-10-02T11:50:57',
        rekeyReason: {
          other: {
            selected: true,
            reason: 'other reason',
          },
          ipadIssue: {
            selected: true,
            stolen: true,
          },
        },
      },
    };

    const expected: DataField[] = [
      { col: 'CHANNEL_INDICATOR', val: ChannelIndicator.MES },
      { col: 'FORM_TYPE', val: FormType.MES },
      { col: 'DRIVING_SCHOOL_CANDIDATE', val: 0 },
      { col: 'SPECIAL_NEEDS', val: 0 },
      { col: 'APP_REF_NO', val: 2222013 },
      { col: 'DATE_OF_TEST', val: '190610' },
      { col: 'TIME', val: '0930' },
      { col: 'DTC_AUTHORITY_CODE', val: 'CC1' },
      { col: 'TEST_CATEGORY_TYPE', val: 'B' },
      { col: 'AUTOMATIC_TEST', val: 0 },
      { col: 'EXTENDED_TEST', val: 0 },
      { col: 'TEST_TYPE', val: 2 },
      { col: 'ACCOMPANIED_BY_DSA', val: 0 },
      { col: 'ACCOMPANIED_BY_ADI', val: 0 },
      { col: 'ACCOMPANIED_BY_INTERPRETER', val: 0 },
      { col: 'ACCOMPANIED_BY_OTHER', val: 0 },
      { col: 'VISITING_EXAMINER', val: 0 },
      { col: 'SHORT_NOTICE_EXAMINER', val: 0 },
      { col: 'BOOKED_STAFF_NO', val: '12345679' },
      { col: 'STAFF_NO', val: '12345678' },
      { col: 'KEYED_STAFF_NO', val: '12345670' },
      { col: 'TEST_RESULT', val: ResultIndicator.Pass },
      { col: 'TOTAL_FAULTS', val: 10 },
      { col: 'ROUTE_NUMBER', val: 15 },
      { col: 'EXAMINER_ACTION_VERBAL', val: 0 },
      { col: 'EXAMINER_ACTION_PHYSICAL', val: 0 },
      { col: 'DUAL_CONTROL_IND', val: 0 },
      { col: 'DEBRIEF_WITNESSED', val: 0 },
      { col: 'DEBRIEF_GIVEN', val: 1 },
      { col: 'ACTIVITY_CODE', val: 1 },
      { col: 'LICENCE_RECEIVED', val: 1 },
      { col: 'DOB', val: new Date('2000-01-31') },
      { col: 'CANDIDATE_FORENAMES', val: 'BBBBBB' },
      { col: 'CANDIDATE_INDIVIDUAL_ID', val: 1111 },
      { col: 'CANDIDATE_POST_CODE', val: 'AA12 3BB' },
      { col: 'CANDIDATE_SURNAME', val: 'AAAAAA' },
      { col: 'CANDIDATE_TITLE', val: 'Mr' },
      { col: 'DRIVER_NUMBER', val: 'AAAAA111111BB9CC' },
      { col: 'TEST_CATEGORY_REF', val: 'B' },
      { col: 'TEST_CENTRE_ID', val: 1234 },
      { col: 'VEHICLE_SLOT_TYPE', val: 'C' },
      { col: 'WELSH_FORM_IND', val: Language.English },
      { col: 'ECO_SAFE_COMPLETED', val: 0 },
      { col: 'ECO_SAFE_CONTROL', val: 0 },
      { col: 'ECO_SAFE_PLANNING', val: 0 },
      { col: 'INSURANCE_DECLARATION_ACCEPTED', val: 0 },
      { col: 'RESIDENCY_DECLARATION_ACCEPTED', val: 0 },
      { col: 'HEALTH_DECLARATION_ACCEPTED', val: 0 },
      { col: 'PASS_CERT_RECEIVED', val: 0 },
      { col: 'NO_WRITE_UP', val: 0 },
      { col: 'PASS_CERTIFICATE', val: 'C4444Q' },
      { col: 'COMMUNICATION_METHOD', val: 'Email' },
      { col: 'COMMUNICATION_EMAIL', val: 'still-noone@nowhere.com' },
      { col: 'REKEY_TIMESTAMP', val: moment('2019-10-02T11:50:57', 'YYYY-MM-DDTHH:mm:ss').toDate() },
      { col: 'REKEY_REASONS', val: 'iPad issue|Other' },
      { col: 'IPAD_ISSUE_REASON', val: 'stolen' },
      { col: 'OTHER_REKEY_REASON', val: 'other reason' },
    ];

    expect(mapCommonData(input)).toEqual(expected);
  });

  it('Should reject a test result with missing mandatory data (candidate forenames)', () => {
    const missingMandatory = cloneDeep(minimalInput);
    if (missingMandatory.testResult.journalData.candidate.candidateName) {
      delete missingMandatory.testResult.journalData.candidate.candidateName.firstName;
    }

    expect(() => mapCommonData(missingMandatory))
      .toThrow(new MissingTestResultDataError('journalData.candidate.candidateName.firstName'));
  });

  it('Should reject a test result with missing mandatory data (candidate date of birth)', () => {
    const missingMandatory = cloneDeep(minimalInput);
    if (missingMandatory.testResult.journalData.candidate.dateOfBirth) {
      delete missingMandatory.testResult.journalData.candidate.dateOfBirth;
    }

    expect(() => mapCommonData(missingMandatory))
      .toThrow(new MissingTestResultDataError('testResult.journalData.candidate.dateOfBirth'));
  });

  it('Should reject a test result with missing mandatory data (driver number)', () => {
    const missingMandatory = cloneDeep(minimalInput);
    delete missingMandatory.testResult.journalData.candidate.driverNumber;

    expect(() => mapCommonData(missingMandatory))
      .toThrow(new MissingTestResultDataError('journalData.candidate.driverNumber'));
  });

  it('Should reject a test result with missing mandatory data (candidate firstname)', () => {
    const missingMandatory = cloneDeep(minimalInput);
    if (missingMandatory.testResult.journalData.candidate.candidateName) {
      delete missingMandatory.testResult.journalData.candidate.candidateName.firstName;
    }
    expect(() => mapCommonData(missingMandatory))
      .toThrow(new MissingTestResultDataError('journalData.candidate.candidateName.firstName'));
  });

  it('Should reject a test result with missing mandatory data (language)', () => {
    const missingMandatory = cloneDeep(minimalInput);
    if (missingMandatory.testResult.communicationPreferences) {
      delete missingMandatory.testResult.communicationPreferences.conductedLanguage;
    }
    expect(() => mapCommonData(missingMandatory))
      .toThrow(new MissingTestResultDataError('testResult.communicationPreferences.conductedLanguage'));
  });

  it('Should reject a test result with missing mandatory data (booked staff num)', () => {
    const missingMandatory = cloneDeep(minimalInput);
    if (missingMandatory.testResult) {
      delete missingMandatory.testResult.examinerBooked;
    }
    expect(() => mapCommonData(missingMandatory))
      .toThrow(new MissingTestResultDataError('examinerBooked'));
  });

  it('Should reject a test result with missing mandatory data (staff num)', () => {
    const missingMandatory = cloneDeep(minimalInput);
    if (missingMandatory.testResult) {
      delete missingMandatory.testResult.examinerConducted;
    }
    expect(() => mapCommonData(missingMandatory))
      .toThrow(new MissingTestResultDataError('examinerConducted'));
  });

  it('Should reject a test result with missing mandatory data (keyed staff num)', () => {
    const missingMandatory = cloneDeep(minimalInput);
    if (missingMandatory.testResult) {
      delete missingMandatory.testResult.examinerKeyed;
    }
    expect(() => mapCommonData(missingMandatory))
      .toThrow(new MissingTestResultDataError('examinerKeyed'));
  });

  it('Should reject a test result with invalid data (unsupported test category)', () => {
    const invalidResult = cloneDeep(minimalInput);
    invalidResult.testResult.category = 'XYZ';

    expect(() => mapCommonData(invalidResult)).toThrow(new Error('Unsupported test category XYZ'));
  });
});
