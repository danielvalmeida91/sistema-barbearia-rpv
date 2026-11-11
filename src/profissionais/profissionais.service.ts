import { Injectable } from '@nestjs/common';
import { CreateProfissionaisDto } from './dto/create-profissional.dto.js';
import { UpdateProfissionaisDto } from './dto/update-profissional.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { EmpresasService } from '../empresas/empresas.service.js';

@Injectable()
export class ProfissionaisService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly empresas: EmpresasService
  ) { }

  async create(empresaId: number, dto: CreateProfissionaisDto) {
    await this.empresas.validarEmpresaAtiva(empresaId);

    return this.prisma.profissional.create({
      data: { ...dto, empresaId }
    })
  }

  findAll() {
    return `This action returns all profissionais`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profissionai`;
  }

  update(id: number, updateProfissionaiDto: UpdateProfissionaisDto) {
    return `This action updates a #${id} profissionai`;
  }

  remove(id: number) {
    return `This action removes a #${id} profissionai`;
  }
}
