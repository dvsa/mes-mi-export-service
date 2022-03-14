import { DataField } from '../../../../../../domain/mi-export-data';

export function getCatManoeuvreExtendedFullyPopulatedSeriousDataFields(): DataField[] {
  return [
    ...getCatManoeuvreFullyPopulatedSeriousDataFields(),
    { col: 'UNCOUPLE_RECOUPLE_SERIOUS', val: 1 },
    { col: 'UNCOUPLE_RECOUPLE_DANGEROUS', val: 0 },
    { col: 'UNCOUPLE_RECOUPLE_COMPLETED', val: 1 },
    { col: 'UNCOUPLE_RECOUPLE_COMMENT', val: 'uncouple recouple serious fault comment' },
  ];
}

export function getCatManoeuvreExtendedFullyPopulatedDangerousDataFields(): DataField[] {
  return [
    ...getCatManoeuvreFullyPopulatedDangerousDataFields(),
    { col: 'UNCOUPLE_RECOUPLE_SERIOUS', val: 0 },
    { col: 'UNCOUPLE_RECOUPLE_DANGEROUS', val: 1 },
    { col: 'UNCOUPLE_RECOUPLE_COMPLETED', val: 1 },
    { col: 'UNCOUPLE_RECOUPLE_COMMENT', val: 'uncouple recouple serious fault comment' },
  ];
}

export function getCatManoeuvreFullyPopulatedSeriousDataFields(): DataField[] {
  return [
    { col: 'REV_LEFT_TRAIL_CONT_SERIOUS', val: 1 },
    { col: 'REV_LEFT_TRAIL_OBSERV_SERIOUS', val: 1 },
    { col: 'REV_LEFT_TRAIL_CONT_DANGEROUS', val: 0 },
    { col: 'REV_LEFT_TRAIL_OBSER_DANGEROUS', val: 0 },
    { col: 'REV_LEFT_TRAIL_COMPLETED', val: 1 },
    { col: 'REV_LEFT_TRAIL_CONT_COMMENT', val: 'reverse left control' },
    { col: 'REV_LEFT_TRAIL_OBSERV_COMMENT', val: 'reverse left observation' },
  ];
}

export function getCatManoeuvreFullyPopulatedDangerousDataFields(): DataField[] {
  return [
    { col: 'REV_LEFT_TRAIL_CONT_SERIOUS', val: 0 },
    { col: 'REV_LEFT_TRAIL_OBSERV_SERIOUS', val: 0 },
    { col: 'REV_LEFT_TRAIL_CONT_DANGEROUS', val: 1 },
    { col: 'REV_LEFT_TRAIL_OBSER_DANGEROUS', val: 1 },
    { col: 'REV_LEFT_TRAIL_COMPLETED', val: 1 },
    { col: 'REV_LEFT_TRAIL_CONT_COMMENT', val: 'reverse left control' },
    { col: 'REV_LEFT_TRAIL_OBSERV_COMMENT', val: 'reverse left observation' },
  ];
}
