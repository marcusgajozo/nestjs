import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Response } from 'express';
import { I18nService, I18nValidationException } from 'nestjs-i18n';

@Injectable()
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let error = 'Internal Server Error';
    let message: string | string[] = 'An unexpected error occurred';

    if (exception instanceof I18nValidationException) {
      status = exception.getStatus();
      error = 'Bad Request';
      message = this.formatI18nErrors(exception.errors);
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'object' && res !== null) {
        error = res.error || 'Error';
        message = res.message || 'An error occurred';
      } else {
        message = res;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    response.status(status).json({
      error,
      message,
    });
  }

  private formatI18nErrors(errors: any[]): string[] {
    const messages: string[] = [];

    for (const error of errors) {
      const property = error.property;
      if (error.constraints) {
        for (const value of Object.values(error.constraints)) {
          if (typeof value === 'string' && value.includes('|')) {
            const [translationKey, argsString] = value.split('|');
            let args: any = {};
            try {
              args = JSON.parse(argsString);
            } catch (e) {
              // Ignore parse error
            }

            // Inject property name into args for translation
            args.property = property;

            messages.push(
              this.i18n.t(translationKey, { args, lang: 'pt-BR' }) as any,
            );
          } else {
            messages.push(value as string);
          }
        }
      }
      if (error.children && error.children.length > 0) {
        messages.push(...this.formatI18nErrors(error.children));
      }
    }

    return messages;
  }
}
