import { ResultUpload } from '../../../../../result-client';
import { merge } from 'lodash';

export function getADI3FullyPopulated(minimal: any): ResultUpload {
  const additionalFields = {
    testResult: {
      testData: {
        review: {
          grade: 'A',
          feedback: 'Feedback',
          seekFurtherDevelopment: true,
        },
        lessonAndTheme: {
          other: 'Other theme',
          lessonThemes: [
            'junctions',
            'townCityDriving',
          ],
          studentLevel: 'beginner',
        },
        lessonPlanning: {
          q1: {
            score: 3,
          },
          q2: {
            score: 3,
          },
          q3: {
            score: 3,
          },
          q4: {
            score: 3,
          },
          score: 12,
        },
        riskManagement: {
          q1: {
            score: 3,
          },
          q2: {
            score: 3,
          },
          q3: {
            score: 3,
          },
          q4: {
            score: 3,
          },
          q5: {
            score: 3,
          },
          score: 15,
        },
        teachingLearningStrategies: {
          q1: {
            score: 3,
          },
          q2: {
            score: 3,
          },
          q3: {
            score: 3,
          },
          q4: {
            score: 3,
          },
          q5: {
            score: 3,
          },
          q6: {
            score: 3,
          },
          q7: {
            score: 3,
          },
          q8: {
            score: 3,
          },
          score: 24,
        },
      },
      activityCode: '1',
      accompaniment: {
        trainer: true,
        supervisor: true,
      },
      passCompletion: {},
      trainerDetails: {
        pdiLogbook: true,
        traineeLicence: true,
        orditTrainedCandidate: true,
        trainerRegistrationNumber: 12345,
      },
      vehicleDetails: {
        dualControls: true,
        gearboxCategory: 'Manual',
        registrationNumber: 'ABC123',
      },
      preTestDeclarations: {
        insuranceDeclarationAccepted: true,
      },
      communicationPreferences: {
        updatedEmail: 'test@test',
        conductedLanguage: 'English',
        communicationMethod: 'Email',
      },
    },
  };
  return merge(minimal, additionalFields);
}
