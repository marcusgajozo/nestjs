import { BaseEntity } from 'src/common/entities/base.entity';
import { AppointmentEntity } from 'src/modules/appointments/entities/appointment.entity';
import { ClientEntity } from 'src/modules/clients/entities/client.entity';
import { ProcedureEntity } from 'src/modules/procedures/entities/procedure.entity';
import { ScheduleTemplateEntity } from 'src/modules/schedule-templates/entities/schedule-template.entity';
import { TimeOffEntity } from 'src/modules/time-offs/entities/time-off.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  phone: string;

  @OneToMany(() => ProcedureEntity, (procedure) => procedure.user)
  procedures: ProcedureEntity[];

  @OneToMany(() => ClientEntity, (client) => client.user)
  clients: ClientEntity[];

  @OneToMany(() => TimeOffEntity, (timeOff) => timeOff.user)
  timeOffs: TimeOffEntity[];

  @OneToMany(
    () => ScheduleTemplateEntity,
    (scheduleTemplate) => scheduleTemplate.user,
  )
  scheduleTemplates: ScheduleTemplateEntity[];

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.user)
  appointments: AppointmentEntity[];
}
