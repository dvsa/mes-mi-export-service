import { GetSecretValueCommand, SecretsManager } from '@aws-sdk/client-secrets-manager';
import { isEmpty } from 'lodash';

/**
 * Read a set of key values from a configuration secret.
 * @param name The name of the secret
 * @param keys The keys to get values for
 * @returns A map of populated values (only for keys that are present)
 * @throws Error if secret does not exist
 */
export const getSecrets = async (name: string, keys: string[]): Promise<Map<string, string>> => {
  try {
    const response = await new SecretsManager().send(
      new GetSecretValueCommand({
        SecretId: name,
      })
    );

    const secrets = JSON.parse(response.SecretString || '');
    if (isEmpty(secrets)) {
      throw new Error(`Secret ${name} was empty`);
    }

    const secretValues: Map<string, string> = new Map();

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
