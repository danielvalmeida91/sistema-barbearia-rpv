import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ServicosService } from './servicos.service.js';
import { CreateServicoDto } from './dto/create-servico.dto.js';
import { UpdateServicoDto } from './dto/update-servico.dto.js';
import { EmpresaId } from '../common/empresa-id.decorator.js';

@Controller('servicos')
export class ServicosController {
  constructor(private readonly servicosService: ServicosService) { }

  @Post()
  create(
    @EmpresaId() empresaId: number,
    @Body() dto: CreateServicoDto
  ) {
    return this.servicosService.create(empresaId, dto);
  }

  @Get()
  findAll(
    @EmpresaId() empresaId: number,
  ) {
    return this.servicosService.findAll(empresaId);
  }

  @Get(':id')
  findOne(
    @EmpresaId() empresaId: number,
    @Param('id', ParseIntPipe) id: number) {
    return this.servicosService.findOne(empresaId, id);
  }

  @Patch(':id')
  update(
    @EmpresaId() empresaId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateServicoDto) {
    return this.servicosService.update(empresaId, id, dto);
  }

  @Delete(':id')
  remove(
    @EmpresaId() empresaId: number,
    @Param('id', ParseIntPipe) id: number) {
    return this.servicosService.remove(empresaId, id);
  }
}
