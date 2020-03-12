import { ResultUpload } from '../../../../../result-client';

export function getCatAM1FullyPopulatedDrivingFaults(result: any): ResultUpload {
  return {
    ...result,
    testResult: {
      preTestDeclarations: {
        insuranceDeclarationAccepted: true,
        residencyDeclarationAccepted: true,
        preTestSignature: '**DUMMY**',
        DL196CBTCertNumber: '123456',
      },
      testData: {
        singleFaultCompetencies: {},
        drivingFaults: {
          precautions: 5,
          moveOffSafety: 3,
          moveOffControl: 2,
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
      preTestDeclarations: {
        insuranceDeclarationAccepted: true,
        residencyDeclarationAccepted: true,
        preTestSignature: '**DUMMY**',
        DL196CBTCertNumber: '123456',
      },
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
      preTestDeclarations: {
        insuranceDeclarationAccepted: true,
        residencyDeclarationAccepted: true,
        preTestSignature: '**DUMMY**',
        DL196CBTCertNumber: '123456',
      },
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
      preTestDeclarations: {
        insuranceDeclarationAccepted: true,
        residencyDeclarationAccepted: true,
        preTestSignature: '**DUMMY**',
        DL196CBTCertNumber: '123456',
      },
      testData: {
        singleFaultCompetencies: {
          useOfStand: 'D',
          manualHandling: 'S',
          slalom: 'DF',
          slowControl: 'DF',
          uTurn: 'S',
          controlledStop: 'D',
          avoidance: 'DF',
          avoidanceComments: 'fell off',
          emergencyStopComments: 'skid',
        },
        drivingFaults: {},
        dangerousFaults: {},
        seriousFaults: {},
        emergencyStop: {
          outcome: 'S',
          comments: 'min',
          firstAttempt: 31,
          secondAttempt: 32,
        },
        avoidance: {
          outcome: 'S',
          comments: 'min',
          firstAttempt: 33,
          secondAttempt: 34,
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
