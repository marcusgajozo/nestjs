import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserAuth } from 'src/common/decorator/user-auth.decorator';
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
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createClientDto: CreateClientDto,
    @UserAuth('userId') userId: string,
  ) {
    return await this.clientsService.create(createClientDto, userId);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() paginationQueryDto: PaginationQueryDto,
    @UserAuth('userId') userId: string,
  ) {
    return await this.clientsService.findAll(paginationQueryDto, userId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', VerifyUUIDIdPipe) id: string,
    @UserAuth('userId') userId: string,
  ) {
    return await this.clientsService.findOne(id, userId);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', VerifyUUIDIdPipe) id: string,
    @Body() updateClientDto: UpdateClientDto,
    @UserAuth('userId') userId: string,
  ) {
    return await this.clientsService.update(id, updateClientDto, userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', VerifyUUIDIdPipe) id: string,
    @UserAuth('userId') userId: string,
  ) {
    return await this.clientsService.remove(id, userId);
  }
}
