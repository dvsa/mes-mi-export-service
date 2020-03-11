import { ResultUpload } from '../../../../../result-client';
import { SeverityText, IndependentDrivingText } from '../../enums/function-params';

export function getFullyPopulatedDrivingFaults(result: any): ResultUpload {
  return {
    ...result,
    testResult: {
      testData: {
        testRequirements: {
          normalStart1: true,
          normalStart2: true,
          angledStart: true,
          hillStart: true,
        },
        drivingFaults: {
          controlsThrottle: 1,
          controlsThrottleComments: 'controlsThrottleComments',
          controlsClutch: 2,
          controlsClutchComments: 'controlsClutchComments',
          controlsGears: 3,
          controlsGearsComments: 'controlsGearsComments',
          controlsFrontBrake: 4,
          controlsFrontBrakeComments: 'controlsFrontBrakeComments',
          controlsRearBrake: 5,
          controlsRearBrakeComments: 'controlsRearBrakeComments',
          controlsSteering: 6,
          controlsSteeringComments: 'controlsSteeringComments',
          controlsBalanceSlowControl: 7,
          controlsBalanceSlowControlComments: 'controlsBalanceSlowControlComments',
          ancillaryControls: 8,
          ancillaryControlsComments: 'ancillaryControlsComments',
          precautions: 9,
          precautionsComments: 'precautionsComments',
          moveOffSafety: 10,
          moveOffSafetyComments: 'moveOffSafetyComments',
          moveOffControl: 11,
          moveOffControlComments: 'moveOffControlComments',
          useOfMirrorsSignalling: 12,
          useOfMirrorsSignallingComments: 'useOfMirrorsSignallingComments',
          useOfMirrorsChangeDirection: 13,
          useOfMirrorsChangeDirectionComments: 'useOfMirrorsChangeDirectionComments',
          useOfMirrorsChangeSpeed: 14,
          useOfMirrorsChangeSpeedComments: 'useOfMirrorsChangeSpeedComments',
          signalsNecessary: 15,
          signalsNecessaryComments: 'signalsNecessaryComments',
          signalsCorrectly: 16,
          signalsCorrectlyComments: 'signalsCorrectlyComments',
          signalsTimed: 17,
          signalsTimedComments: 'signalsTimedComments',
          junctionsApproachSpeed: 18,
          junctionsApproachSpeedComments: 'junctionsApproachSpeedComments',
          junctionsObservation: 19,
          junctionsObservationComments: 'junctionsObservationComments',
          junctionsTurningRight: 20,
          junctionsTurningRightComments: 'junctionsTurningRightComments',
          junctionsTurningLeft: 21,
          junctionsTurningLeftComments: 'junctionsTurningLeftComments',
          junctionsCuttingCorners: 22,
          junctionsCuttingCornersComments: 'junctionsCuttingCornersComments',
          judgementOvertaking: 23,
          judgementOvertakingComments: 'judgementOvertakingComments',
          judgementMeeting: 24,
          judgementMeetingComments: 'judgementMeetingComments',
          judgementCrossing: 25,
          judgementCrossingComments: 'judgementCrossingComments',
          positioningNormalDriving: 26,
          positioningNormalDrivingComments: 'positioningNormalDrivingComments',
          positioningLaneDiscipline: 27,
          positioningLaneDisciplineComments: 'positioningLaneDisciplineComments',
          clearanceOrObstructions: 28,
          clearanceOrObstructionsComments: 'clearanceOrObstructionsComments',
          followingDistance: 29,
          followingDistanceComments: 'followingDistanceComments',
          useOfSpeed: 30,
          useOfSpeedComments: 'useOfSpeedComments',
          progressAppropriateSpeed: 31,
          progressAppropriateSpeedComments: 'progressAppropriateSpeedComments',
          progressUndueHesitation: 32,
          progressUndueHesitationComments: 'progressUndueHesitationComments',
          responseToSignsTrafficSigns: 33,
          responseToSignsTrafficSignsComments: 'responseToSignsTrafficSignsComments',
          responseToSignsRoadMarkings: 34,
          responseToSignsRoadMarkingsComments: 'responseToSignsRoadMarkingsComments',
          responseToSignsTrafficLights: 35,
          responseToSignsTrafficLightsComments: 'responseToSignsTrafficLightsComments',
          responseToSignsTrafficControllers: 36,
          responseToSignsTrafficControllersComments: 'responseToSignsTrafficControllersComments',
          responseToSignsOtherRoadUsers: 37,
          responseToSignsOtherRoadUsersComments: 'responseToSignsOtherRoadUsersComments',
          pedestrianCrossings: 38,
          pedestrianCrossingsComments: 'pedestrianCrossingsComments',
          positionNormalStops: 39,
          positionNormalStopsComments: 'positionNormalStopsComments',
          awarenessPlanning: 40,
          awarenessPlanningComments: 'awarenessPlanningComments',
          bends: 41,
          bendsComments: 'bendsComments',
        },
        eyesightTest: {
          complete: true,
        },
      },
      testSummary: getTestSummary(IndependentDrivingText.SatNav),
    },
  };
}

