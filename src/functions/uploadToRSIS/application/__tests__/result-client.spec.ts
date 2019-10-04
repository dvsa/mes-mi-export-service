import { isRecordAutosaved } from '../result-client';
import { StandardCarTestCATBSchema, WeatherConditions } from '@dvsa/mes-test-schema/categories/B';
import moment = require('moment');

describe('result-client', () => {
  describe('isRecordAutosaved', () => {
    it('should be an autosave when test summary data not provided', () => {
      // ARRANGE
      const mockData: Partial<StandardCarTestCATBSchema> = {
        category: 'B',
        activityCode: '1',
        journalData: {
          testSlotAttributes: {
            slotId: 12345,
            vehicleTypeCode: 'C',
            start: moment().subtract(15, 'days').toString(),
            welshTest: false,
            extendedTest: false,
            specialNeeds: false,
          },
          examiner: { staffNumber: '12345' },
          testCentre: { centreId: 1, costCode: '12345' },
          candidate: {},
          applicationReference: {
            applicationId: 123,
            bookingSequence: 1,
            checkDigit: 2,
          },
        },
        testSummary: {
          D255: true,
        },
      };

      // ASSERT
      expect(isRecordAutosaved(mockData as StandardCarTestCATBSchema)).toBe(1);
    });

    describe('test over two weeks old', () => {
      it('should be an autosave with test summary missing', () => {
        const mockData: Partial<StandardCarTestCATBSchema> = {
          category: 'B',
          activityCode: '1',
          journalData: {
            testSlotAttributes: {
              slotId: 12345,
              vehicleTypeCode: 'C',
              start: moment().subtract(15, 'days').toString(),
              welshTest: false,
              extendedTest: false,
              specialNeeds: false,
            },
            examiner: { staffNumber: '12345' },
            testCentre: { centreId: 1, costCode: '12345' },
            candidate: {},
            applicationReference: {
              applicationId: 123,
              bookingSequence: 1,
              checkDigit: 2,
            },
          },
          testSummary: {
            D255: true,
          },
        };

        // ASSERT
        expect(isRecordAutosaved(mockData as StandardCarTestCATBSchema)).toBe(1);
      });

      it('should be an autosave even with test summary', () => {
        const mockData: Partial<StandardCarTestCATBSchema> = {
          category: 'B',
          activityCode: '1',
          journalData: {
            testSlotAttributes: {
              slotId: 12345,
              vehicleTypeCode: 'C',
              start: moment().subtract(14, 'days').format().toString(),
              welshTest: false,
              extendedTest: false,
              specialNeeds: false,
            },
            examiner: { staffNumber: '12345' },
            testCentre: { centreId: 1, costCode: '12345' },
            candidate: {},
            applicationReference: {
              applicationId: 123,
              bookingSequence: 1,
              checkDigit: 2,
            },
          },
          testSummary: {
            D255: true,
            routeNumber: 123456,
            additionalInformation: 'Information',
            candidateDescription: 'Tall guy',
            independentDriving: 'Sat nav',
            weatherConditions: ['Showers'],
            identification: 'Licence',
          },
        };

        // ASSERT
        expect(isRecordAutosaved(mockData as StandardCarTestCATBSchema)).toBe(1);
      });
    });

    it('should not be an autosave when route number is provided', () => {
      // ARRANGE
      const mockData: Partial<StandardCarTestCATBSchema> = {
        category: 'B',
        activityCode: '1',
        journalData: {
          testSlotAttributes: {
            slotId: 12345,
            vehicleTypeCode: 'C',
            start: moment().subtract(11, 'days').toString(),
            welshTest: false,
            extendedTest: false,
            specialNeeds: false,
          },
          examiner: { staffNumber: '12345' },
          testCentre: { centreId: 1, costCode: '12345' },
          candidate: {},
          applicationReference: {
            applicationId: 123,
            bookingSequence: 1,
            checkDigit: 2,
          },
        },
        testSummary: {
          D255: true,
          routeNumber: 123456,
          additionalInformation: 'Information',
          candidateDescription: 'Tall guy',
          independentDriving: 'Sat nav',
          weatherConditions: ['Showers'],
          identification: 'Licence',
        },
      };

      // ASSERT
      expect(isRecordAutosaved(mockData as StandardCarTestCATBSchema)).toBe(0);
    });

  });
});
