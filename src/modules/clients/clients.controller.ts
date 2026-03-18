import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { VerifyUUIDIdPipe } from 'src/common/pipes/verify-uuid-id.pipe';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientsService } from './clients.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import {
  PaginatedResponseDto,
  PaginationQueryDto,
} from 'src/common/dtos/pagination.dto';
import { User } from 'src/common/decorator/user.decorator';
import { ClientEntity } from './entities/client.entity';
import { ResponseDto } from 'src/common/dtos/response.dto';

@ApiBearerAuth()
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  async create(
    @Body() createClientDto: CreateClientDto,
    @User('userId') userId: string,
  ) {
    await this.clientsService.create(createClientDto, userId);
  }

  @Get()
  async findAll(
    @Query() paginationQueryDto: PaginationQueryDto,
    @User('userId') userId: string,
  ) {
    const { clients, totalCount } = await this.clientsService.findAll(
      paginationQueryDto,
      userId,
    );

    const { limit = 10, page = 1 } = paginationQueryDto;

    return new PaginatedResponseDto<ClientEntity>(clients, {
      page,
      limit,
      totalCount,
    });
  }

  @Get(':id')
  async findOne(
    @Param('id', VerifyUUIDIdPipe) id: string,
    @User('userId') userId: string,
  ) {
    const client = await this.clientsService.findOne(id, userId);

    if (!client) {
      throw new NotFoundException();
    }

    return new ResponseDto(client);
  }

  @Patch(':id')
  async update(
    @Param('id', VerifyUUIDIdPipe) id: string,
    @Body() updateClientDto: UpdateClientDto,
    @User('userId') userId: string,
  ) {
    await this.clientsService.update(id, updateClientDto, userId);
  }

  @Delete(':id')
  async remove(
    @Param('id', VerifyUUIDIdPipe) id: string,
    @User('userId') userId: string,
  ) {
    await this.clientsService.remove(id, userId);
  }
}
