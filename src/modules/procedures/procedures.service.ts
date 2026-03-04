import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { i18nValidationMessage } from 'src/common/helper/i18n-validation-message';
import { Repository } from 'typeorm';
import { CreateProcedureDto } from './dto/create-procedure.dto';
import { UpdateProcedureDto } from './dto/update-procedure.dto';
import { ProcedureEntity } from './entities/procedure.entity';

@Injectable()
export class ProceduresService {
  constructor(
    @InjectRepository(ProcedureEntity)
    private readonly procedureRepository: Repository<ProcedureEntity>,
  ) {}

  create(createProcedureDto: CreateProcedureDto, userId: string) {
    const { name, description, price, returnDays, durationMinutes } =
      createProcedureDto;

    const procedure = this.procedureRepository.create({
      name,
      description,
      price,
      returnDays,
      durationMinutes,
      user: { id: userId },
    });

    void this.procedureRepository.save(procedure);
  }

  async findAll(paginationDto: PaginationDto, userId: string) {
    // TODO: to take class for pagination
    const { page = 1, limit = 10 } = paginationDto;

    const [procedures, totalCount] =
      await this.procedureRepository.findAndCount({
        skip: page - 1,
        take: limit,
        where: { user: { id: userId } },
      });

    return {
      items: procedures,
      meta: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  }

  async findOne(id: string, userId: string) {
    return await this.procedureRepository.findOne({
      where: { id, user: { id: userId } },
    });
  }

  async update(
    id: string,
    updateProcedureDto: UpdateProcedureDto,
    userId: string,
  ) {
    const { name, description, durationMinutes, price, returnDays } =
      updateProcedureDto;

    const procedure = await this.findOne(id, userId);

    if (!procedure) {
      throw new NotFoundException(
        i18nValidationMessage('validation.NOT_FOUND'),
      );
    }

    const updatedAt = new Date();

    void this.procedureRepository.update(procedure.id, {
      name,
      description,
      durationMinutes,
      price,
      returnDays,
      updatedAt,
    });
  }

  async remove(id: string, userId: string) {
    const procedure = await this.findOne(id, userId);

    if (!procedure) {
      throw new NotFoundException();
    }

    return this.procedureRepository.delete(procedure.id);
  }
}
