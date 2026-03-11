import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dtos/pagination.dto';
import { i18nValidationMessage } from 'src/common/helper/i18n-validation-message';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientEntity } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly procedureRepository: Repository<ClientEntity>,
  ) {}

  async create(createClientDto: CreateClientDto, userId: string) {
    const { name, description, price, returnDays, durationMinutes } =
      createClientDto;

    const client = this.procedureRepository.create({
      name,
      description,
      price,
      returnDays,
      durationMinutes,
      user: { id: userId },
    });

    return await this.procedureRepository.save(client);
  }

  async findAll(paginationQueryDto: PaginationQueryDto, userId: string) {
    const { page = 1, limit = 10 } = paginationQueryDto;

    const [clients, totalCount] = await this.procedureRepository.findAndCount({
      skip: page - 1,
      take: limit,
      where: { user: { id: userId } },
    });

    return { clients, totalCount };
  }

  async findOne(id: string, userId: string) {
    return await this.procedureRepository.findOne({
      where: { id, user: { id: userId } },
    });
  }

  async update(id: string, updateClientDto: UpdateClientDto, userId: string) {
    const { name, description, durationMinutes, price, returnDays } =
      updateClientDto;

    const client = await this.findOne(id, userId);

    if (!client) {
      throw new NotFoundException(
        i18nValidationMessage('validation.NOT_FOUND'),
      );
    }

    const updatedAt = new Date();

    void this.procedureRepository.update(client.id, {
      name,
      description,
      durationMinutes,
      price,
      returnDays,
      updatedAt,
    });
  }

  async remove(id: string, userId: string) {
    const client = await this.findOne(id, userId);

    if (!client) {
      throw new NotFoundException();
    }

    return this.procedureRepository.delete(client.id);
  }
}
