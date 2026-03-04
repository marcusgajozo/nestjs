import { BadRequestException, PipeTransform } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated/i18n.generated';

export class VerifyUUIDIdPipe implements PipeTransform {
  transform(value: string) {
    if (!isUUID(value)) {
      throw new BadRequestException(
        i18nValidationMessage<I18nTranslations>('validation.INVALID_UUID'),
      );
    }
    return value;
  }
}
