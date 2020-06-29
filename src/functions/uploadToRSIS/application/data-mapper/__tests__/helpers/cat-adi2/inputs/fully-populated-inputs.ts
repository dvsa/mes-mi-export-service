import { ResultUpload } from '../../../../../result-client';
import { SeverityShortCodes, SeverityText, IndependentDrivingText } from '../../enums/function-params';

export function getADI2FullyPopulatedDrivingFaults(result: any): ResultUpload {
  return {
    ...result,
    testResult: {
      testData: {
        testRequirements: {
          normalStart1: true,
          normalStart2: true,
          angledStartControlledStop: true,
          uphillStart: true,
          downhillStart: true,
        },
        vehicleChecks: getVehicleChecksByOutcomeSeverity(SeverityShortCodes.DrivingFault, SeverityText.DrivingFault),
        controlledStop: getControlledStopByOutcomeSeverity(SeverityShortCodes.DrivingFault),
        manoeuvres: [
          getManoeuvresByOutcomeSeverity('reverseLeft', SeverityShortCodes.DrivingFault),
          getManoeuvresByOutcomeSeverity('reverseParkCarpark', SeverityShortCodes.DrivingFault),
        ],
        drivingFaults: {
          precautions: 2,
          precautionsComments: 'precautions fault',
          controlsAccelerator: 3,
          controlsAcceleratorComments: 'controls accelerator fault',
          controlsClutch: 4,
          controlsClutchComments: 'controls clutch fault',
          controlsGears: 5,
          controlsGearsComments: 'controls gears fault',
          controlsFootbrake: 6,
          controlsFootbrakeComments: 'controls footbrake fault',
          controlsParkingBrake: 7,
          controlsParkingBrakeComments: 'controls parking brake fault',
          controlsSteering: 8,
          controlsSteeringComments: 'controls steering fault',
          moveOffSafety: 9,
          moveOffSafetyComments: 'move off safety fault',
          moveOffControl: 10,
          moveOffControlComments: 'move off control fault',
          useOfMirrorsSignalling: 11,
          useOfMirrorsSignallingComments: 'use of mirrors signalling fault',
          useOfMirrorsChangeDirection: 12,
          useOfMirrorsChangeDirectionComments: 'use of mirrors change direction fault',
          useOfMirrorsChangeSpeed: 13,
          useOfMirrorsChangeSpeedComments: 'use of mirrors change speed fault',
          signalsNecessary: 14,
          signalsNecessaryComments: 'signals necessary fault',
          signalsCorrectly: 15,
          signalsCorrectlyComments: 'signals correctly fault',
          signalsTimed: 16,
          signalsTimedComments: 'signals timed fault',
          clearance: 17,
          clearanceComments: 'clearance fault',
          responseToSignsTrafficSigns: 18,
          responseToSignsTrafficSignsComments: 'response to signs traffic signs fault',
          responseToSignsRoadMarkings: 19,
          responseToSignsRoadMarkingsComments: 'response to signs road markings fault',
          responseToSignsTrafficLights: 20,
          responseToSignsTrafficLightsComments: 'response to signs traffic lights fault',
          responseToSignsTrafficControllers: 21,
          responseToSignsTrafficControllersComments: 'response to signs traffic controllers fault',
          responseToSignsOtherRoadUsers: 22,
          responseToSignsOtherRoadUsersComments: 'response to signs other road users fault',
          useOfSpeed: 23,
          useOfSpeedComments: 'use of speed fault',
          followingDistance: 24,
          followingDistanceComments: 'following distance fault',
          progressAppropriateSpeed: 25,
          progressAppropriateSpeedComments: 'progress appropriate speed fault',
          progressUndueHesitation: 26,
          progressUndueHesitationComments: 'progress undue hesitation fault',
          junctionsApproachSpeed: 27,
          junctionsApproachSpeedComments: 'junctions approach speed fault',
          junctionsObservation: 28,
          junctionsObservationComments: 'junctions observation fault',
          junctionsTurningRight: 29,
          junctionsTurningRightComments: 'junctions turning right fault',
          junctionsTurningLeft: 30,
          junctionsTurningLeftComments: 'junctions turning left fault',
          junctionsCuttingCorners: 31,
          junctionsCuttingCornersComments: 'junctions cutting corners fault',
          judgementOvertaking: 32,
          judgementOvertakingComments: 'judgement overtaking fault',
          judgementMeeting: 33,
          judgementMeetingComments: 'judgement meeting fault',
          judgementCrossing: 34,
          judgementCrossingComments: 'judgement crossing fault',
          positioningNormalDriving: 35,
          positioningNormalDrivingComments: 'positioning normal driving fault',
          positioningLaneDiscipline: 36,
          positioningLaneDisciplineComments: 'positioning lane discipline fault',
          pedestrianCrossings: 37,
          pedestrianCrossingsComments: 'pedestrian crossings fault',
          positionNormalStops: 38,
          positionNormalStopsComments: 'position normal stops fault',
          awarenessPlanning: 39,
          awarenessPlanningComments: 'awareness planning fault',
          ancillaryControls: 40,
          ancillaryControlsComments: 'ancillary controls fault',
        },
        eyesightTest: {
          complete: true,
        },
      },
      trainerDetails: {
        orditTrainedCandidate: true,
        trainingRecords: true,
        trainerRegistrationNumber: 23434,
      },
      testSummary: getTestSummary(IndependentDrivingText.SatNav),
    },
  };
}

