import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dtos/pagination.dto';
import { Repository } from 'typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AppointmentEntity } from './entities/appointment.entity';
import { DayOfWeek } from 'src/common/enums/day-of-week.enum';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated/i18n.generated';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(AppointmentEntity)
    private readonly appointmentRepository: Repository<AppointmentEntity>,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  async verifyConflictTemplate(
    dayOfWeek: DayOfWeek,
    startTime: string,
    endTime: string,
    userId: string,
  ) {
    const conflictCount = await this.appointmentRepository
      .createQueryBuilder('template')

      .where('template.user.id = :userId', { userId })
      .andWhere('template.dayOfWeek = :dayOfWeek', { dayOfWeek })

      .andWhere('template.startTime < :endTime', { endTime })
      .andWhere('template.endTime > :startTime', { startTime })

      .getCount();

    return conflictCount > 0;
  }

  async create(createAppointmentDto: CreateAppointmentDto, userId: string) {
    const { dayOfWeek, endTime, startTime } = createAppointmentDto;

    const hasConflict = await this.verifyConflictTemplate(
      dayOfWeek,
      startTime,
      endTime,
      userId,
    );

    if (hasConflict) {
      throw new ConflictException(
        this.i18n.translate('validation.SCHEDULE_TEMPLATE_CONFLICT'),
      );
    }

    const appointment = this.appointmentRepository.create({
      dayOfWeek,
      endTime,
      startTime,
      user: { id: userId },
    });

    return await this.appointmentRepository.save(appointment);
  }

  async findAll(paginationQueryDto: PaginationQueryDto, userId: string) {
    const { limit, page } = paginationQueryDto;

    const [appointments, totalCount] =
      await this.appointmentRepository.findAndCount({
        where: { user: { id: userId } },
        skip: page - 1,
        take: limit,
      });

    return { appointments, totalCount };
  }

  async findOne(id: string, userId: string) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id, user: { id: userId } },
    });

    if (!appointment) {
      throw new NotFoundException(this.i18n.translate('validation.NOT_FOUND'));
    }

    return appointment;
  }

  async update(
    id: string,
    updateAppointmentDto: UpdateAppointmentDto,
    userId: string,
  ) {
    const appointment = await this.findOne(id, userId);

    const { dayOfWeek, endTime, startTime } = updateAppointmentDto;

    const hasConflict = await this.verifyConflictTemplate(
      dayOfWeek ?? appointment.dayOfWeek,
      startTime ?? appointment.startTime,
      endTime ?? appointment.endTime,
      userId,
    );

    if (hasConflict) {
      throw new ConflictException(
        this.i18n.translate('validation.SCHEDULE_TEMPLATE_CONFLICT'),
      );
    }

    const updatedAt = new Date();

    return await this.appointmentRepository.update(appointment.id, {
      dayOfWeek,
      endTime,
      startTime,
      updatedAt,
    });
  }

  async remove(id: string, userId: string) {
    const appointment = await this.findOne(id, userId);
    return await this.appointmentRepository.remove(appointment);
  }
}
