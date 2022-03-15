import { DataField } from '../../../../../../domain/mi-export-data';

export function getCatManoeuvreExtendedMinimalDataFields(): DataField[] {
  return [
    { col: 'REV_LEFT_TRAIL_CONT_SERIOUS', val: 0 },
    { col: 'REV_LEFT_TRAIL_OBSERV_SERIOUS', val: 0 },
    { col: 'REV_LEFT_TRAIL_CONT_DANGEROUS', val: 0 },
    { col: 'REV_LEFT_TRAIL_OBSER_DANGEROUS', val: 0 },
    { col: 'REV_LEFT_TRAIL_COMPLETED', val: 0 },
    { col: 'UNCOUPLE_RECOUPLE_SERIOUS', val: 0 },
    { col: 'UNCOUPLE_RECOUPLE_DANGEROUS', val: 0 },
    { col: 'UNCOUPLE_RECOUPLE_COMPLETED', val: 0 },
  ];
}

export function getCatManoeuvreMinimalDataFields(): DataField[] {
  return [
    { col: 'REV_LEFT_TRAIL_CONT_SERIOUS', val: 0 },
    { col: 'REV_LEFT_TRAIL_OBSERV_SERIOUS', val: 0 },
    { col: 'REV_LEFT_TRAIL_CONT_DANGEROUS', val: 0 },
    { col: 'REV_LEFT_TRAIL_OBSER_DANGEROUS', val: 0 },
    { col: 'REV_LEFT_TRAIL_COMPLETED', val: 0 },
  ];
}
