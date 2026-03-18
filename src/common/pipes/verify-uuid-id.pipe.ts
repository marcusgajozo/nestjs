import { Injectable, PipeTransform } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { I18nValidationException } from 'nestjs-i18n';

@Injectable()
export class VerifyUUIDIdPipe implements PipeTransform {
  transform(value: string) {
    if (!isUUID(value)) {
      throw new I18nValidationException([
        {
          property: 'id',
          constraints: {
            isUuid: 'validation.INVALID_UUID',
          },
        },
      ]);
    }
    return value;
  }
}
