import { isRecordAutosaved } from '../result-client';
import { StandardCarTestCATBSchema, WeatherConditions } from '@dvsa/mes-test-schema/categories/B';

fdescribe('result-client', () => {
    describe('isRecordAutosaved', () => {
        it('should be an autosave when test summary data not provided', () => {
            // ARRANGE
            const mockData: Partial<StandardCarTestCATBSchema> = {
                category: 'B',
                activityCode: undefined,
                testSummary: {
                    D255: true,
                }
            };

            // ASSERT
            expect(isRecordAutosaved(mockData as StandardCarTestCATBSchema)).toBeTruthy();
        });

        it('should not be an autosave when route number is provided', () => {
            // ARRANGE
            const mockData: StandardCarTestCATBSchema = {
                category: 'B',
                activityCode: "1",
                journalData: {
                    testSlotAttributes: {
                        slotId: 12345,
                        vehicleTypeCode: 'C',
                        start: new Date().toString(),
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
                }
            };

            // ASSERT
            expect(isRecordAutosaved(mockData as StandardCarTestCATBSchema)).toBeFalsy()
        });

    });
});