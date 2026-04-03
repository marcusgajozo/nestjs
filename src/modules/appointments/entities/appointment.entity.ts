import { BaseEntity } from 'src/common/entities/base.entity';
import { ClientEntity } from 'src/modules/clients/entities/client.entity';
import { ProcedureEntity } from 'src/modules/procedures/entities/procedure.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';

@Entity('appointments')
export class AppointmentEntity extends BaseEntity {
  @Column({ name: 'procedure_name', nullable: true })
  procedureName?: string;

  @Column({ name: 'procedure_price', type: 'int', nullable: true })
  procedurePrice?: number;

  @Column({ name: 'procedure_follow_up_days', type: 'int', nullable: true })
  procedureFollowUpDays?: number;

  @Column({ name: 'client_name', nullable: true })
  clientName?: string;

  @Column({ name: 'phone_client', nullable: true })
  phoneClient?: string;

  @Column({ type: 'timestamp', name: 'start_date' })
  startDate: string;

  @Column({ type: 'timestamp', name: 'end_date' })
  endDate: string;

  @ManyToOne(() => ClientEntity, (client) => client.appointments, {
    nullable: true,
  })
  @JoinColumn({ name: 'client_id' })
  client?: ClientEntity;

  @RelationId((appointment: AppointmentEntity) => appointment.client)
  clientId?: string;

  @ManyToOne(() => ProcedureEntity, (procedure) => procedure.appointments, {
    nullable: true,
  })
  @JoinColumn({ name: 'procedure_id' })
  procedure?: ProcedureEntity;

  @RelationId((appointment: AppointmentEntity) => appointment.procedure)
  procedureId?: string;

  @ManyToOne(() => UserEntity, (user) => user.appointments, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @RelationId((appointment: AppointmentEntity) => appointment.user)
  userId?: string;
}