export function getFullyPopulatedSeriousFaults(result: any): ResultUpload {
  return {
    ...result,
    testResult: {
      testData: {
        testRequirements: {
          normalStart1: true,
          normalStart2: true,
          angledStart: true,
          hillStart: true,
        },
        seriousFaults: getFaultsByOutcomeSeverity(SeverityText.Serious),
        eyesightTest: getEyesightTestBySeverityOutcome(true, true, SeverityText.Serious),
      },
      testSummary: getTestSummary(IndependentDrivingText.TrafficSigns),
    },
  };
}

export function getFullyPopulatedDangerousFaults(result: any): ResultUpload {
  return {
    ...result,
    testResult: {
      testData: {
        testRequirements: {
          normalStart1: true,
          normalStart2: true,
          angledStart: true,
          hillStart: true,
        },
        dangerousFaults: getFaultsByOutcomeSeverity(SeverityText.Dangerous),
        eyesightTest: getEyesightTestBySeverityOutcome(false, false),
      },
      testSummary: getTestSummary(IndependentDrivingText.NotApplicable),
    },
  };
}

// export function getVehicleChecksByOutcomeSeverity(severityShortCode: String, severityText: String) {
//   return {
//     tellMeQuestion: {
//       code: 'T1',
//       description: 'First Tell Me Question',
//       outcome: severityShortCode,
//     },
//     showMeQuestion: {
//       code: 'S2',
//       description: 'Second Show Me Question',
//       outcome: severityShortCode,
//     },
//     showMeTellMeComments: `show me tell me ${severityText}`,
//   };
// }
// export function getControlledStopByOutcomeSeverity(severityShortCode: String) {
//   return {
//     selected: true,
//     fault: severityShortCode,
//     faultComments: 'controlled stop',
//   };
// }
// export function getManoeuvresByOutcomeSeverity(severityShortCode: String) {
//   return {
//     reverseRight: {
//       selected: true,
//       controlFault: severityShortCode,
//       controlFaultComments: 'reverse right control',
//       observationFault: severityShortCode,
//       observationFaultComments: 'reverse right observation',
//     },
//     reverseParkCarpark: {
//       selected: true,
//       controlFault: severityShortCode,
//       controlFaultComments: 'reverse park car park control',
//       observationFault: severityShortCode,
//       observationFaultComments: 'reverse park car park observation',
//     },
//     reverseParkRoad: {
//       selected: true,
//       controlFault: severityShortCode,
//       controlFaultComments: 'reverse park road control',
//       observationFault: severityShortCode,
//       observationFaultComments: 'reverse park road observation',
//     },
//     forwardPark: {
//       selected: true,
//       controlFault: severityShortCode,
//       controlFaultComments: 'forward park control',
//       observationFault: severityShortCode,
//       observationFaultComments: 'forward park observation',
//     },
//   };
// }

