import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { buildProcessState, writeErrorLog } from './error-logger';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const isHttp = exception instanceof HttpException;
    const status = isHttp
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const responsePayload = isHttp
      ? (exception as HttpException).getResponse()
      : {
          statusCode: status,
          message: 'Internal server error',
        };

    // Build structured log
    const errorObj = exception as any;
    const stack = errorObj?.stack ? String(errorObj.stack) : undefined;
    const message = errorObj?.message
      ? String(errorObj.message)
      : isHttp
      ? JSON.stringify(responsePayload)
      : 'Unhandled exception';

    const requestInfo = req
      ? {
          id: (req as any).id,
          method: req.method,
          url: req.originalUrl || req.url,
          ip: req.ip,
          headers: req.headers,
          params: req.params,
          query: req.query as Record<string, any>,
          body: req.body as Record<string, any>,
          user: (req as any).user,
        }
      : undefined;

    const entry = {
      timestamp: new Date().toISOString(),
      level: (status >= 500 ? 'fatal' : 'error') as 'fatal' | 'error',
      name: errorObj?.name,
      message,
      stack,
      state: buildProcessState(),
      request: requestInfo,
      response: {
        statusCode: status,
        body: responsePayload,
      },
    };

    await writeErrorLog(entry);

    // Print concise error to console
    // eslint-disable-next-line no-console
    console.error('[Error]', message, '\
Status:', status);

    // Send response to client
    if (!res.headersSent) {
      res.status(status).json(
        typeof responsePayload === 'object'
          ? responsePayload
          : { statusCode: status, message: responsePayload },
      );
    }
  }
}
