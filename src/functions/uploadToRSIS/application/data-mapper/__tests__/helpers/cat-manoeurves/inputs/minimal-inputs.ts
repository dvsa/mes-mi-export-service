import { ResultUpload, InterfaceType } from '../../../../../result-client';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { TestResultSchemasUnion } from '@dvsa/mes-test-schema/categories';

export function getMinimalInput(subCategory: TestCategory): ResultUpload {
  return {
    uploadKey: {
      applicationReference: {
        applicationId: 2222,
        bookingSequence: 11,
        checkDigit: 3,
      },
      staffNumber: '1122',
      interfaceType: InterfaceType.RSIS,
    },
    testResult: {
      version: '0.0.1',
      category: subCategory,
      rekey: false,
      changeMarker: false,
      examinerBooked: 12345678,
      examinerConducted: 12345678,
      examinerKeyed: 12345678,
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
          vehicleTypeCode: 'C',
          welshTest: false,
          specialNeeds: false,
          extendedTest: false,
        },
        candidate: {},
        applicationReference: {
          applicationId: 2222,
          bookingSequence: 11,
          checkDigit: 3,
        },
      },
      activityCode: '22',
    },
    autosaved: 0, // false
  };
}

export function getMinimalInputWithPassCompletion(subCategory: TestCategory): ResultUpload {
  return {
    uploadKey: {
      applicationReference: {
        applicationId: 2222,
        bookingSequence: 11,
        checkDigit: 3,
      },
      staffNumber: '1122',
      interfaceType: InterfaceType.RSIS,
    },
    testResult: {
      rekey: false,
      version: '3.38.1',
      category: subCategory,
      testData: {
        ETA: {},
        eco: {},
        drivingFaults: {},
        seriousFaults: {},
        dangerousFaults: {},
        testRequirements: {},
        manoeuvres: {
          reverseManoeuvre: {
            selected: true,
            controlFault: 'S',
            observationFault: 'D',
            controlFaultComments: 'C',
            observationFaultComments: 'A',
          },
        },
        uncoupleRecouple: { fault: 'D', selected: true, faultComments: 'B' },
      },
      appVersion: '4.1.1.4',
      journalData: {
        examiner: { staffNumber: '10000014', individualId: 1000014 },
        candidate: {
          gender: 'M',
          candidateId: 4445,
          dateOfBirth: '1982-06-25',
          businessName: 'Caladan Enterprises',
          driverNumber: 'CATCM22222222205',
          candidateName: { title: 'Mr', lastName: 'Rautha', firstName: 'Feyd' },
          ethnicityCode: 'D',
          businessAddress: { postcode: 'FR1 1MN', addressLine1: '123 Arrakin Road' },
          mobileTelephone: '(951) 401-3627',
          candidateAddress: {
            postcode: 'AR01 0IS',
            addressLine1: '111 Desert Boulevard',
            addressLine2: 'Arrakeen',
            addressLine3: 'Imperial Basin',
            addressLine4: 'The Funeral Plain',
            addressLine5: 'Arrakis',
          },
          primaryTelephone: '(861) 453-3422',
          businessTelephone: '07777777777',
          secondaryTelephone: '(979) 526-2534',
        },
        testCentre: { centreId: 54321, costCode: 'EXTC1', centreName: 'Example Test Centre' },
        testSlotAttributes: {
          start: '2022-03-10T09:00:00',
          slotId: 5555,
          slotType: 'Standard Test',
          welshTest: false,
          extendedTest: false,
          specialNeeds: false,
          vehicleTypeCode: 'LM',
          entitlementCheck: false,
          examinerVisiting: false,
          specialNeedsCode: 'NONE',
          specialNeedsArray: ['None'],
        },
        applicationReference: { checkDigit: 4, applicationId: 55512305, bookingSequence: 1 },
      },
      rekeyReason: {
        other: { reason: '', selected: false },
        transfer: { selected: false },
        ipadIssue: { lost: false, broken: false, stolen: false, selected: false, technicalFault: false },
      },
      testSummary: {
        D255: false,
        identification: 'Passport',
        debriefWitnessed: true,
        weatherConditions: ['Showers'],
        trueLikenessToPhoto: false,
        candidateDescription: 'Tall',
      },
      activityCode: '2',
      changeMarker: false,
      accompaniment: { ADI: true, supervisor: true },
      delegatedTest: false,
      examinerKeyed: 10000014,
      examinerBooked: 10000014,
      vehicleDetails: {
        vehicleWidth: 6,
        numberOfSeats: 4,
        vehicleHeight: 3,
        vehicleLength: 6,
        registrationNumber: 'B',
      },
      examinerConducted: 10000014,
      preTestDeclarations: {
        // eslint-disable-next-line max-len
        preTestSignature: 'data:image/png;base64,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QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAYOIH/B3LaLiNHAkhLAAAAAElFTkSuQmCC',
        candidateDeclarationSigned: false,
        insuranceDeclarationAccepted: true,
        residencyDeclarationAccepted: true,
      },
      postTestDeclarations: {
        postTestSignature: '',
        healthDeclarationAccepted: false,
        passCertificateNumberReceived: false,
      },
      communicationPreferences: { updatedEmail: '', conductedLanguage: 'English', communicationMethod: 'Post' },
    } as TestResultSchemasUnion,
    autosaved: 0, // false
  };
}
