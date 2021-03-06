import { ResultUpload, InterfaceType } from '../../../../../result-client';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

export function getCatAM1MinimalInput(subCategory: TestCategory): ResultUpload {
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
      category: subCategory,
      rekey: false,
      changeMarker: false,
      examinerBooked: 12345678,
      examinerConducted: 12345678,
      examinerKeyed: 12345678,
      preTestDeclarations: {
        insuranceDeclarationAccepted: true,
        residencyDeclarationAccepted: true,
        preTestSignature: '**DUMMY**',
        DL196CBTCertNumber: '123456',
      },
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
        candidate: {},
        applicationReference: {
          applicationId: 2222,
          bookingSequence: 11,
          checkDigit: 3,
        },
      },
      activityCode: '22',
      vehicleDetails: {
        gearboxCategory: 'Automatic',
      },
    },
    autosaved: 0, // false
  };
}

export function getCatAM1MinimalInputWithPassCompletion(subCategory: TestCategory): ResultUpload {
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
      category: subCategory,
      rekey: false,
      changeMarker: false,
      examinerBooked: 12345678,
      examinerConducted: 12345678,
      examinerKeyed: 12345678,
      passCompletion: {
        passCertificateNumber: 'C123456X',
      },
      vehicleDetails: {
        registrationNumber: 'DDDDDD',
        gearboxCategory: 'Automatic',
        schoolBike: true,
      },
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
        candidate: {},
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
}
