import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { i18nValidationMessage } from 'src/common/helper/i18n-validation-message';

export class CreateClientDto {
  @IsString({
    message: i18nValidationMessage('validation.INVALID_STRING'),
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.NOT_EMPTY'),
  })
  name: string;

  @IsString({
    message: i18nValidationMessage('validation.INVALID_STRING'),
  })
  @IsOptional()
  description?: string;

  @IsInt({
    message: i18nValidationMessage('validation.INVALID_INT'),
  })
  @Min(0)
  price: number;

  @IsInt({
    message: i18nValidationMessage('validation.INVALID_INT'),
  })
  @Min(0)
  returnDays: number;

  @IsInt({
    message: i18nValidationMessage('validation.INVALID_INT'),
  })
  @Min(0)
  durationMinutes?: number;
}
