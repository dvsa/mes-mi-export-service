import { DataField } from '../../../domain/mi-export-data';
import { InterfaceType, ResultUpload } from '../../result-client';
import { mapCatBData } from '../cat-b-mapper';
import * as minimalExpectedB from './json-mocks/cat-b-mapper.minimal-input-expected.json';
import * as fullyPopulatedExpectedB from './json-mocks/cat-b-mapper.fully-populated-expected.json';
import * as fullyPopulatedAllSeriousExpectedB
  from './json-mocks/cat-b-mapper.fully-populated-all-serious-expected.json';
import * as fullyPopulatedAllDangerousExpectedB
  from './json-mocks/cat-b-mapper.fully-populated-all-dangerous-expected.json';

describe('mapCatBData', () => {

  it('Should map a minially populated test result (test terminated early as possible)', () => {
    const minimalInput: ResultUpload = {
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
        category: 'B',
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
          candidate: { },
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

    const expected: DataField[] = minimalExpectedB;

    // expect no faults, serious or dangerous...
    expect(mapCatBData(minimalInput)).toEqual(expected);
  });

  it('Should map a fully populated regular test result (every possible driving fault)', () => {
    const fullyPopulated: ResultUpload = {
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
        category: 'B',
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
          candidate: { },
          applicationReference: {
            applicationId: 2222,
            bookingSequence: 11,
            checkDigit: 3,
          },
        },
        activityCode: '2',
        testData: {
          testRequirements: {
            normalStart1: true,
            normalStart2: true,
            angledStart: true,
            hillStart: true,
          },
          vehicleChecks: {
            tellMeQuestion: {
              code: 'T1',
              description: 'First Tell Me Question',
              outcome: 'DF',
            },
            showMeQuestion: {
              code: 'S2',
              description: 'Second Show Me Question',
              outcome: 'DF',
            },
            showMeTellMeComments: 'show me tell me fault',
          },
          controlledStop: {
            selected: true,
            fault: 'DF',
            faultComments: 'controlled stop',
          },
          manoeuvres: {
            reverseRight: {
              selected: true,
              controlFault: 'DF',
              controlFaultComments: 'reverse right control',
              observationFault: 'DF',
              observationFaultComments: 'reverse right observation',
            },
            reverseParkCarpark: {
              selected: true,
              controlFault: 'DF',
              controlFaultComments: 'reverse park car park control',
              observationFault: 'DF',
              observationFaultComments: 'reverse park car park observation',
            },
            reverseParkRoad: {
              selected: true,
              controlFault: 'DF',
              controlFaultComments: 'reverse park road control',
              observationFault: 'DF',
              observationFaultComments: 'reverse park road observation',
            },
            forwardPark: {
              selected: true,
              controlFault: 'DF',
              controlFaultComments: 'forward park control',
              observationFault: 'DF',
              observationFaultComments: 'forward park observation',
            },
          },
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
        testSummary: {
          independentDriving: 'Sat nav',
        },
      },
      autosaved: 0, // false
    };

    const expected: DataField[] = fullyPopulatedExpectedB;

    // expect the right number of faults, with no serious or dangerous
    expect(mapCatBData(fullyPopulated)).toEqual(expected);
  });

  it('Should map a fully populated regular test result (every possible serious fault)', () => {
    const fullyPopulated: ResultUpload = {
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
        category: 'B',
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
          candidate: { },
          applicationReference: {
            applicationId: 2222,
            bookingSequence: 11,
            checkDigit: 3,
          },
        },
        activityCode: '2',
        testData: {
          testRequirements: {
            normalStart1: true,
            normalStart2: true,
            angledStart: true,
            hillStart: true,
          },
          vehicleChecks: {
            tellMeQuestion: {
              code: 'T1',
              description: 'First Tell Me question',
              outcome: 'S',
            },
            showMeQuestion: {
              code: 'S2',
              description: 'Second Show Me question',
              outcome: 'S',
            },
            showMeTellMeComments: 'show me tell me serious',
          },
          controlledStop: {
            selected: true,
            fault: 'S',
            faultComments: 'controlled stop',
          },
          manoeuvres: {
            reverseRight: {
              selected: true,
              controlFault: 'S',
              controlFaultComments: 'reverse right control',
              observationFault: 'S',
              observationFaultComments: 'reverse right observation',
            },
            reverseParkRoad: {
              selected: true,
              controlFault: 'S',
              controlFaultComments: 'reverse park road control',
              observationFault: 'S',
              observationFaultComments: 'reverse park road observation',
            },
            reverseParkCarpark: {
              selected: true,
              controlFault: 'S',
              controlFaultComments: 'reverse park car park control',
              observationFault: 'S',
              observationFaultComments: 'reverse park car park observation',
            },
            forwardPark: {
              selected: true,
              controlFault: 'S',
              controlFaultComments: 'forward park control',
              observationFault: 'S',
              observationFaultComments: 'forward park observation',
            },
          },
          seriousFaults: {
            precautions: true,
            precautionsComments: 'precautions serious',
            controlsAccelerator: true,
            controlsAcceleratorComments: 'controls accelerator serious',
            controlsClutch: true,
            controlsClutchComments: 'controls clutch serious',
            controlsGears: true,
            controlsGearsComments: 'controls gears serious',
            controlsFootbrake: true,
            controlsFootbrakeComments: 'controls footbrake serious',
            controlsParkingBrake: true,
            controlsParkingBrakeComments: 'controls parking brake serious',
            controlsSteering: true,
            controlsSteeringComments: 'controls steering serious',
            moveOffSafety: true,
            moveOffSafetyComments: 'move off safety serious',
            moveOffControl: true,
            moveOffControlComments: 'move off control serious',
            useOfMirrorsSignalling: true,
            useOfMirrorsSignallingComments: 'use of mirrors signalling serious',
            useOfMirrorsChangeDirection: true,
            useOfMirrorsChangeDirectionComments: 'use of mirrors change direction serious',
            useOfMirrorsChangeSpeed: true,
            useOfMirrorsChangeSpeedComments: 'use of mirrors change speed serious',
            signalsNecessary: true,
            signalsNecessaryComments: 'signals necessary serious',
            signalsCorrectly: true,
            signalsCorrectlyComments: 'signals correctly serious',
            signalsTimed: true,
            signalsTimedComments: 'signals timed serious',
            clearance: true,
            clearanceComments: 'clearance serious',
            responseToSignsTrafficSigns: true,
            responseToSignsTrafficSignsComments: 'response to signs traffic signs serious',
            responseToSignsRoadMarkings: true,
            responseToSignsRoadMarkingsComments: 'response to signs road markings serious',
            responseToSignsTrafficLights: true,
            responseToSignsTrafficLightsComments: 'response to signs traffic lights serious',
            responseToSignsTrafficControllers: true,
            responseToSignsTrafficControllersComments: 'response to signs traffic controllers serious',
            responseToSignsOtherRoadUsers: true,
            responseToSignsOtherRoadUsersComments: 'response to signs other road users serious',
            useOfSpeed: true,
            useOfSpeedComments: 'use of speed serious',
            followingDistance: true,
            followingDistanceComments: 'following distance serious',
            progressAppropriateSpeed: true,
            progressAppropriateSpeedComments: 'progress appropriate speed serious',
            progressUndueHesitation: true,
            progressUndueHesitationComments: 'progress undue hesitation serious',
            junctionsApproachSpeed: true,
            junctionsApproachSpeedComments: 'junctions approach speed serious',
            junctionsObservation: true,
            junctionsObservationComments: 'junctions observation serious',
            junctionsTurningRight: true,
            junctionsTurningRightComments: 'junctions turning right serious',
            junctionsTurningLeft: true,
            junctionsTurningLeftComments: 'junctions turning left serious',
            junctionsCuttingCorners: true,
            junctionsCuttingCornersComments: 'junctions cutting corners serious',
            judgementOvertaking: true,
            judgementOvertakingComments: 'judgement overtaking serious',
            judgementMeeting: true,
            judgementMeetingComments: 'judgement meeting serious',
            judgementCrossing: true,
            judgementCrossingComments: 'judgement crossing serious',
            positioningNormalDriving: true,
            positioningNormalDrivingComments: 'positioning normal driving serious',
            positioningLaneDiscipline: true,
            positioningLaneDisciplineComments: 'positioning lane discipline serious',
            pedestrianCrossings: true,
            pedestrianCrossingsComments: 'pedestrian crossings serious',
            positionNormalStops: true,
            positionNormalStopsComments: 'position normal stops serious',
            awarenessPlanning: true,
            awarenessPlanningComments: 'awareness planning serious',
            ancillaryControls: true,
            ancillaryControlsComments: 'ancillary controls serious',
          },
          eyesightTest: {
            complete: true,
            seriousFault: true,
            faultComments: 'eyesight serious',
          },
        },
        testSummary: {
          independentDriving: 'Traffic signs',
        },
      },
      autosaved: 0, // false
    };

    const expected: DataField[] = fullyPopulatedAllSeriousExpectedB;

    // expect all serious, no faults or dangerous
    expect(mapCatBData(fullyPopulated)).toEqual(expected);
  });

  it('Should map a fully populated regular test result (every possible dangerous fault)', () => {
    const fullyPopulated: ResultUpload = {
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
        category: 'B',
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
          candidate: { },
          applicationReference: {
            applicationId: 2222,
            bookingSequence: 11,
            checkDigit: 3,
          },
        },
        activityCode: '2',
        testData: {
          testRequirements: {
            normalStart1: true,
            normalStart2: true,
            angledStart: true,
            hillStart: true,
          },
          vehicleChecks: {
            tellMeQuestion: {
              code: 'T1',
              description: 'First Tell Me question',
              outcome: 'D',
            },
            showMeQuestion: {
              code: 'S2',
              description: 'Second Show Me question',
              outcome: 'D',
            },
            showMeTellMeComments: 'show me tell me dangerous',
          },
          controlledStop: {
            selected: true,
            fault: 'D',
            faultComments: 'controlled stop',
          },
          manoeuvres: {
            reverseRight: {
              selected: true,
              controlFault: 'D',
              controlFaultComments: 'reverse right control',
              observationFault: 'D',
              observationFaultComments: 'reverse right observation',
            },
            reverseParkRoad: {
              selected: true,
              controlFault: 'D',
              controlFaultComments: 'reverse park road control',
              observationFault: 'D',
              observationFaultComments: 'reverse park road observation',
            },
            reverseParkCarpark: {
              selected: true,
              controlFault: 'D',
              controlFaultComments: 'reverse park car park control',
              observationFault: 'D',
              observationFaultComments: 'reverse park car park observation',
            },
            forwardPark: {
              selected: true,
              controlFault: 'D',
              controlFaultComments: 'forward park control',
              observationFault: 'D',
              observationFaultComments: 'forward park observation',
            },
          },
          dangerousFaults: {
            precautions: true,
            precautionsComments: 'precautions dangerous',
            controlsAccelerator: true,
            controlsAcceleratorComments: 'controls accelerator dangerous',
            controlsClutch: true,
            controlsClutchComments: 'controls clutch dangerous',
            controlsGears: true,
            controlsGearsComments: 'controls gears dangerous',
            controlsFootbrake: true,
            controlsFootbrakeComments: 'controls footbrake dangerous',
            controlsParkingBrake: true,
            controlsParkingBrakeComments: 'controls parking brake dangerous',
            controlsSteering: true,
            controlsSteeringComments: 'controls steering dangerous',
            moveOffSafety: true,
            moveOffSafetyComments: 'move off safety dangerous',
            moveOffControl: true,
            moveOffControlComments: 'move off control dangerous',
            useOfMirrorsSignalling: true,
            useOfMirrorsSignallingComments: 'use of mirrors signalling dangerous',
            useOfMirrorsChangeDirection: true,
            useOfMirrorsChangeDirectionComments: 'use of mirrors change direction dangerous',
            useOfMirrorsChangeSpeed: true,
            useOfMirrorsChangeSpeedComments: 'use of mirrors change speed dangerous',
            signalsNecessary: true,
            signalsNecessaryComments: 'signals necessary dangerous',
            signalsCorrectly: true,
            signalsCorrectlyComments: 'signals correctly dangerous',
            signalsTimed: true,
            signalsTimedComments: 'signals timed dangerous',
            clearance: true,
            clearanceComments: 'clearance dangerous',
            responseToSignsTrafficSigns: true,
            responseToSignsTrafficSignsComments: 'response to signs traffic signs dangerous',
            responseToSignsRoadMarkings: true,
            responseToSignsRoadMarkingsComments: 'response to signs road markings dangerous',
            responseToSignsTrafficLights: true,
            responseToSignsTrafficLightsComments: 'response to signs traffic lights dangerous',
            responseToSignsTrafficControllers: true,
            responseToSignsTrafficControllersComments: 'response to signs traffic controllers dangerous',
            responseToSignsOtherRoadUsers: true,
            responseToSignsOtherRoadUsersComments: 'response to signs other road users dangerous',
            useOfSpeed: true,
            useOfSpeedComments: 'use of speed dangerous',
            followingDistance: true,
            followingDistanceComments: 'following distance dangerous',
            progressAppropriateSpeed: true,
            progressAppropriateSpeedComments: 'progress appropriate speed dangerous',
            progressUndueHesitation: true,
            progressUndueHesitationComments: 'progress undue hesitation dangerous',
            junctionsApproachSpeed: true,
            junctionsApproachSpeedComments: 'junctions approach speed dangerous',
            junctionsObservation: true,
            junctionsObservationComments: 'junctions observation dangerous',
            junctionsTurningRight: true,
            junctionsTurningRightComments: 'junctions turning right dangerous',
            junctionsTurningLeft: true,
            junctionsTurningLeftComments: 'junctions turning left dangerous',
            junctionsCuttingCorners: true,
            junctionsCuttingCornersComments: 'junctions cutting corners dangerous',
            judgementOvertaking: true,
            judgementOvertakingComments: 'judgement overtaking dangerous',
            judgementMeeting: true,
            judgementMeetingComments: 'judgement meeting dangerous',
            judgementCrossing: true,
            judgementCrossingComments: 'judgement crossing dangerous',
            positioningNormalDriving: true,
            positioningNormalDrivingComments: 'positioning normal driving dangerous',
            positioningLaneDiscipline: true,
            positioningLaneDisciplineComments: 'positioning lane discipline dangerous',
            pedestrianCrossings: true,
            pedestrianCrossingsComments: 'pedestrian crossings dangerous',
            positionNormalStops: true,
            positionNormalStopsComments: 'position normal stops dangerous',
            awarenessPlanning: true,
            awarenessPlanningComments: 'awareness planning dangerous',
            ancillaryControls: true,
            ancillaryControlsComments: 'ancillary controls dangerous',
          },
          eyesightTest: {
            complete: false,
            seriousFault: false,
          },
        },
        testSummary: {
          independentDriving: 'N/A',
        },
      },
      autosaved: 0, // false
    };

    const expected: DataField[] = fullyPopulatedAllDangerousExpectedB;

    // expect all dangerous, no faults or serious
    expect(mapCatBData(fullyPopulated)).toEqual(expected);
  });
});
