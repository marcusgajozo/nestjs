import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dtos/pagination.dto';
import { Repository } from 'typeorm';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ScheduleEntity } from './entities/schedule.entity';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(ScheduleEntity)
    private readonly scheduleRepository: Repository<ScheduleEntity>,
  ) {}

  async create(createScheduleDto: CreateScheduleDto, userId: string) {
    const { name, phone } = createScheduleDto;

    const schedule = this.scheduleRepository.create({
      name,
      phone,
      user: { id: userId },
    });

    return await this.scheduleRepository.save(schedule);
  }

  async findAll(paginationQueryDto: PaginationQueryDto, userId: string) {
    const { limit, page } = paginationQueryDto;

    const [schedules, totalCount] = await this.scheduleRepository.findAndCount({
      where: { user: { id: userId } },
      skip: page - 1,
      take: limit,
    });

    return { schedules, totalCount };
  }

  async findOne(id: string, userId: string) {
    const schedule = await this.scheduleRepository.findOne({
      where: { id, user: { id: userId } },
    });

    return schedule;
  }

  async update(
    id: string,
    updateScheduleDto: UpdateScheduleDto,
    userId: string,
  ) {
    const schedule = await this.findOne(id, userId);

    if (!schedule) {
      return schedule;
    }

    const { name, phone } = updateScheduleDto;
    const updatedAt = new Date();

    return await this.scheduleRepository.update(schedule.id, {
      name,
      phone,
      updatedAt,
    });
  }

  async remove(id: string, userId: string) {
    const schedule = await this.findOne(id, userId);

    if (!schedule) {
      return schedule;
    }

    return await this.scheduleRepository.remove(schedule);
  }
}
