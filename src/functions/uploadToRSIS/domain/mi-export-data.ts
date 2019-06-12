export enum ChannelIndicator {
  // SCANNING = 0,
  MES = 1,
  MES_REKEY = 2,
}

export enum ResultIndicator {
  Pass = 'P',
  Fail = 'F',
  None = 'N',
}

export enum Gender {
  Male = 'M',
  Female = 'F',
}

export enum Language {
  English = 'E',
  Welsh = 'W',
}

export type BooleanAsNumber = 0 | 1;

/**
 * Used to hold a test result, in data format suitable for the RSIS MI staging table.
 */
export type MIExportTestResult = {
  channelIndicator: ChannelIndicator,
  drivingSchoolCar: BooleanAsNumber,
  d255: BooleanAsNumber,
  applicationReference: number,
  testDate: string,
  testTime: string,
  testCentreCostCode: string,
  staffNumber: string,
  testCategory: string,
  automatic: BooleanAsNumber,
  extended: BooleanAsNumber,
  testType: number,
  instructorPRN: string | null,
  supervisorAccompanied: BooleanAsNumber,
  instructorAccompanied: BooleanAsNumber,
  interpreterAccompanied: BooleanAsNumber,
  otherAccompanied: BooleanAsNumber,
  visitingExaminer: BooleanAsNumber,
  change: BooleanAsNumber,
  // TODO: 1a eyesight .. element 5 - C
  result: ResultIndicator,
  totalFaults: number,
  route: number,
  etaVerbal: BooleanAsNumber,
  etaPhysical: BooleanAsNumber,
  dualControls: BooleanAsNumber,
  ecoAssessed: BooleanAsNumber,
  ecoControl: BooleanAsNumber,
  ecoPlanning: BooleanAsNumber,
  debriefGiven: BooleanAsNumber,
  activityCode: number,
  passCertificateNumber: string | null,
  licenseReceived: BooleanAsNumber,
  candidateDOB: Date,
  candidateForenames: string,
  candidateGender: Gender,
  candidateIndividualId: number,
  candidatePostCode: string,
  candidateSurname: string,
  candidateTitle: string,
  driverNumber: string,
  examinerIndividualId: number,
  bookedTestCategory: string,
  testCentreId: number,
  testCentreName: string, // not needed?
  vehicleSlotType: string,
  language: Language,
  ethnicityCode: string,
  vehicleRegistration: string,
};
