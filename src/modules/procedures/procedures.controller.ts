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
import { VerifyUUIDIdPipe } from 'src/common/pipes/verify-uuid-id.pipe';
import { CreateProcedureDto } from './dto/create-procedure.dto';
import { UpdateProcedureDto } from './dto/update-procedure.dto';
import { ProceduresService } from './procedures.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { User } from 'src/common/decorator/user.decorator';

@ApiBearerAuth()
@Controller('procedures')
export class ProceduresController {
  constructor(private readonly proceduresService: ProceduresService) {}

  @Post()
  create(
    @Body() createProcedureDto: CreateProcedureDto,
    @User('userId') userId: string,
  ) {
    return this.proceduresService.create(createProcedureDto, userId);
  }

  @Get()
  findAll(
    @Query() paginationDto: PaginationDto,
    @User('userId') userId: string,
  ) {
    return this.proceduresService.findAll(paginationDto, userId);
  }

  @Get(':id')
  findOne(
    @Param('id', VerifyUUIDIdPipe) id: string,
    @User('userId') userId: string,
  ) {
    return this.proceduresService.findOne(id, userId);
  }

  @Patch(':id')
  update(
    @Param('id', VerifyUUIDIdPipe) id: string,
    @Body() updateProcedureDto: UpdateProcedureDto,
    @User('userId') userId: string,
  ) {
    return this.proceduresService.update(id, updateProcedureDto, userId);
  }

  @Delete(':id')
  remove(
    @Param('id', VerifyUUIDIdPipe) id: string,
    @User('userId') userId: string,
  ) {
    return this.proceduresService.remove(id, userId);
  }
}
