import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('procedures')
export class Procedure extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'bigint', default: 0 })
  price: number;

  @Column({ name: 'return_days', type: 'int', default: 0 })
  returnDays: number;

  @Column({ name: 'duration_minutes', type: 'int', default: 0 })
  durationMinutes: number;
}
