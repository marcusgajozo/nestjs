import { BaseEntity } from 'src/common/entities/base.entity';
import { ClientEntity } from 'src/modules/clients/entities/client.entity';
import { ProcedureEntity } from 'src/modules/procedures/entities/procedure.entity';
import { Column, Entity } from 'typeorm';
import { OneToMany } from 'typeorm';

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
}
