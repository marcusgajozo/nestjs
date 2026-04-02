import { BaseEntity } from 'src/common/entities/base.entity';
import { DayOfWeek } from 'src/common/enums/day-of-week.enum';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';

@Entity('appointments')
export class AppointmentEntity extends BaseEntity {
  procedureName?: string;

  procedurePrice?: number;

  procedureFollowUpDays?: number;

  clientName?: string;

  phoneClient?: string;

  startDate: string;

  endDate: string;

  clientId?: string;

  procedureId?: string;

  userId: string;
}
