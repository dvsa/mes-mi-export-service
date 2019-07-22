import { Context, ScheduledEvent } from 'aws-lambda';
import createResponse from '../../../common/application/utils/createResponse';
import Response from '../../../common/application/api/Response';
import { HttpStatus } from '../../../common/application/api/HttpStatus';
import { bootstrapConfig, config } from './config/config';
import { info, error, bootstrapLogging } from '@dvsa/mes-microservice-common/application/utils/logger';
import { uploadRSISBatch } from '../application/batch-processor';

export async function handler(event: ScheduledEvent, fnCtx: Context): Promise<Response> {
  bootstrapLogging('mi-export-service', event);
  await bootstrapConfig();

  info('upload to RSIS invoked...');

  try {
    const outcome = await uploadRSISBatch(config());
    info('batch processed successfully: ', outcome);

    // return OK even if batch failed, to avoid Lambda retries
    return createResponse({ message: 'batch progressed ok' }, HttpStatus.OK);

  } catch (err) {
    error(err);
    return createResponse({ message: err }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