export function getADI2FullyPopulatedSeriousFaults(result: any): ResultUpload {
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
        vehicleChecks: getVehicleChecksByOutcomeSeverity(SeverityShortCodes.SeriousFault, SeverityText.Serious),
        controlledStop: getControlledStopByOutcomeSeverity(SeverityShortCodes.SeriousFault),
        manoeuvres: [
          getManoeuvresByOutcomeSeverity('reverseLeft', SeverityShortCodes.SeriousFault),
          getManoeuvresByOutcomeSeverity('reverseParkCarpark', SeverityShortCodes.SeriousFault),
        ],
        seriousFaults: getFaultsByOutcomeSeverity(SeverityText.Serious),
        eyesightTest: getEyesightTestBySeverityOutcome(true, true, SeverityText.Serious),
      },
      trainerDetails: {
        orditTrainedCandidate: true,
        trainingRecords: true,
        trainerRegistrationNumber: 12345567,
      },
      testSummary: getTestSummary(IndependentDrivingText.TrafficSigns),
    },
  };
}

export function getADIFullyPopulatedDangerousFaults(result: any): ResultUpload {
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
        vehicleChecks: getVehicleChecksByOutcomeSeverity(SeverityShortCodes.DangerousFault, SeverityText.Dangerous),
        controlledStop: getControlledStopByOutcomeSeverity(SeverityShortCodes.DangerousFault),
        manoeuvres: [
          getManoeuvresByOutcomeSeverity('reverseParkRoad', SeverityShortCodes.DangerousFault),
          getManoeuvresByOutcomeSeverity('reverseParkCarpark', SeverityShortCodes.DangerousFault),
        ],
        dangerousFaults: getFaultsByOutcomeSeverity(SeverityText.Dangerous),
        eyesightTest: getEyesightTestBySeverityOutcome(false, false),
      },
      trainerDetails: {
        orditTrainedCandidate: true,
        trainingRecords: false,
      },
      testSummary: getTestSummary(IndependentDrivingText.NotApplicable),
    },
  };
}

export function getVehicleChecksByOutcomeSeverity(
  severityShortCode: String,
  severityText: String,
  isSerious: boolean = false,
  ) {
  return {
    tellMeQuestions: [
      {
        code: 'T1',
        description: 'First Tell Me Question',
        outcome: severityShortCode,
      },
      {
        code: 'T2',
        description: 'Second Tell Me Question',
        outcome: isSerious ? severityShortCode : 'P',
      },
      {
        code: 'T3',
        description: 'Third Tell Me Question',
        outcome: isSerious ? severityShortCode : 'P',
      },
    ],
    showMeQuestions: [
      {
        code: 'S1',
        description: 'First Show Me Question',
        outcome: severityShortCode,
      },
      {
        code: 'S2',
        description: 'Second Show Me Question',
        outcome: severityShortCode,
      },
    ],
    showMeTellMeComments: `show me tell me ${severityText}`,
    seriousFault: false,
    dangerousFault: false,
  };
}
export function getControlledStopByOutcomeSeverity(severityShortCode: String) {
  return {
    selected: true,
    fault: severityShortCode,
    faultComments: 'controlled stop',
  };
}
export function getManoeuvresByOutcomeSeverity(type: string, severityShortCode: String) {
  return {
    [type]: {
      selected: true,
      controlFault: severityShortCode,
      controlFaultComments: `${type} control`,
      observationFault: severityShortCode,
      observationFaultComments: `${type}  observation`,
    },
  };
}

