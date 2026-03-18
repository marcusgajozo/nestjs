import { BaseEntity } from 'src/common/entities/base.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';

@Entity('clients')
export class ClientEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'int', default: 0 })
  price: number;

  @Column({ name: 'return_days', type: 'int', default: 0 })
  returnDays: number;

  @Column({ name: 'duration_minutes', type: 'int', default: 0 })
  durationMinutes: number;

  @ManyToOne(() => UserEntity, (user) => user.clients, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @RelationId((client: ClientEntity) => client.user)
  userId: string;
}
