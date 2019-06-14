import { cloneDeep } from 'lodash';
import { MissingTestResultDataError } from '../data-mapper';
import { ChannelIndicator, DataField, Gender, Language, ResultIndicator } from '../../../domain/mi-export-data';
import { InterfaceType, ResultUpload } from '../../result-client';
import { mapCommonData } from '../common-mapper';

describe('mapCommonData', () => {

  // minimally populated pass, manual gearbox
  const minimalInput: ResultUpload = {
    uploadKey: {
      applicationReference: 2222113,
      staffNumber: 1122,
      interfaceType: InterfaceType.RSIS,
    },
    testResult: {
      category: 'B',
      id: 'TBC',
      journalData: {
        examiner: {
          staffNumber: '001122',
        },
        testCentre: {
          centreId: 1234,
          costCode: 'CC1',
        },
        testSlotAttributes: {
          slotId: 1234,
          start: '2019-06-10T09:30:00',
          vehicleSlotType: 'B57mins',
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
        },
        applicationReference: {
          applicationId: 2222,
          bookingSequence: 11,
          checkDigit: 3,
        },
      },
      activityCode: '1',
      communicationPreferences: {
        updatedEmail: 'still-noone@nowhere.com',
        communicationMethod: 'Email',
        conductedLanguage: 'English',
      },
      vehicleDetails: {
        registrationNumber: 'DDDDDD',
        gearboxCategory: 'Manual',
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
  };

  it('Should map a minially populated regular test result (pass, manual, english)', () => {
    const expected: DataField[] = [
      { col: 'CHANNEL_INDICATOR', val: ChannelIndicator.MES },
      { col: 'DRIVING_SCHOOL_CANDIDATE', val: 0 },
      { col: 'SPECIAL_NEEDS', val: 0 },
      { col: 'APP_REF_NO', val: 2222113 },
      { col: 'DATE_OF_TEST', val: '19:06:10' },
      { col: 'TIME', val: '09:30' },
      { col: 'DTC_AUTHORITY_CODE', val: 'CC1' },
      { col: 'STAFF_NO', val: '001122' },
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
      { col: 'TEST_RESULT', val: ResultIndicator.Pass },
      { col: 'TOTAL_FAULTS', val: 10 },
      { col: 'ROUTE_NUMBER', val: 15 },
      { col: 'EXAMINER_ACTION_VERBAL', val: 0 },
      { col: 'EXAMINER_ACTION_PHYSICAL', val: 0 },
      { col: 'DUAL_CONTROL_IND', val: 0 },
      { col: 'DEBRIEF_GIVEN', val: 1 },
      { col: 'ACTIVITY_CODE', val: 1 },
      { col: 'LICENCE_RECEIVED', val: 1 },
      { col: 'DOB', val: new Date('1974-12-24') }, // DUMMY
      { col: 'CANDIDATE_FORENAMES', val: 'BBBBBB' },
      { col: 'GENDER', val: Gender.Male }, // DUMMY
      { col: 'CANDIDATE_INDIVIDUAL_ID', val: 1111 },
      { col: 'CANDIDATE_POST_CODE', val: 'AA12 3BB' },
      { col: 'CANDIDATE_SURNAME', val: 'AAAAAA' },
      { col: 'CANDIDATE_TITLE', val: 'Mr' },
      { col: 'DRIVER_NUMBER', val: 'AAAAA111111BB9CC' },
      { col: 'EXAMINER_PERSON_ID', val: 1234 },
      { col: 'TEST_CATEGORY_REF', val: 'B' },
      { col: 'TEST_CENTRE_ID', val: 1234 },
      // testCentreName: 'Dummy', // not needed?
      { col: 'VEHICLE_SLOT_TYPE', val: 'B57mins' },
      { col: 'WELSH_FORM_IND', val: Language.English },
      { col: 'ETHNICITY', val: 'A' }, // DUMMY
      { col: 'VEHICLE_REGISTRATION', val: 'DDDDDD' },
      { col: 'ECO_SAFE_COMPLETED', val: 0 },
      { col: 'ECO_SAFE_CONTROL', val: 0 },
      { col: 'ECO_SAFE_PLANNING', val: 0 },
      { col: 'PASS_CERTIFICATE', val: 'C4444Q' },
    ];

    expect(mapCommonData(minimalInput)).toEqual(expected);
  });

  it('Should map a fully populated regular test result (fail, automatic, welsh)', () => {
    const input: ResultUpload = {
      uploadKey: {
        applicationReference: 2222113,
        staffNumber: 1122,
        interfaceType: InterfaceType.RSIS,
      },
      testResult: {
        category: 'B',
        id: 'TBC',
        journalData: {
          examiner: {
            staffNumber: '001122',
          },
          testCentre: {
            centreId: 1234,
            costCode: 'CC1',
          },
          testSlotAttributes: {
            slotId: 1234,
            start: '2019-06-10T09:30:00',
            vehicleSlotType: 'B57mins',
            welshTest: true,
            specialNeeds: true,
            extendedTest: true,
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
          communicationMethod: 'Email',
          conductedLanguage: 'Cymraeg',
        },
        preTestDeclarations: {
          insuranceDeclarationAccepted: true,
          residencyDeclarationAccepted: true,
          preTestSignature: '**DUMMY**',
        },
        eyesightTestResult: 'P',
        accompaniment: {
          ADI: true,
          supervisor: true,
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
          debriefWitnessed: true,
          identification: 'Licence',
          weatherConditions: ['Showers', 'Windy'],
          D255: true,
          additionalInformation: 'aaa',
        },
      },
    };

    const expected: DataField[] = [
      { col: 'CHANNEL_INDICATOR', val: ChannelIndicator.MES },
      { col: 'DRIVING_SCHOOL_CANDIDATE', val: 1 },
      { col: 'SPECIAL_NEEDS', val: 1 },
      { col: 'APP_REF_NO', val: 2222113 },
      { col: 'DATE_OF_TEST', val: '19:06:10' },
      { col: 'TIME', val: '09:30' },
      { col: 'DTC_AUTHORITY_CODE', val: 'CC1' },
      { col: 'STAFF_NO', val: '001122' },
      { col: 'TEST_CATEGORY_TYPE', val: 'B' },
      { col: 'AUTOMATIC_TEST', val: 1 },
      { col: 'EXTENDED_TEST', val: 1 },
      { col: 'TEST_TYPE', val: 2 },
      { col: 'ACCOMPANIED_BY_DSA', val: 1 },
      { col: 'ACCOMPANIED_BY_ADI', val: 1 },
      { col: 'ACCOMPANIED_BY_INTERPRETER', val: 0 },
      { col: 'ACCOMPANIED_BY_OTHER', val: 1 },
      { col: 'VISITING_EXAMINER', val: 0 },
      { col: 'SHORT_NOTICE_EXAMINER', val: 0 },
      { col: 'TEST_RESULT', val: ResultIndicator.Fail },
      { col: 'TOTAL_FAULTS', val: 20 },
      { col: 'ROUTE_NUMBER', val: 15 },
      { col: 'EXAMINER_ACTION_VERBAL', val: 1 },
      { col: 'EXAMINER_ACTION_PHYSICAL', val: 1 },
      { col: 'DUAL_CONTROL_IND', val: 1 },
      { col: 'DEBRIEF_GIVEN', val: 1 },
      { col: 'ACTIVITY_CODE', val: 2 },
      { col: 'LICENCE_RECEIVED', val: 0 },
      { col: 'DOB', val: new Date('1974-12-24') }, // DUMMY
      { col: 'CANDIDATE_FORENAMES', val: 'BBBBBB' },
      { col: 'GENDER', val: Gender.Male }, // DUMMY
      { col: 'CANDIDATE_INDIVIDUAL_ID', val: 1111 },
      { col: 'CANDIDATE_POST_CODE', val: 'AA12 3BB' },
      { col: 'CANDIDATE_SURNAME', val: 'AAAAAA' },
      { col: 'CANDIDATE_TITLE', val: 'Mr' },
      { col: 'DRIVER_NUMBER', val: 'AAAAA111111BB9CC' },
      { col: 'EXAMINER_PERSON_ID', val: 1234 },
      { col: 'TEST_CATEGORY_REF', val: 'B' },
      { col: 'TEST_CENTRE_ID', val: 1234 },
      // testCentreName: 'Dummy', // not needed?
      { col: 'VEHICLE_SLOT_TYPE', val: 'B57mins' },
      { col: 'WELSH_FORM_IND', val: Language.Welsh },
      { col: 'ETHNICITY', val: 'A' }, // DUMMY
      { col: 'VEHICLE_REGISTRATION', val: 'DDDDDD' },
      { col: 'ECO_SAFE_COMPLETED', val: 1 },
      { col: 'ECO_SAFE_CONTROL', val: 1 },
      { col: 'ECO_SAFE_PLANNING', val: 1 },
      { col: 'ADI_NUMBER', val: '555555' },
    ];

    expect(mapCommonData(input)).toEqual(expected);
  });

  it('Should map a terminated test result (with defaulted route number, english)', () => {
    const input: ResultUpload = {
      uploadKey: {
        applicationReference: 2222113,
        staffNumber: 1122,
        interfaceType: InterfaceType.RSIS,
      },
      testResult: {
        category: 'B',
        id: 'TBC',
        journalData: {
          examiner: {
            staffNumber: '001122',
          },
          testCentre: {
            centreId: 1234,
            costCode: 'CC1',
          },
          testSlotAttributes: {
            slotId: 1234,
            start: '2019-06-10T12:45:30',
            vehicleSlotType: 'B57mins',
            welshTest: false,
            specialNeeds: false,
            extendedTest: false,
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
        eyesightTestResult: 'P',
        accompaniment: {
          ADI: false,
          supervisor: false,
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
        },
        testSummary: {
          independentDriving: 'Sat nav',
          candidateDescription: 'Short',
          debriefWitnessed: false,
          identification: 'Licence',
          weatherConditions: ['Showers', 'Windy'],
          D255: false,
          additionalInformation: 'aaa',
        },
      },
    };

    const expected: DataField[] = [
      { col: 'CHANNEL_INDICATOR', val: ChannelIndicator.MES },
      { col: 'DRIVING_SCHOOL_CANDIDATE', val: 0 },
      { col: 'SPECIAL_NEEDS', val: 0 },
      { col: 'APP_REF_NO', val: 2222113 },
      { col: 'DATE_OF_TEST', val: '19:06:10' },
      { col: 'TIME', val: '12:45' },
      { col: 'DTC_AUTHORITY_CODE', val: 'CC1' },
      { col: 'STAFF_NO', val: '001122' },
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
      { col: 'TEST_RESULT', val: ResultIndicator.None },
      { col: 'TOTAL_FAULTS', val: 0 },
      { col: 'ROUTE_NUMBER', val: 87 },
      { col: 'EXAMINER_ACTION_VERBAL', val: 0 },
      { col: 'EXAMINER_ACTION_PHYSICAL', val: 0 },
      { col: 'DUAL_CONTROL_IND', val: 0 },
      { col: 'DEBRIEF_GIVEN', val: 1 },
      { col: 'ACTIVITY_CODE', val: 22 },
      { col: 'LICENCE_RECEIVED', val: 0 },
      { col: 'DOB', val: new Date('1974-12-24') }, // DUMMY
      { col: 'CANDIDATE_FORENAMES', val: 'BBBBBB' },
      { col: 'GENDER', val: Gender.Male }, // DUMMY
      { col: 'CANDIDATE_INDIVIDUAL_ID', val: 1111 },
      { col: 'CANDIDATE_POST_CODE', val: 'AA12 3BB' },
      { col: 'CANDIDATE_SURNAME', val: 'AAAAAA' },
      { col: 'CANDIDATE_TITLE', val: 'Mr' },
      { col: 'DRIVER_NUMBER', val: 'AAAAA111111BB9CC' },
      { col: 'EXAMINER_PERSON_ID', val: 1234 },
      { col: 'TEST_CATEGORY_REF', val: 'B' },
      { col: 'TEST_CENTRE_ID', val: 1234 },
      // testCentreName: 'Dummy', // not needed?
      { col: 'VEHICLE_SLOT_TYPE', val: 'B57mins' },
      { col: 'WELSH_FORM_IND', val: Language.English },
      { col: 'ETHNICITY', val: 'A' }, // DUMMY
      { col: 'VEHICLE_REGISTRATION', val: 'DDDDDD' },
      { col: 'ECO_SAFE_COMPLETED', val: 0 },
      { col: 'ECO_SAFE_CONTROL', val: 0 },
      { col: 'ECO_SAFE_PLANNING', val: 0 },
      { col: 'ADI_NUMBER', val: '555555' },
    ];

    expect(mapCommonData(input)).toEqual(expected);
  });

  it('Should reject a test result with missing mandatory data (vehicle reg)', () => {
    const missingMandatory = cloneDeep(minimalInput);
    if (missingMandatory.testResult.vehicleDetails) {
      delete missingMandatory.testResult.vehicleDetails.registrationNumber;
    }

    expect(() => mapCommonData(missingMandatory))
      .toThrow(new MissingTestResultDataError('testResult.vehicleDetails.registrationNumber'));
  });

  it('Should reject a test result with missing mandatory data (gearbox category)', () => {
    const missingMandatory = cloneDeep(minimalInput);
    if (missingMandatory.testResult.vehicleDetails) {
      delete missingMandatory.testResult.vehicleDetails.gearboxCategory;
    }

    expect(() => mapCommonData(missingMandatory))
      .toThrow(new MissingTestResultDataError('testResult.vehicleDetails.gearboxCategory'));
  });

  it('Should reject a test result with missing mandatory data (driver number)', () => {
    const missingMandatory = cloneDeep(minimalInput);
    delete missingMandatory.testResult.journalData.candidate.driverNumber;

    expect(() => mapCommonData(missingMandatory))
      .toThrow(new MissingTestResultDataError('testResult.journalData.candidate.driverNumber'));
  });

  it('Should reject a test result with missing mandatory data (candidate firstname)', () => {
    const missingMandatory = cloneDeep(minimalInput);
    if (missingMandatory.testResult.journalData.candidate.candidateName) {
      delete missingMandatory.testResult.journalData.candidate.candidateName.firstName;
    }
    expect(() => mapCommonData(missingMandatory))
      .toThrow(new MissingTestResultDataError('testResult.journalData.candidate.candidateName.firstName'));
  });

  it('Should reject a test result with missing mandatory data (language)', () => {
    const missingMandatory = cloneDeep(minimalInput);
    if (missingMandatory.testResult.communicationPreferences) {
      delete missingMandatory.testResult.communicationPreferences.conductedLanguage;
    }
    expect(() => mapCommonData(missingMandatory))
      .toThrow(new MissingTestResultDataError('testResult.communicationPreferences.conductedLanguage'));
  });

  it('Should reject a test result with invalid data (unsupported test category)', () => {
    const invalidResult = cloneDeep(minimalInput);
    invalidResult.testResult.category = 'XYZ';

    expect(() => mapCommonData(invalidResult)).toThrow(new Error('Unsupported test category XYZ'));
  });
});
