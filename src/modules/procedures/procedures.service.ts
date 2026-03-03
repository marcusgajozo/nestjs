import { Injectable } from '@nestjs/common';
import { CreateProcedureDto } from './dto/create-procedure.dto';
import { UpdateProcedureDto } from './dto/update-procedure.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Procedure } from './entities/procedure.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProceduresService {
  constructor(
    @InjectRepository(Procedure)
    private readonly procedureRepository: Repository<Procedure>,
  ) {}

  create(createProcedureDto: CreateProcedureDto) {
    const procedure = this.procedureRepository.create(createProcedureDto);
    return this.procedureRepository.save(procedure);
  }

  findAll() {
    return `This action returns all procedures`;
  }

  findOne(id: number) {
    return `This action returns a #${id} procedure`;
  }

  update(id: number, updateProcedureDto: UpdateProcedureDto) {
    return `This action updates a #${id} procedure`;
  }

  remove(id: number) {
    return `This action removes a #${id} procedure`;
  }
}
