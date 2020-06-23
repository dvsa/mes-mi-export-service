/*
 * Constants and types used by the RSIS MI staging table.
 */

export enum ChannelIndicator {
  // SCANNING = 1,
  MES = 2,
  MES_REKEY = 3,
}

export enum FormType {
  // Old Paper DL25 = 0,
  // Current Paper DL25 = 1,
  // Current Paper CPC4 = 2,
  // Current Paper Dl25MC = 3,
  CPC = 2,
  MES = 4,
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

/**
 * Oracle DB doesn't have a native boolean type, so 1-digit numbers are used.
 * (``0`` is false, ``1`` is true)
 */
export type BooleanAsNumber = 0 | 1;

/**
 * All staging table columns are VARCHAR2, NUMBER, DATE.
 */
export type DataFieldValue = string | number | Date;

export type DataField = {
  col: string,
  val: DataFieldValue;
};
