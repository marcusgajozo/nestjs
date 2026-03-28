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
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ResponseDto } from 'src/common/dtos/response.dto';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated/i18n.generated';

@ApiBearerAuth()
@Controller('schedules')
export class SchedulesController {
  constructor(
    private readonly schedulesService: SchedulesService,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createScheduleDto: CreateScheduleDto,
    @UserAuth('userId') userId: string,
  ) {
    await this.schedulesService.create(createScheduleDto, userId);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() paginationQueryDto: PaginationQueryDto,
    @UserAuth('userId') userId: string,
  ) {
    const { limit, page } = paginationQueryDto;

    const { schedules, totalCount } = await this.schedulesService.findAll(
      { limit, page },
      userId,
    );

    return new PaginatedResponseDto(schedules, { page, limit, totalCount });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', VerifyUUIDIdPipe) id: string,
    @UserAuth('userId') userId: string,
  ) {
    const schedule = await this.schedulesService.findOne(id, userId);

    if (!schedule) {
      throw new NotFoundException(this.i18n.translate('validation.NOT_FOUND'));
    }
    return new ResponseDto(schedule);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', VerifyUUIDIdPipe) id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
    @UserAuth('userId') userId: string,
  ) {
    const schedule = await this.schedulesService.update(
      id,
      updateScheduleDto,
      userId,
    );

    if (!schedule) {
      throw new NotFoundException(this.i18n.translate('validation.NOT_FOUND'));
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', VerifyUUIDIdPipe) id: string,
    @UserAuth('userId') userId: string,
  ) {
    const schedule = await this.schedulesService.remove(id, userId);

    if (!schedule) {
      throw new NotFoundException(this.i18n.translate('validation.NOT_FOUND'));
    }
  }
}
