import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  I18nContext,
  I18nService,
  I18nValidationError,
  I18nValidationException,
} from 'nestjs-i18n';

@Injectable()
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  constructor(private readonly i18n: I18nService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const i18n = I18nContext.current(host);
    const lang = i18n?.lang || 'pt-BR';

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let error = 'Internal Server Error';
    let message: string | string[] = 'An unexpected error occurred';

    if (exception instanceof I18nValidationException) {
      status = exception.getStatus();
      error = 'Bad Request';
      message = this.formatI18nErrors(exception.errors, lang);
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse() as
        | string
        | { message?: string | string[]; error?: string };

      if (typeof res === 'object' && res !== null) {
        error = res.error || 'Error';
        message = res.message || 'An error occurred';
      } else {
        message = res;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      this.logger.error(
        `${request.method} ${request.url} - Error: ${exception.message}`,
        exception.stack,
      );
    } else {
      this.logger.error(
        `${request.method} ${request.url} - Unknown exception: ${JSON.stringify(exception)}`,
      );
    }

    if (
      status === HttpStatus.INTERNAL_SERVER_ERROR &&
      !(exception instanceof Error)
    ) {
      this.logger.error(
        `${request.method} ${request.url} - Unexpected internal error: ${JSON.stringify(exception)}`,
      );
    }

    response.status(status).json({
      statusCode: status,
      message,
      error,
    });
  }

  private formatI18nErrors(
    errors: I18nValidationError[],
    lang: string,
  ): string[] {
    const messages: string[] = [];

    for (const error of errors) {
      const property = error.property;
      if (error.constraints) {
        for (const value of Object.values(error.constraints)) {
          if (typeof value === 'string' && value.includes('|')) {
            const [translationKey, argsString] = value.split('|');
            let args: Record<string, unknown> = {};
            args = JSON.parse(argsString) as Record<string, unknown>;
            args.property = property;

            messages.push(
              this.i18n.t(translationKey, {
                args,
                lang,
              }),
            );
          } else {
            messages.push(value);
          }
        }
      }
      if (error.children && error.children.length > 0) {
        messages.push(...this.formatI18nErrors(error.children, lang));
      }
    }

    return messages;
  }
}
