import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest<Request>();
    const response = host.switchToHttp().getResponse<Response>();

    const statusCode = exception.getStatus();

    response.status(statusCode).json({
      success: false,
      statusCode: statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception?.message || '',
      data: exception?.getResponse() || {},
    });
  }
}
