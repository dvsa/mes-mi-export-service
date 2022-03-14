import { ResultUpload } from '../../../../../result-client';
import { SeverityShortCodes, IndependentDrivingText } from '../../enums/function-params';
import { CatCMUniqueTypes } from '@dvsa/mes-test-schema/categories/CM';

export function getFullyPopulatedExtendedSeriousFaults(result: any): ResultUpload {
  return {
    ...result,
    testResult: {
      category: result.testResult.category,
      testData: {
        uncoupleRecouple: getUncoupleRecoupleByOutcomeSeverity(SeverityShortCodes.SeriousFault),
        manoeuvres: getManoeuvresByOutcomeSeverity(SeverityShortCodes.SeriousFault),
      },
      testSummary: getTestSummary(IndependentDrivingText.TrafficSigns),
    } as CatCMUniqueTypes.TestResult,
  };
}

export function getFullyPopulatedExtendedDangerousFaults(result: any): ResultUpload {
  return {
    ...result,
    testResult: {
      category: result.testResult.category,
      testData: {
        uncoupleRecouple: getUncoupleRecoupleByOutcomeSeverity(SeverityShortCodes.DangerousFault),
        manoeuvres: getManoeuvresByOutcomeSeverity(SeverityShortCodes.DangerousFault),
      },
      testSummary: getTestSummary(IndependentDrivingText.NotApplicable),
    },
  };
}

export function getFullyPopulatedSeriousFaults(result: any): ResultUpload {
  return {
    ...result,
    testResult: {
      category: result.testResult.category,
      testData: {
        manoeuvres: getManoeuvresByOutcomeSeverity(SeverityShortCodes.SeriousFault),
      },
      testSummary: getTestSummary(IndependentDrivingText.TrafficSigns),
    } as CatCMUniqueTypes.TestResult,
  };
}

export function getFullyPopulatedDangerousFaults(result: any): ResultUpload {
  return {
    ...result,
    testResult: {
      category: result.testResult.category,
      testData: {
        manoeuvres: getManoeuvresByOutcomeSeverity(SeverityShortCodes.DangerousFault),
      },
      testSummary: getTestSummary(IndependentDrivingText.NotApplicable),
    },
  };
}

export function getManoeuvresByOutcomeSeverity(severityShortCode: string) {
  return {
    reverseManoeuvre: {
      selected: true,
      controlFault: severityShortCode,
      controlFaultComments: 'reverse left control',
      observationFault: severityShortCode,
      observationFaultComments: 'reverse left observation',
    },
  };
}

export function getUncoupleRecoupleByOutcomeSeverity(severityShortCode: 'DF' | 'S' | 'D') {
  return {
    fault: severityShortCode,
    faultComments: 'uncouple recouple serious fault comment',
    selected: true,
  };
}

export function getTestSummary(independentDrivingText: String) {
  return {
    independentDriving: `${independentDrivingText}`,
  };
}
