import { isRecordAutosaved } from '../result-client';
import { TestResultSchemasUnion } from '@dvsa/mes-test-schema/categories';
import { subDays } from 'date-fns';

describe('result-client', () => {
  describe('isRecordAutosaved', () => {
    it('should be an autosave when test summary data not provided', () => {
      // ARRANGE
      const mockData: Partial<TestResultSchemasUnion> = {
        category: 'B',
        activityCode: '1',
        journalData: {
          testSlotAttributes: {
            slotId: 12345,
            vehicleTypeCode: 'C',
            start: subDays(new Date(), 15).toString(),
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
      expect(isRecordAutosaved(mockData as TestResultSchemasUnion)).toBe(1);
    });

    describe('test over two weeks old', () => {
      it('should be an autosave with test summary missing', () => {
        const mockData: Partial<TestResultSchemasUnion> = {
          category: 'B',
          activityCode: '1',
          journalData: {
            testSlotAttributes: {
              slotId: 12345,
              vehicleTypeCode: 'C',
              start: subDays(new Date(), 15).toString(),
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
        expect(isRecordAutosaved(mockData as TestResultSchemasUnion)).toBe(1);
      });

      it('should be an autosave even with test summary', () => {
        const mockData: Partial<TestResultSchemasUnion> = {
          category: 'B',
          activityCode: '1',
          journalData: {
            testSlotAttributes: {
              slotId: 12345,
              vehicleTypeCode: 'C',
              start: subDays(new Date(), 14).toString(),
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
        expect(isRecordAutosaved(mockData as TestResultSchemasUnion)).toBe(1);
      });
    });

    it('should not be an autosave when route number is provided', () => {
      // ARRANGE
      const mockData: Partial<TestResultSchemasUnion> = {
        category: 'B',
        activityCode: '1',
        journalData: {
          testSlotAttributes: {
            slotId: 12345,
            vehicleTypeCode: 'C',
            start: subDays(new Date(), 11).toString(),
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
      expect(isRecordAutosaved(mockData as TestResultSchemasUnion)).toBe(0);
    });

  });
});
