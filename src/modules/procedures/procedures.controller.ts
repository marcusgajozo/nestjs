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
import { CreateProcedureDto } from './dto/create-procedure.dto';
import { UpdateProcedureDto } from './dto/update-procedure.dto';
import { ProceduresService } from './procedures.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import {
  PaginatedResponseDto,
  PaginationQueryDto,
} from 'src/common/dtos/pagination.dto';
import { User } from 'src/common/decorator/user.decorator';
import { ProcedureEntity } from './entities/procedure.entity';
import { ResponseDto } from 'src/common/dtos/response.dto';

@ApiBearerAuth()
@Controller('procedures')
export class ProceduresController {
  constructor(private readonly proceduresService: ProceduresService) {}

  @Post()
  async create(
    @Body() createProcedureDto: CreateProcedureDto,
    @User('userId') userId: string,
  ) {
    await this.proceduresService.create(createProcedureDto, userId);
  }

  @Get()
  async findAll(
    @Query() paginationQueryDto: PaginationQueryDto,
    @User('userId') userId: string,
  ) {
    const { procedures, totalCount } = await this.proceduresService.findAll(
      paginationQueryDto,
      userId,
    );

    const { limit = 10, page = 1 } = paginationQueryDto;

    return new PaginatedResponseDto<ProcedureEntity>(procedures, {
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
    const procedure = await this.proceduresService.findOne(id, userId);

    if (!procedure) {
      throw new NotFoundException();
    }

    return new ResponseDto(procedure);
  }

  @Patch(':id')
  async update(
    @Param('id', VerifyUUIDIdPipe) id: string,
    @Body() updateProcedureDto: UpdateProcedureDto,
    @User('userId') userId: string,
  ) {
    await this.proceduresService.update(id, updateProcedureDto, userId);
  }

  @Delete(':id')
  async remove(
    @Param('id', VerifyUUIDIdPipe) id: string,
    @User('userId') userId: string,
  ) {
    await this.proceduresService.remove(id, userId);
  }
}
