import { IsDateString, IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { i18nValidationMessage } from 'src/common/helper/i18n-validation-message';
import { DayOfWeek } from '../enums/day-of-week.enum';

export class CreateScheduleTemplateDto {
  @IsInt({
    message: i18nValidationMessage('validation.INVALID_INTEGER'),
  })
  @Max(6, {
    message: i18nValidationMessage('validation.INVALID_INTEGER'),
  })
  @Min(0, {
    message: i18nValidationMessage('validation.INVALID_INTEGER'),
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.NOT_EMPTY'),
  })
  dayOfWeek: DayOfWeek;

  @IsNotEmpty({
    message: i18nValidationMessage('validation.NOT_EMPTY'),
  })
  @IsDateString(
    {},
    {
      message: i18nValidationMessage('validation.INVALID_DATE_STRING'),
    },
  )
  startTime: string;

  @IsNotEmpty({
    message: i18nValidationMessage('validation.NOT_EMPTY'),
  })
  @IsDateString(
    {},
    {
      message: i18nValidationMessage('validation.INVALID_DATE_STRING'),
    },
  )
  endTime: string;
}
