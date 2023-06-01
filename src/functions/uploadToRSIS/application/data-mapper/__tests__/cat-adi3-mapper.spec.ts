import { doesResultMatchExpectations } from './helpers/result-comparer';
import { getCatADI3MinimalInput } from './helpers/cat-adi3/inputs/minimal-inputs';
import { getADI3MinimalDataField } from './helpers/cat-adi3/data-fields/minimal-data-fields';
import { mapCatADI3Data } from '../cat-adi3-mapper';
import { getADI3FullyPopulated } from './helpers/cat-adi3/inputs/fully-populated-inputs';
import {
  getADI3FullyPopulatedFaultDataFields,
  getSCFullyPopulatedFaultDataFields,
} from './helpers/cat-adi3/data-fields/fully-populated-data-fields';
import { ResultUpload } from '../../result-client';
import { PreTestDeclarations, TestResultCatADI3Schema } from '@dvsa/mes-test-schema/categories/ADI3';

describe('mapCatADI3Data', () => {
  describe('ADI3', () => {
    it('Should map a minimally populated test result (test terminated early as possible)', () => {
      const minimalInput = getCatADI3MinimalInput();
      const expected = getADI3MinimalDataField();
      const result = mapCatADI3Data(minimalInput);
      const arraysMatched: boolean = doesResultMatchExpectations(result, expected);
      expect(arraysMatched).toEqual(true);
    });
    it('Should map a fully populated regular test result', () => {
      const fullyPopulated = getADI3FullyPopulated(getCatADI3MinimalInput());
      const result = mapCatADI3Data(fullyPopulated);
      const arraysMatched: boolean = doesResultMatchExpectations(result, getADI3FullyPopulatedFaultDataFields());
      expect(arraysMatched).toEqual(true);
    });
  });

  describe('SC', () => {
    it('Should map a minimally populated test result (test terminated early as possible)', () => {
      const minimalInput = getCatADI3MinimalInput();
      const expected = getADI3MinimalDataField();
      const result = mapCatADI3Data(minimalInput);
      const arraysMatched: boolean = doesResultMatchExpectations(result, expected);
      expect(arraysMatched).toEqual(true);
    });
    it('Should map a fully populated regular test result', () => {
      const minimalInput = getADI3FullyPopulated(getCatADI3MinimalInput());
      const input: ResultUpload = {
        ...minimalInput,
        testResult: {
          ...minimalInput.testResult,
          preTestDeclarations: {
            ...minimalInput.testResult.preTestDeclarations,
            validCertificate: true,
          } as PreTestDeclarations,
          testData: {
            ...minimalInput.testResult.testData,
            startTime: '11:15',
            endTime: '12:38',
          },
        } as TestResultCatADI3Schema,
      };
      const result = mapCatADI3Data(input);
      const arraysMatched: boolean = doesResultMatchExpectations(result, getSCFullyPopulatedFaultDataFields());
      expect(arraysMatched).toEqual(true);
    });
  });
});
