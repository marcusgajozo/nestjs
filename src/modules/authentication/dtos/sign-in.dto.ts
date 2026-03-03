import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated/i18n.generated';

export class SignInDto {
  @IsEmail(
    {},
    {
      message: i18nValidationMessage<I18nTranslations>(
        'validation.INVALID_EMAIL',
      ),
    },
  )
  email: string;

  @IsString({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.INVALID_STRING',
    ),
  })
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.NOT_EMPTY'),
  })
  password: string;
}
