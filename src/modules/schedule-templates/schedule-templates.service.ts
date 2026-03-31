import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dtos/pagination.dto';
import { Repository } from 'typeorm';
import { CreateScheduleTemplateDto } from './dto/create-schedule-template.dto';
import { UpdateScheduleTemplateDto } from './dto/update-schedule-template.dto';
import { ScheduleTemplateEntity } from './entities/schedule-templates.entity';

@Injectable()
export class ScheduleTemplatesService {
  constructor(
    @InjectRepository(ScheduleTemplateEntity)
    private readonly scheduleTemplateRepository: Repository<ScheduleTemplateEntity>,
  ) {}

  private extractTime(isoString: string): string {
    return isoString.substring(11, 19);
  }

  async create(
    createScheduleTemplateDto: CreateScheduleTemplateDto,
    userId: string,
  ) {
    const { dayOfWeek, endTime, startTime } = createScheduleTemplateDto;

    const scheduleTemplate = this.scheduleTemplateRepository.create({
      dayOfWeek,
      endTime: this.extractTime(endTime),
      startTime: this.extractTime(startTime),
      user: { id: userId },
    });

    return await this.scheduleTemplateRepository.save(scheduleTemplate);
  }

  async findAll(paginationQueryDto: PaginationQueryDto, userId: string) {
    const { limit, page } = paginationQueryDto;

    const [scheduleTemplates, totalCount] =
      await this.scheduleTemplateRepository.findAndCount({
        where: { user: { id: userId } },
        skip: page - 1,
        take: limit,
      });

    return { scheduleTemplates, totalCount };
  }

  async findOne(id: string, userId: string) {
    const scheduleTemplate = await this.scheduleTemplateRepository.findOne({
      where: { id, user: { id: userId } },
    });

    return scheduleTemplate;
  }

  async update(
    id: string,
    updateScheduleTemplateDto: UpdateScheduleTemplateDto,
    userId: string,
  ) {
    const scheduleTemplate = await this.findOne(id, userId);

    if (!scheduleTemplate) {
      return scheduleTemplate;
    }

    const { dayOfWeek, endTime, startTime } = updateScheduleTemplateDto;
    const updatedAt = new Date();

    return await this.scheduleTemplateRepository.update(scheduleTemplate.id, {
      dayOfWeek,
      endTime: endTime ? this.extractTime(endTime) : undefined,
      startTime: startTime ? this.extractTime(startTime) : undefined,
      updatedAt,
    });
  }

  async remove(id: string, userId: string) {
    const scheduleTemplate = await this.findOne(id, userId);

    if (!scheduleTemplate) {
      return scheduleTemplate;
    }

    return await this.scheduleTemplateRepository.remove(scheduleTemplate);
  }
}
