import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from 'src/common/decorator/user.decorator';
import { PaginationQueryDto } from 'src/common/dtos/pagination.dto';
import { VerifyUUIDIdPipe } from 'src/common/pipes/verify-uuid-id.pipe';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@ApiBearerAuth()
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  async create(
    @Body() createClientDto: CreateClientDto,
    @User('userId') userId: string,
  ) {
    return;
  }

  @Get()
  async findAll(
    @Query() paginationQueryDto: PaginationQueryDto,
    @User('userId') userId: string,
  ) {
    return;
  }

  @Get(':id')
  async findOne(
    @Param('id', VerifyUUIDIdPipe) id: string,
    @User('userId') userId: string,
  ) {
    return;
  }

  @Patch(':id')
  async update(
    @Param('id', VerifyUUIDIdPipe) id: string,
    @Body() updateClientDto: UpdateClientDto,
    @User('userId') userId: string,
  ) {
    return;
  }

  @Delete(':id')
  async remove(
    @Param('id', VerifyUUIDIdPipe) id: string,
    @User('userId') userId: string,
  ) {
    return;
  }
}
