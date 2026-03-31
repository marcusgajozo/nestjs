import { IsEnum, IsISO8601, IsNotEmpty } from 'class-validator';
import { i18nValidationMessage } from 'src/common/helper/i18n-validation-message';
import { DayOfWeek } from '../../../common/enums/day-of-week.enum';

export class CreateScheduleTemplateDto {
  @IsEnum(DayOfWeek, {
    message: i18nValidationMessage('validation.INVALID_ENUM'),
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.NOT_EMPTY'),
  })
  dayOfWeek: DayOfWeek;

  @IsNotEmpty({
    message: i18nValidationMessage('validation.NOT_EMPTY'),
  })
  @IsISO8601(
    {},
    {
      message: i18nValidationMessage('validation.INVALID_DATE_STRING'),
    },
  )
  startTime: string;

  @IsNotEmpty({
    message: i18nValidationMessage('validation.NOT_EMPTY'),
  })
  @IsISO8601(
    {},
    {
      message: i18nValidationMessage('validation.INVALID_DATE_STRING'),
    },
  )
  endTime: string;
}
