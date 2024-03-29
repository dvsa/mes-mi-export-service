import { ResultUpload, InterfaceType } from '../../../../../result-client';

export function getCatADI2MinimalInput(): ResultUpload {
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
      category: 'ADI2',
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
          start: '2020-03-10T09:30:00',
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
      testData: {
        eco: {
          fuelEfficientDriving: true,
          ecoRelatedFault: 'Mock driving fault',
          ecoCaptureReason: 'Mock reason for ECO capture',
        },
      },
      activityCode: '22',
    },
    autosaved: 0, // false
  };
}
