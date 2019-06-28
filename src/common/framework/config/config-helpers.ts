
import * as awsSdk from 'aws-sdk';
import { isEmpty } from 'lodash';

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

/**
 * Read a set of key values from a configuration secret.
 * @param name The name of the secret
 * @param keys The keys to get values for
 * @returns A map of populated values (only for keys that are present)
 * @throws Error if secret does not exist
 */
export const getSecrets = async (name: string, keys: string[]): Promise<Map<string, string>> => {
  const secretsmanager = new awsSdk.SecretsManager();
  const params: awsSdk.SecretsManager.GetSecretValueRequest = {
    SecretId: name,
  };

  try {
    const secretValues: Map<string, string> = new Map();
    const response = await secretsmanager.getSecretValue(params).promise();
    const secrets = JSON.parse(response.SecretString || '');
    if (isEmpty(secrets)) {
      throw new Error(`Secret ${name} was empty`);
    }
    keys.forEach((key) => {
      if (secrets[key]) {
        secretValues.set(key, secrets[key]);
      }
    });
    return Promise.resolve(secretValues);
  } catch (err) {
    return Promise.reject(err);
  }
};
