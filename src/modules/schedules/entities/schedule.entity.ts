import { BaseEntity } from 'src/common/entities/base.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';

@Entity('schedules')
export class ScheduleEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  phone: string;

  @ManyToOne(() => UserEntity, (user) => user.schedules, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @RelationId((schedule: ScheduleEntity) => schedule.user)
  userId: string;
}
