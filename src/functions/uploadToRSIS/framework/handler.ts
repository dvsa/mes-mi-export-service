import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import createResponse from '../../../common/application/utils/createResponse';
import Response from '../../../common/application/api/Response';
import { HttpStatus } from '../../../common/application/api/HttpStatus';
import { bootstrapConfig, config } from './config/config';
import { info, error } from '../../../common/application/utils/logger';
import { uploadRSISBatch } from '../application/batch-processor';

export async function handler(event: APIGatewayProxyEvent, fnCtx: Context): Promise<Response> {
  await bootstrapConfig();

  info('upload to RSIS invoked...');

  try {
    await uploadRSISBatch(config());
    info('batch processed successfully...');
    return createResponse({ message: 'batch progressed ok' }, HttpStatus.OK);

  } catch (err) {
    error(err);
    return createResponse({ message: err }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
