import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfissionaisService } from './profissionais.service.js';
import { CreateProfissionaisDto } from './dto/create-profissional.dto.js';
import { UpdateProfissionaisDto } from './dto/update-profissional.dto.js';
import { EmpresaId } from '../common/empresa-id.decorator.js';

@Controller('profissionais')
export class ProfissionaisController {
  constructor(private readonly profissionaisService: ProfissionaisService) { }

  @Post()
  create(@EmpresaId() empresaId: number, @Body() dto: CreateProfissionaisDto) {

    return this.profissionaisService.create(empresaId, dto);

  }

  @Get()
  findAll() {
    return this.profissionaisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profissionaisService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfissionaisDto: UpdateProfissionaisDto) {
    return this.profissionaisService.update(+id, updateProfissionaisDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profissionaisService.remove(+id);
  }
}
