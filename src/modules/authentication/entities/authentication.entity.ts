import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('authentication')
export class AuthenticationEntity extends BaseEntity {
  @Column()
  email: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;
}
