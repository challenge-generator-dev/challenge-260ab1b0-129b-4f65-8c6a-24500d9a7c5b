import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Request, Response } from 'express';

export interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
  path: string;
  method: string;
  requestId?: string;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const responseObj = exceptionResponse as any;
        message = responseObj.message || message;
        error = responseObj.error || error;

        if (Array.isArray(responseObj.message)) {
          message = responseObj.message.join(', ');
        }
      }

      this.handleHttpException(exception, request, status);
    } else if (exception instanceof BadRequestException) {
      status = HttpStatus.BAD_REQUEST;
      message = this.extractMessage(exception);
      error = 'Bad Request';
      this.logger.warn(`Bad request on ${request.method} ${request.url}: ${message}`);
    } else if (exception instanceof NotFoundException) {
      status = HttpStatus.NOT_FOUND;
      message = this.extractMessage(exception);
      error = 'Not Found';
      this.logger.warn(`Resource not found: ${request.method} ${request.url}`);
    } else if (exception instanceof UnauthorizedException) {
      status = HttpStatus.UNAUTHORIZED;
      message = this.extractMessage(exception);
      error = 'Unauthorized';
      this.logger.warn(`Unauthorized access attempt: ${request.method} ${request.url}`);
    } else if (exception instanceof ForbiddenException) {
      status = HttpStatus.FORBIDDEN;
      message = this.extractMessage(exception);
      error = 'Forbidden';
      this.logger.warn(`Forbidden access: ${request.method} ${request.url}`);
    } else if (exception instanceof InternalServerErrorException) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = this.extractMessage(exception);
      error = 'Internal Server Error';
      this.logger.error(`Internal server error: ${message}`, (exception as Error).stack);
    } else if (exception instanceof Error) {
      message = exception.message;
      this.logger.error(`Unhandled error: ${message}`, exception.stack);
    }

    const errorResponse: ErrorResponse = {
      statusCode: status,
      message,
      error,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      requestId: (request.headers['x-request-id'] as string) || this.generateRequestId(),
    };

    response.status(status).json(errorResponse);
  }

  private handleHttpException(exception: HttpException, request: Request, status: number): void {
    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `HTTP ${status} error on ${request.method} ${request.url}: ${exception.message}`,
        (exception as Error).stack,
      );
    } else if (status >= HttpStatus.BAD_REQUEST) {
      this.logger.warn(
        `HTTP ${status} error on ${request.method} ${request.url}: ${exception.message}`,
      );
    }
  }

  private extractMessage(exception: HttpException): string {
    const response = exception.getResponse();
    if (typeof response === 'string') {
      return response;
    }
    if (typeof response === 'object' && response !== null) {
      const obj = response as any;
      if (Array.isArray(obj.message)) {
        return obj.message.join(', ');
      }
      return obj.message || exception.message;
    }
    return exception.message;
  }

  private generateRequestId(): string {
    return `req-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  }
}