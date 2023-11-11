import { ResultUpload, InterfaceType } from '../../../../result-client';

export function getCatADI3MinimalInput(): ResultUpload {
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
      version: '3.39.3',
      category: 'ADI3',
      testData: {
        review: {},
        lessonAndTheme: {
          lessonThemes: [],
        },
        lessonPlanning: {
          q1: {
            title: 'Did the trainer identify the pupils learning goals and needs?',
          },
          q2: {
            title: 'Was the agreed lesson structure appropriate for the pupil\'s experience and ability?',
          },
          q3: {
            title: 'Were the practice areas suitable?',
          },
          q4: {
            title: 'Was the lesson plan adapted, when appropriate' +
              ', to help the pupil work towards their learning goals?',
          },
          score: 0,
        },
        riskManagement: {
          q1: {
            title: 'Did the trainer ensure that the pupil' +
              'fully understood how the responsibility for risk would be shared?',
          },
          q2: {
            title: 'Were directions and instructions given to the pupil clear and given in good time?',
          },
          q3: {
            title: 'Was the trainer aware of the surroundings and the pupils actions?',
          },
          q4: {
            title: 'Was there any verbal or physical intervention by the trainer timely and appropriate?',
          },
          q5: {
            title: 'Was sufficient feedback given to help' +
              'the pupil understand any potential safety critical incidents?',
          },
          score: 0,
        },
        teachingLearningStrategies: {
          q1: {
            title: 'Was the teaching style suited to the pupils learning style and current ability?',
          },
          q2: {
            title: 'Was the pupil encouraged to analyse problems and take responsibility for their learning?',
          },
          q3: {
            title: 'Were opportunities and examples used to clarify learning outcomes?',
          },
          q4: {
            title: 'Was the technical information given comprehensive, appropriate and accurate?',
          },
          q5: {
            title: 'Was the pupil given appropriate and timely feedback during the session?',
          },
          q6: {
            title: 'Were the pupils queries followed up and answered?',
          },
          q7: {
            title: 'Did the trainer maintain an appropriate non-discriminatory manner throughout the session?',
          },
          q8: {
            title: 'At then end of the session - was the pupil encouraged to reflect on their own performance?',
          },
          score: 0,
        },
      },
      appVersion: '4.5.0.0',
      journalData: {
        examiner: {
          staffNumber: '10000013',
          individualId: 1000013,
        },
        candidate: {
          prn: 4405399,
          gender: 'M',
          candidateId: 1125,
          dateOfBirth: '1987-07-27',
          driverNumber: 'WHEEL123456789DO',
          candidateName: {
            title: 'Mr',
            lastName: 'Wheeler',
            firstName: 'Mike',
          },
          ethnicityCode: 'D',
          mobileTelephone: '07654 123456',
          candidateAddress: {
            postcode: 'PO57 0DE',
            addressLine1: 'Address Line 1',
            addressLine2: 'Address Line 2',
          },
          previousADITests: 2,
          primaryTelephone: '01234 567890',
          secondaryTelephone: '04321 098765',
        },
        testCentre: {
          centreId: 54000,
          costCode: 'ITC1',
          centreName: 'Isolated test centre',
        },
        testSlotAttributes: {
          start: '2022-08-23T16:00:00',
          slotId: 2436,
          slotType: 'Standard Test',
          welshTest: false,
          extendedTest: false,
          specialNeeds: false,
          vehicleTypeCode: 'C',
          entitlementCheck: true,
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
          checkDigit: 3,
          applicationId: 23123428,
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
        debriefWitnessed: false,
      },
      activityCode: '34',
      changeMarker: false,
      accompaniment: {},
      delegatedTest: false,
      examinerKeyed: 10000013,
      examinerBooked: 10000013,
      trainerDetails: {},
      vehicleDetails: {
        registrationNumber: '',
      },
      examinerConducted: 10000013,
      preTestDeclarations: {
        preTestSignature: '',
        insuranceDeclarationAccepted: false,
        residencyDeclarationAccepted: false,
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
    autosaved: 0, // false
  };
}
