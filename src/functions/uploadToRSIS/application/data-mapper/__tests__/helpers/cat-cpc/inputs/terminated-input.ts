import { InterfaceType, ResultUpload } from '../../../../../result-client';

export function getTerminatedCatCPCTest() {
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
    autosaved: 0, // false
    testResult: {
      rekey: false,
      version: '3.25.1',
      category: 'CCPC',
      testData: {
        question1: {
          score: 0,
          additionalItems: [],
        },
        question2: {
          score: 0,
          additionalItems: [],
        },
        question3: {
          score: 0,
          additionalItems: [],
        },
        question4: {
          score: 0,
          additionalItems: [],
        },
        question5: {
          score: 0,
          additionalItems: [],
        },
        totalPercent: 0,
      },
      journalData: {
        examiner: {
          staffNumber: '10000012',
          individualId: 1000012,
        },
        candidate: {
          prn: 9283749,
          gender: 'F',
          candidateId: 200,
          dateOfBirth: '1989-01-01',
          driverNumber: 'PEARS123456789DO',
          candidateName: {
            title: 'Miss',
            lastName: 'Aniston',
            firstName: 'Jennifer',
          },
          ethnicityCode: 'D',
          mobileTelephone: '07654 123456',
          candidateAddress: {
            postcode: 'PO57 0DE',
            addressLine1: 'Address Line 1',
            addressLine2: 'Address Line 2',
            addressLine3: 'Address Line 3',
            addressLine4: 'Address Line 4',
            addressLine5: 'Address Line 5',
          },
          previousADITests: 2,
          primaryTelephone: '01234 567890',
          secondaryTelephone: '04321 098765',
        },
        testCentre: {
          centreId: 54321,
          costCode: 'EXTC1',
          centreName: 'Example Test Centre',
        },
        testSlotAttributes: {
          start: '2020-06-23T08:00:00',
          slotId: 1185,
          slotType: 'Standard Test',
          welshTest: false,
          extendedTest: false,
          specialNeeds: false,
          vehicleTypeCode: 'C',
          entitlementCheck: false,
          examinerVisiting: false,
          specialNeedsCode: 'NONE',
          specialNeedsArray: [
            'None',
          ],
          previousCancellation: [
            'Act of nature',
          ],
        },
        applicationReference: {
          checkDigit: 1,
          applicationId: 22123466,
          bookingSequence: 1,
        },
      },
      rekeyReason: {
        other: {
          reason: '',
          selected: false,
        },
        transfer: {
          selected: false,
        },
        ipadIssue: {
          lost: false,
          broken: false,
          stolen: false,
          selected: false,
          technicalFault: false,
        },
      },
      testSummary: {
        D255: false,
        identification: 'Licence',
        assessmentReport: 'Bfbfg',
        candidateDescription: 'Bfhfgfg',
      },
      activityCode: '4',
      changeMarker: false,
      accompaniment: {},
      examinerKeyed: 10000012,
      examinerBooked: 10000012,
      vehicleDetails: {},
      examinerConducted: 10000012,
      preTestDeclarations: {
        preTestSignature: '',
        insuranceDeclarationAccepted: true,
        residencyDeclarationAccepted: true,
      },
      postTestDeclarations: {
        postTestSignature: '',
        healthDeclarationAccepted: false,
        passCertificateNumberReceived: false,
      },
      communicationPreferences: {
        updatedEmail: '',
        conductedLanguage: 'English',
        communicationMethod: 'Not provided',
      },
    },
  };
}
