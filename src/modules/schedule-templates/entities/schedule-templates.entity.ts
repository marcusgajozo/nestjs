import { BaseEntity } from 'src/common/entities/base.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';

@Entity('schedule_templates')
export class ScheduleTemplateEntity extends BaseEntity {
  @Column({ type: 'int', name: 'day_of_week' })
  dayOfWeek: number;

  @Column({ type: 'time', name: 'start_time' })
  startTime: string;

  @Column({ type: 'time', name: 'end_time' })
  endTime: string;

  @Column({ type: 'int', name: 'slot_duration_minutes', default: 60 })
  slotDurationMinutes: number;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean;

  @ManyToOne(() => UserEntity, (user) => user.scheduleTemplates, {
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @RelationId(
    (scheduleTemplate: ScheduleTemplateEntity) => scheduleTemplate.user,
  )
  userId: string;
}
