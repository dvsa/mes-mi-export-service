import { ResultUpload } from '../result-client';
import { DataField } from '../../domain/mi-export-data';
import { field } from './data-mapper';
import { formatGearboxCategory } from '../helpers/shared-formatters';

export const mapCatManoeuvresData = (result: ResultUpload): DataField[] => {
  return [
    field('AUTOMATIC_TEST', formatGearboxCategory(result)),
  ];
};
