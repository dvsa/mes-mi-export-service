import { ScheduledEvent } from 'aws-lambda';
import { createResponse } from '@dvsa/mes-microservice-common/application/api/create-response';
import { HttpStatus } from '@dvsa/mes-microservice-common/application/api/http-status';
import { info, error, bootstrapLogging } from '@dvsa/mes-microservice-common/application/utils/logger';
import { bootstrapConfig, config } from './config/config';
import { uploadRSISBatch } from '../application/batch-processor';

export async function handler(event: ScheduledEvent) {
  try {
    bootstrapLogging('mi-export-service', event);

    await bootstrapConfig();

    info('upload to RSIS invoked...');

    const outcome = await uploadRSISBatch(config());
    info('batch processed successfully: ', outcome);

    // return OK even if batch failed, to avoid Lambda retries
    return createResponse({ message: 'batch progressed ok' }, HttpStatus.OK);

  } catch (err) {
    error((err instanceof Error) ? err.message : `Unknown err: ${err}`);
    return createResponse({ message: err }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
