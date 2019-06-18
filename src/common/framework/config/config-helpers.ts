
export const defaultIfNotPresent = (value: string | null | undefined, defaultValue: string) => {
  if (!value || value.trim().length === 0) {
    return defaultValue;
  }
  return value;
};

export const throwIfNotPresent = (value: string | null | undefined, configKey: string) => {
  if (!value || value.trim().length === 0) {
    throw new Error(`Configuration item ${configKey} was not provided with a value`);
  }
  return value;
};