export function getFaultsByOutcomeSeverity(severityText: String) {
  return {
    precautions: true,
    precautionsComments: `precautions ${severityText}`,
    controlsAccelerator: true,
    controlsAcceleratorComments: `controls accelerator ${severityText}`,
    controlsClutch: true,
    controlsClutchComments: `controls clutch ${severityText}`,
    controlsGears: true,
    controlsGearsComments: `controls gears ${severityText}`,
    controlsFootbrake: true,
    controlsFootbrakeComments: `controls footbrake ${severityText}`,
    controlsParkingBrake: true,
    controlsParkingBrakeComments: `controls parking brake ${severityText}`,
    controlsSteering: true,
    controlsSteeringComments: `controls steering ${severityText}`,
    moveOffSafety: true,
    moveOffSafetyComments: `move off safety ${severityText}`,
    moveOffControl: true,
    moveOffControlComments: `move off control ${severityText}`,
    useOfMirrorsSignalling: true,
    useOfMirrorsSignallingComments: `use of mirrors signalling ${severityText}`,
    useOfMirrorsChangeDirection: true,
    useOfMirrorsChangeDirectionComments: `use of mirrors change direction ${severityText}`,
    useOfMirrorsChangeSpeed: true,
    useOfMirrorsChangeSpeedComments: `use of mirrors change speed ${severityText}`,
    signalsNecessary: true,
    signalsNecessaryComments: `signals necessary ${severityText}`,
    signalsCorrectly: true,
    signalsCorrectlyComments: `signals correctly ${severityText}`,
    signalsTimed: true,
    signalsTimedComments: `signals timed ${severityText}`,
    clearance: true,
    clearanceComments: `clearance ${severityText}`,
    responseToSignsTrafficSigns: true,
    responseToSignsTrafficSignsComments: `response to signs traffic signs ${severityText}`,
    responseToSignsRoadMarkings: true,
    responseToSignsRoadMarkingsComments: `response to signs road markings ${severityText}`,
    responseToSignsTrafficLights: true,
    responseToSignsTrafficLightsComments: `response to signs traffic lights ${severityText}`,
    responseToSignsTrafficControllers: true,
    responseToSignsTrafficControllersComments: `response to signs traffic controllers ${severityText}`,
    responseToSignsOtherRoadUsers: true,
    responseToSignsOtherRoadUsersComments: `response to signs other road users ${severityText}`,
    useOfSpeed: true,
    useOfSpeedComments: `use of speed ${severityText}`,
    followingDistance: true,
    followingDistanceComments: `following distance ${severityText}`,
    progressAppropriateSpeed: true,
    progressAppropriateSpeedComments: `progress appropriate speed ${severityText}`,
    progressUndueHesitation: true,
    progressUndueHesitationComments: `progress undue hesitation ${severityText}`,
    junctionsApproachSpeed: true,
    junctionsApproachSpeedComments: `junctions approach speed ${severityText}`,
    junctionsObservation: true,
    junctionsObservationComments: `junctions observation ${severityText}`,
    junctionsTurningRight: true,
    junctionsTurningRightComments: `junctions turning right ${severityText}`,
    junctionsTurningLeft: true,
    junctionsTurningLeftComments: `junctions turning left ${severityText}`,
    junctionsCuttingCorners: true,
    junctionsCuttingCornersComments: `junctions cutting corners ${severityText}`,
    judgementOvertaking: true,
    judgementOvertakingComments: `judgement overtaking ${severityText}`,
    judgementMeeting: true,
    judgementMeetingComments: `judgement meeting ${severityText}`,
    judgementCrossing: true,
    judgementCrossingComments: `judgement crossing ${severityText}`,
    positioningNormalDriving: true,
    positioningNormalDrivingComments: `positioning normal driving ${severityText}`,
    positioningLaneDiscipline: true,
    positioningLaneDisciplineComments: `positioning lane discipline ${severityText}`,
    pedestrianCrossings: true,
    pedestrianCrossingsComments: `pedestrian crossings ${severityText}`,
    positionNormalStops: true,
    positionNormalStopsComments: `position normal stops ${severityText}`,
    awarenessPlanning: true,
    awarenessPlanningComments: `awareness planning ${severityText}`,
    ancillaryControls: true,
    ancillaryControlsComments: `ancillary controls ${severityText}`,
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
