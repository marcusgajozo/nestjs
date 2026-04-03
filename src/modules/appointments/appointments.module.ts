import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentEntity } from './entities/appointment.entity';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { TimeOffEntity } from '../time-offs/entities/time-off.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentEntity, TimeOffEntity])],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
