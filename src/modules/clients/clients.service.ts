import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dtos/pagination.dto';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientEntity } from './entities/client.entity';
import { i18nValidationMessage } from 'src/common/helper/i18n-validation-message';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  async create(createClientDto: CreateClientDto, userId: string) {
    const { name, phone } = createClientDto;

    const client = this.clientRepository.create({
      name,
      phone,
      user: { id: userId },
    });

    return await this.clientRepository.save(client);
  }

  async findAll(paginationQueryDto: PaginationQueryDto, userId: string) {
    const { limit, page } = paginationQueryDto;

    const [clients, totalCount] = await this.clientRepository.findAndCount({
      where: { userId },
      skip: page - 1,
      take: limit,
    });

    return { clients, totalCount };
  }

  async findOne(id: string, userId: string) {
    const client = await this.clientRepository.findOne({
      where: { id, userId },
    });

    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto, userId: string) {
    const client = await this.findOne(id, userId);

    if (!client) {
      throw new NotFoundException(
        i18nValidationMessage('validation.NOT_FOUND'),
      );
    }

    const { name, phone } = updateClientDto;
    const updatedAt = new Date();

    return await this.clientRepository.update(client.id, {
      name,
      phone,
      updatedAt,
    });
  }

  async remove(id: string, userId: string) {
    const client = await this.clientRepository.findOne({
      where: { id, userId },
    });

    if (!client) {
      return null;
    }

    return await this.clientRepository.remove(client);
  }
}
