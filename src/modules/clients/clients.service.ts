import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dtos/pagination.dto';
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
    return;
  }

  async findAll(paginationQueryDto: PaginationQueryDto, userId: string) {
    return;
  }

  async findOne(id: string, userId: string) {
    return;
  }

  async update(id: string, updateClientDto: UpdateClientDto, userId: string) {
    return;
  }

  async remove(id: string, userId: string) {
    return;
  }
}
