import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ nullable: true, name: 'updated_at' })
  updatedAt?: Date;

  @Column({ nullable: true, name: 'deleted_at' })
  deletedAt?: Date;
}
