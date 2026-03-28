import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { i18nValidationMessage } from 'src/common/helper/i18n-validation-message';
import { DayOfWeek } from '../enums/day-of-week.enum';

export class CreateScheduleTemplateDto {
  @IsInt({
    message: i18nValidationMessage('validation.NOT_EMPTY'),
  })
  dayOfWeek: DayOfWeek;

  @IsString({
    message: i18nValidationMessage('validation.INVALID_STRING'),
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.NOT_EMPTY'),
  })
  startTime: string;

  @IsString({
    message: i18nValidationMessage('validation.INVALID_STRING'),
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.NOT_EMPTY'),
  })
  endTime: string;

  @IsInt({
    message: i18nValidationMessage('validation.NOT_EMPTY'),
  })
  slotDurationMinutes: number;
}
