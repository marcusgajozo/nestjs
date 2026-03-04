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

@ApiBearerAuth()
@Controller('procedures')
export class ProceduresController {
  constructor(private readonly proceduresService: ProceduresService) {}

  @Post()
  create(@Body() createProcedureDto: CreateProcedureDto) {
    return this.proceduresService.create(createProcedureDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.proceduresService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', VerifyUUIDIdPipe) id: string) {
    return this.proceduresService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', VerifyUUIDIdPipe) id: string,
    @Body() updateProcedureDto: UpdateProcedureDto,
  ) {
    return this.proceduresService.update(id, updateProcedureDto);
  }

  @Delete(':id')
  remove(@Param('id', VerifyUUIDIdPipe) id: string) {
    return this.proceduresService.remove(id);
  }
}
