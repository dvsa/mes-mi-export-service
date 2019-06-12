import { cloneDeep } from 'lodash';
import { mapDataForMIExport, MissingTestResultDataError } from '../data-mapper';
import {
  MIExportTestResult,
  ChannelIndicator,
  Language,
  ResultIndicator,
  Gender,
} from '../../domain/mi-export-data';
import { InterfaceType, ResultUpload } from '../../application/result-client';

describe('mapDataForMIExport', () => {

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

  it('Should map a minially populated regular test result (pass, manual)', () => {
    const expected: MIExportTestResult = {
      channelIndicator: ChannelIndicator.MES,
      drivingSchoolCar: 0,
      d255: 0,
      applicationReference: 2222113,
      testDate: '19:06:10',
      testTime: '09:30',
      testCentreCostCode: 'CC1',
      staffNumber: '001122',
      testCategory: 'B',
      automatic: 0,
      extended: 0,
      testType: 2,
      instructorPRN: null,
      supervisorAccompanied: 0,
      instructorAccompanied: 0,
      interpreterAccompanied: 0,
      otherAccompanied: 0,
      visitingExaminer: 0,
      change: 0,
      // TODO: 1a eyesight .. element 5 - C
      result: ResultIndicator.Pass,
      totalFaults: 10,
      route: 15,
      etaVerbal: 0,
      etaPhysical: 0,
      dualControls: 0,
      ecoAssessed: 0,
      ecoControl: 0,
      ecoPlanning: 0,
      debriefGiven: 1,
      activityCode: 1,
      passCertificateNumber: 'C4444Q',
      licenseReceived: 1,
      candidateDOB: new Date('1974-12-24'), // DUMMY
      candidateForenames: 'BBBBBB',
      candidateGender: Gender.Male, // DUMMY
      candidateIndividualId: 1111,
      candidatePostCode: 'AA12 3BB',
      candidateSurname: 'AAAAAA',
      candidateTitle: 'Mr',
      driverNumber: 'AAAAA111111BB9CC',
      examinerIndividualId: 1234,
      bookedTestCategory: 'B',
      testCentreId: 1234,
      testCentreName: 'Dummy', // not needed?
      vehicleSlotType: 'B57mins',
      language: Language.English, // DUMMY
      ethnicityCode: 'A', // DUMMY
      vehicleRegistration: 'DDDDDD',
    };

    expect(mapDataForMIExport(minimalInput)).toEqual(expected);
  });

  it('Should map a fully populated regular test result (fail, automatic)', () => {
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
          conductedLanguage: 'English',
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

    const expected: MIExportTestResult = {
      channelIndicator: ChannelIndicator.MES,
      drivingSchoolCar: 1,
      d255: 1,
      applicationReference: 2222113,
      testDate: '19:06:10',
      testTime: '09:30',
      testCentreCostCode: 'CC1',
      staffNumber: '001122',
      testCategory: 'B',
      automatic: 1,
      extended: 1,
      testType: 2,
      instructorPRN: '555555',
      supervisorAccompanied: 1,
      instructorAccompanied: 1,
      interpreterAccompanied: 0, // missing
      otherAccompanied: 1,
      visitingExaminer: 0,
      change: 0,
      // TODO: 1a eyesight .. element 5 - C
      result: ResultIndicator.Fail,
      totalFaults: 20,
      route: 15,
      etaVerbal: 1,
      etaPhysical: 1,
      dualControls: 1,
      ecoAssessed: 1,
      ecoControl: 1,
      ecoPlanning: 1,
      debriefGiven: 1,
      activityCode: 2,
      passCertificateNumber: null,
      licenseReceived: 0,
      candidateDOB: new Date('1974-12-24'), // DUMMY
      candidateForenames: 'BBBBBB',
      candidateGender: Gender.Male, // DUMMY
      candidateIndividualId: 1111,
      candidatePostCode: 'AA12 3BB',
      candidateSurname: 'AAAAAA',
      candidateTitle: 'Mr',
      driverNumber: 'AAAAA111111BB9CC',
      examinerIndividualId: 1234,
      bookedTestCategory: 'B',
      testCentreId: 1234,
      testCentreName: 'Dummy', // not needed?
      vehicleSlotType: 'B57mins',
      language: Language.English, // DUMMY
      ethnicityCode: 'A', // DUMMY
      vehicleRegistration: 'DDDDDD',
    };

    expect(mapDataForMIExport(input)).toEqual(expected);
  });

  it('Should map a terminated test result (with defaulted route number)', () => {
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

    const expected: MIExportTestResult = {
      channelIndicator: ChannelIndicator.MES,
      drivingSchoolCar: 0,
      d255: 0,
      applicationReference: 2222113,
      testDate: '19:06:10',
      testTime: '12:45',
      testCentreCostCode: 'CC1',
      staffNumber: '001122',
      testCategory: 'B',
      automatic: 0,
      extended: 0,
      testType: 2,
      instructorPRN: '555555',
      supervisorAccompanied: 0,
      instructorAccompanied: 0,
      interpreterAccompanied: 0, // missing
      otherAccompanied: 0,
      visitingExaminer: 0,
      change: 0,
      // TODO: 1a eyesight .. element 5 - C
      result: ResultIndicator.None,
      totalFaults: 0,
      route: 87,
      etaVerbal: 0,
      etaPhysical: 0,
      dualControls: 0,
      ecoAssessed: 0,
      ecoControl: 0,
      ecoPlanning: 0,
      debriefGiven: 1,
      activityCode: 22,
      passCertificateNumber: null,
      licenseReceived: 0,
      candidateDOB: new Date('1974-12-24'), // DUMMY
      candidateForenames: 'BBBBBB',
      candidateGender: Gender.Male, // DUMMY
      candidateIndividualId: 1111,
      candidatePostCode: 'AA12 3BB',
      candidateSurname: 'AAAAAA',
      candidateTitle: 'Mr',
      driverNumber: 'AAAAA111111BB9CC',
      examinerIndividualId: 1234,
      bookedTestCategory: 'B',
      testCentreId: 1234,
      testCentreName: 'Dummy', // not needed?
      vehicleSlotType: 'B57mins',
      language: Language.English, // DUMMY
      ethnicityCode: 'A', // DUMMY
      vehicleRegistration: 'DDDDDD',
    };

    expect(mapDataForMIExport(input)).toEqual(expected);
  });

  it('Should reject a test result with missing mandatory data (vehicle reg)', () => {
    const missingMandatory = cloneDeep(minimalInput);
    if (missingMandatory.testResult.vehicleDetails) {
      delete missingMandatory.testResult.vehicleDetails.registrationNumber;
    }

    expect(() => mapDataForMIExport(missingMandatory))
      .toThrow(new MissingTestResultDataError('testResult.vehicleDetails.registrationNumber'));
  });

  it('Should reject a test result with missing mandatory data (gearbox category)', () => {
    const missingMandatory = cloneDeep(minimalInput);
    if (missingMandatory.testResult.vehicleDetails) {
      delete missingMandatory.testResult.vehicleDetails.gearboxCategory;
    }

    expect(() => mapDataForMIExport(missingMandatory))
      .toThrow(new MissingTestResultDataError('testResult.vehicleDetails.gearboxCategory'));
  });

  it('Should reject a test result with missing mandatory data (driver number)', () => {
    const missingMandatory = cloneDeep(minimalInput);
    delete missingMandatory.testResult.journalData.candidate.driverNumber;

    expect(() => mapDataForMIExport(missingMandatory))
      .toThrow(new MissingTestResultDataError('testResult.journalData.candidate.driverNumber'));
  });

  it('Should reject a test result with missing mandatory data (candidate firstname)', () => {
    const missingMandatory = cloneDeep(minimalInput);
    if (missingMandatory.testResult.journalData.candidate.candidateName) {
      delete missingMandatory.testResult.journalData.candidate.candidateName.firstName;
    }
    expect(() => mapDataForMIExport(missingMandatory))
      .toThrow(new MissingTestResultDataError('testResult.journalData.candidate.candidateName.firstName'));
  });

  it('Should reject a test result with invalid data (unsupported test category)', () => {
    const invalidResult = cloneDeep(minimalInput);
    invalidResult.testResult.category = 'XYZ';

    expect(() => mapDataForMIExport(invalidResult)).toThrow(new Error('Unsupported test category XYZ'));
  });
});
