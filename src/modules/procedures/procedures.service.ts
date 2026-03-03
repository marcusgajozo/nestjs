import { Injectable } from '@nestjs/common';
import { CreateProcedureDto } from './dto/create-procedure.dto';
import { UpdateProcedureDto } from './dto/update-procedure.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Procedure } from './entities/procedure.entity';
import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated/i18n.generated';

@Injectable()
export class ProceduresService {
  constructor(
    @InjectRepository(Procedure)
    private readonly procedureRepository: Repository<Procedure>,
    private i18n: I18nService<I18nTranslations>,
  ) {}

  create(createProcedureDto: CreateProcedureDto) {
    const procedure = this.procedureRepository.create(createProcedureDto);
    return this.procedureRepository.save(procedure);
  }

  findAll() {
    return this.procedureRepository.find();
  }

  findOne(id: string) {
    return this.procedureRepository.findOne({ where: { id } });
  }

  update(id: string, updateProcedureDto: UpdateProcedureDto) {
    return this.procedureRepository.update(id, updateProcedureDto);
  }

  remove(id: string) {
    return this.procedureRepository.delete(id);
  }
}
