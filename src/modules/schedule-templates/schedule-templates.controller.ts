import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserAuth } from 'src/common/decorator/user-auth.decorator';
import {
  PaginatedResponseDto,
  PaginationQueryDto,
} from 'src/common/dtos/pagination.dto';
import { VerifyUUIDIdPipe } from 'src/common/pipes/verify-uuid-id.pipe';
import { CreateScheduleTemplateDto } from './dto/create-schedule-template.dto';
import { UpdateScheduleTemplateDto } from './dto/update-schedule-template.dto';
import { ResponseDto } from 'src/common/dtos/response.dto';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated/i18n.generated';
import { ScheduleTemplatesService } from './schedule-templates.service';

@ApiBearerAuth()
@Controller('schedule-template-templates')
export class ScheduleTemplatesController {
  constructor(
    private readonly scheduleTemplatesService: ScheduleTemplatesService,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createScheduleDto: CreateScheduleTemplateDto,
    @UserAuth('userId') userId: string,
  ) {
    await this.scheduleTemplatesService.create(createScheduleDto, userId);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() paginationQueryDto: PaginationQueryDto,
    @UserAuth('userId') userId: string,
  ) {
    const { limit, page } = paginationQueryDto;

    const { scheduleTemplates, totalCount } =
      await this.scheduleTemplatesService.findAll({ limit, page }, userId);

    return new PaginatedResponseDto(scheduleTemplates, {
      page,
      limit,
      totalCount,
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', VerifyUUIDIdPipe) id: string,
    @UserAuth('userId') userId: string,
  ) {
    const scheduleTemplate = await this.scheduleTemplatesService.findOne(
      id,
      userId,
    );

    if (!scheduleTemplate) {
      throw new NotFoundException(this.i18n.translate('validation.NOT_FOUND'));
    }
    return new ResponseDto(scheduleTemplate);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', VerifyUUIDIdPipe) id: string,
    @Body() updateScheduleTemplateDto: UpdateScheduleTemplateDto,
    @UserAuth('userId') userId: string,
  ) {
    const scheduleTemplate = await this.scheduleTemplatesService.update(
      id,
      updateScheduleTemplateDto,
      userId,
    );

    if (!scheduleTemplate) {
      throw new NotFoundException(this.i18n.translate('validation.NOT_FOUND'));
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', VerifyUUIDIdPipe) id: string,
    @UserAuth('userId') userId: string,
  ) {
    const scheduleTemplate = await this.scheduleTemplatesService.remove(
      id,
      userId,
    );

    if (!scheduleTemplate) {
      throw new NotFoundException(this.i18n.translate('validation.NOT_FOUND'));
    }
  }
}
