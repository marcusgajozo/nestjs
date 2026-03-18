import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('clients')
export class ClientEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  phone: string;
}
