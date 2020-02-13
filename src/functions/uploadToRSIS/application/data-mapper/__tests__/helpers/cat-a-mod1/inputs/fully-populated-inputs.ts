import { ResultUpload } from '../../../../../result-client';

export function getCatAM1FullyPopulatedDrivingFaults(result: any): ResultUpload {
  return {
    ...result,
    testResult: {
      testData: {
        singleFaultCompetencies: {},
        drivingFaults: {
          precautions: 1,
          moveOffSafety: 1,
          moveOffControl: 1,
        },
        dangerousFaults: {},
        seriousFaults: {},
        emergencyStop: {
          speedNotMetSeriousFault: false,
          firstAttempt: 50,
        },
        avoidance: {
          speedNotMetSeriousFault: false,
          firstAttempt: 50,
        },
        ETA: {},
      },
      testSummary: {
        routeNumber: 88,
      },
    },
  };
}

export function getCatAM1FullyPopulatedSeriousFaults(result: any): ResultUpload {
  return {
    ...result,
    testResult: {
      testData: {
        singleFaultCompetencies: {},
        drivingFaults: {},
        dangerousFaults: {},
        seriousFaults: {
          precautions: true,
          moveOffSafety: true,
          moveOffControl: true,
        },
        emergencyStop: {
          speedNotMetSeriousFault: false,
          firstAttempt: 50,
        },
        avoidance: {
          speedNotMetSeriousFault: false,
          firstAttempt: 50,
        },
        ETA: {},
      },
      testSummary: {
        routeNumber: 88,
      },
    },
  };
}

export function getCatAM1FullyPopulatedDangerousFaults(result: any): ResultUpload {
  return {
    ...result,
    testResult: {
      testData: {
        singleFaultCompetencies: {},
        drivingFaults: {},
        dangerousFaults: {
          precautions: true,
          moveOffSafety: true,
          moveOffControl: true,
        },
        seriousFaults: {},
        emergencyStop: {
          speedNotMetSeriousFault: false,
          firstAttempt: 50,
        },
        avoidance: {
          speedNotMetSeriousFault: false,
          firstAttempt: 50,
        },
        ETA: {},
      },
      testSummary: {
        routeNumber: 88,
      },
    },
  };
}

export function getCatAM1FullyPopulatedSingleFaultCompetencies(result: any): ResultUpload {
  return {
    ...result,
    testResult: {
      testData: {
        singleFaultCompetencies: {
          useOfStand: 'D',
          manualHandling: 'S',
          slalom: 'DF',
          slowControl: 'DF',
          uTurn: 'S',
          controlledStop: 'D',
        },
        drivingFaults: {},
        dangerousFaults: {},
        seriousFaults: {},
        emergencyStop: {
          speedNotMetSeriousFault: false,
          outcome: 'DF',
        },
        avoidance: {
          speedNotMetSeriousFault: false,
          outcome: 'DF',
        },
        ETA: {},
      },
      testSummary: {
        routeNumber: 88,
        circuit: 'Left',
      },
    },
  };
}

export function getManoeuvresByOutcomeSeverity(severityShortCode: String) {
  return {
    reverseLeft: {
      selected: true,
      controlFault: severityShortCode,
      controlFaultComments: 'reverse left control',
      observationFault: severityShortCode,
      observationFaultComments: 'reverse left observation',
    },
  };
}

export function getUncoupleRecouple(severityShortCode: String) {
  return {
    selected: true,
    fault: severityShortCode,
    faultComments: 'uncouple recouple',
  };
}

export function getEyesightTestBySeverityOutcome(isComplete: boolean, isSerious: boolean, severityText: String = '') {
  return {
    complete: isComplete,
    seriousFault: isSerious,
    faultComments: isSerious ? `eyesight ${severityText}` : undefined,
  };
}
