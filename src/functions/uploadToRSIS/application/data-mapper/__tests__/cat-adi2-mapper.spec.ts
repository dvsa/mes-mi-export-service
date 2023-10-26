import { doesResultMatchExpectations } from './helpers/result-comparer';
import { getCatADI2MinimalInput } from './helpers/cat-adi2/inputs/minimal-inputs';
import { getManoeuvreCommentByType, isManoeuvreCompleted, mapCatADI2Data } from '../cat-adi2-mapper';
import { getADI2MinimalDataField } from './helpers/cat-adi2/data-fields/minimal-data-fields';
import {
  getADI2FullyPopulatedDrivingFaults,
  getADI2FullyPopulatedSeriousFaults, getADIFullyPopulatedDangerousFaults,
} from './helpers/cat-adi2/inputs/fully-populated-inputs';
import {
  getADI2FullyPopulatedFaultDataFields,
  getADIFullyPopulatedDangerousDataFields,
  getADIFullyPopulatedSeriousDataFields,
} from './helpers/cat-adi2/data-fields/fully-populated-data-fields';
import {CatADI2UniqueTypes} from '@dvsa/mes-test-schema/categories/ADI2';

describe('mapCatADI2Data', () => {

  it('Should map a minimally populated test result (test terminated early as possible)', () => {
    const minimalInput = getCatADI2MinimalInput();

    const expected = getADI2MinimalDataField();
    const result = mapCatADI2Data(minimalInput);
    // expect no faults, serious or dangerous...
    const arraysMatched: boolean = doesResultMatchExpectations(result, expected);
    expect(arraysMatched).toEqual(true);
  });

  it('Should map a fully populated regular test result (every possible driving fault)', () => {
    const fullyPopulated = getADI2FullyPopulatedDrivingFaults(getADI2MinimalDataField());
    const result = mapCatADI2Data(fullyPopulated);

    // expect the right number of faults, with no serious or dangerous
    const arraysMatched: boolean = doesResultMatchExpectations(result, getADI2FullyPopulatedFaultDataFields());
    expect(arraysMatched).toEqual(true);
  });

  it('Should map a fully populated regular test result (every possible serious fault)', () => {
    const fullyPopulated = getADI2FullyPopulatedSeriousFaults(getCatADI2MinimalInput());
    const expected = getADIFullyPopulatedSeriousDataFields();

    // expect all serious, no faults or dangerous
    const arraysMatched: boolean = doesResultMatchExpectations(mapCatADI2Data(fullyPopulated), expected);
    expect(arraysMatched).toEqual(true);
  });

  it('Should map a fully populated regular test result (every possible dangerous fault)', () => {
    const fullyPopulated = getADIFullyPopulatedDangerousFaults(getCatADI2MinimalInput());
    const expected = getADIFullyPopulatedDangerousDataFields();

    // expect all dangerous, no faults or serious
    const arraysMatched: boolean = doesResultMatchExpectations(mapCatADI2Data(fullyPopulated), expected);
    expect(arraysMatched).toEqual(true);
  });

});

describe('isManoeuvreCompleted', () => {
  it('should return true if manoeuvre selected', () => {
    const testData = {
      manoeuvres: [
        {
          forwardPark: {
            controlFault: undefined,
            controlFaultComments: '',
            observationFault: undefined,
            observationFaultComments: '',
            selected: true,
          },
        },
        {},
      ],
    } as CatADI2UniqueTypes.TestData;
    expect(isManoeuvreCompleted(testData, 'forwardPark')).toEqual(1);
  });
  it('should return false if manoeuvre NOT selected', () => {
    const testData = {
      manoeuvres: [
        {
          forwardPark: {
            controlFault: undefined,
            controlFaultComments: '',
            observationFault: undefined,
            observationFaultComments: '',
            selected: false,
          },
        },
        {},
      ],
    } as CatADI2UniqueTypes.TestData;
    expect(isManoeuvreCompleted(testData, 'forwardPark')).toEqual(0);
  });
});

describe('getManoeuvreCommentByType', () => {
  const testData = {
    manoeuvres: [{
      forwardPark: {
        controlFault: undefined,
        controlFaultComments: 'bad control forward park',
        observationFault: undefined,
        observationFaultComments: '',
        selected: true,
      },
    },
    {
      reverseParkCarpark: {
        controlFault: undefined,
        controlFaultComments: 'bad control reverse park car park',
        observationFault: undefined,
        observationFaultComments: '',
        selected: true,
      },
    }],
  } as CatADI2UniqueTypes.TestData;
  it('should return the requested comment where found', () => {
    const comment = getManoeuvreCommentByType(testData, 'reverseParkCarpark', 'controlFaultComments');
    expect(comment).toEqual('bad control reverse park car park');
  });
  it('should return NULL where not found', () => {
    const comment = getManoeuvreCommentByType(testData, 'reverseRight', 'controlFaultComments');
    expect(comment).toEqual(null);
  });
});