export function getFaultsByOutcomeSeverity(severityText: String) {
  return {
    controlsThrottle: true,
    controlsThrottleComments: `controlsThrottle ${severityText}`,
    controlsClutch: true,
    controlsClutchComments: `controlsClutch ${severityText}`,
    controlsGears: true,
    controlsGearsComments: `controlsGears ${severityText}`,
    controlsFrontBrake: true,
    controlsFrontBrakeComments: `controlsFrontBrake ${severityText}`,
    controlsRearBrake: true,
    controlsRearBrakeComments: `controlsRearBrake ${severityText}`,
    controlsSteering: true,
    controlsSteeringComments: `controlsSteering ${severityText}`,
    controlsBalanceSlowControl: true,
    controlsBalanceSlowControlComments: `controlsBalanceSlowControl ${severityText}`,
    ancillaryControls: true,
    ancillaryControlsComments: `ancillaryControls ${severityText}`,
    precautions: true,
    precautionsComments: `precautions ${severityText}`,
    moveOffSafety: true,
    moveOffSafetyComments: `moveOffSafety ${severityText}`,
    moveOffControl: true,
    moveOffControlComments: `moveOffControl ${severityText}`,
    useOfMirrorsSignalling: true,
    useOfMirrorsSignallingComments: `useOfMirrorsSignalling ${severityText}`,
    useOfMirrorsChangeDirection: true,
    useOfMirrorsChangeDirectionComments: `useOfMirrorsChangeDirection ${severityText}`,
    useOfMirrorsChangeSpeed: true,
    useOfMirrorsChangeSpeedComments: `useOfMirrorsChangeSpeed ${severityText}`,
    signalsNecessary: true,
    signalsNecessaryComments: `signalsNecessary ${severityText}`,
    signalsCorrectly: true,
    signalsCorrectlyComments: `signalsCorrectly ${severityText}`,
    signalsTimed: true,
    signalsTimedComments: `signalsTimed ${severityText}`,
    junctionsApproachSpeed: true,
    junctionsApproachSpeedComments: `junctionsApproachSpeed ${severityText}`,
    junctionsObservation: true,
    junctionsObservationComments: `junctionsObservation ${severityText}`,
    junctionsTurningRight: true,
    junctionsTurningRightComments: `junctionsTurningRight ${severityText}`,
    junctionsTurningLeft: true,
    junctionsTurningLeftComments: `junctionsTurningLeft ${severityText}`,
    junctionsCuttingCorners: true,
    junctionsCuttingCornersComments: `junctionsCuttingCorners ${severityText}`,
    judgementOvertaking: true,
    judgementOvertakingComments: `judgementOvertaking ${severityText}`,
    judgementMeeting: true,
    judgementMeetingComments: `judgementMeeting ${severityText}`,
    judgementCrossing: true,
    judgementCrossingComments: `judgementCrossing ${severityText}`,
    positioningNormalDriving: true,
    positioningNormalDrivingComments: `positioningNormalDriving ${severityText}`,
    positioningLaneDiscipline: true,
    positioningLaneDisciplineComments: `positioningLaneDiscipline ${severityText}`,
    clearanceOrObstructions: true,
    clearanceOrObstructionsComments: `clearanceOrObstructions ${severityText}`,
    followingDistance: true,
    followingDistanceComments: `followingDistance ${severityText}`,
    useOfSpeed: true,
    useOfSpeedComments: `useOfSpeed ${severityText}`,
    progressAppropriateSpeed: true,
    progressAppropriateSpeedComments: `progressAppropriateSpeed ${severityText}`,
    progressUndueHesitation: true,
    progressUndueHesitationComments: `progressUndueHesitation ${severityText}`,
    responseToSignsTrafficSigns: true,
    responseToSignsTrafficSignsComments: `responseToSignsTrafficSigns ${severityText}`,
    responseToSignsRoadMarkings: true,
    responseToSignsRoadMarkingsComments: `responseToSignsRoadMarkings ${severityText}`,
    responseToSignsTrafficLights: true,
    responseToSignsTrafficLightsComments: `responseToSignsTrafficLights ${severityText}`,
    responseToSignsTrafficControllers: true,
    responseToSignsTrafficControllersComments: `responseToSignsTrafficControllers ${severityText}`,
    responseToSignsOtherRoadUsers: true,
    responseToSignsOtherRoadUsersComments: `responseToSignsOtherRoadUsers ${severityText}`,
    pedestrianCrossings: true,
    pedestrianCrossingsComments: `pedestrianCrossings ${severityText}`,
    positionNormalStops: true,
    positionNormalStopsComments: `positionNormalStops ${severityText}`,
    awarenessPlanning: true,
    awarenessPlanningComments: `awarenessPlanning ${severityText}`,
    bends: true,
    bendsComments: `bends ${severityText}`,
  };
}

export function getEyesightTestBySeverityOutcome(isComplete: boolean, isSerious: boolean, severityText: String = '') {
  return {
    complete: isComplete,
    seriousFault: isSerious,
    faultComments: isSerious ? `eyesight ${severityText}` : undefined,
  };
}

export function getTestSummary(independentDrivingText: String) {
  return {
    independentDriving: `${independentDrivingText}`,
  };
}
