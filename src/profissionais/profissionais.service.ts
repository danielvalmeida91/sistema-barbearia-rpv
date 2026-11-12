import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(empresaId: number, ativos: boolean) {
    await this.empresas.validarEmpresaAtiva(empresaId);

    return this.prisma.profissional.findMany({
      where: { empresaId, ativo: ativos ? true : undefined },
      orderBy: { nome: 'asc' }
    })
  }

  async findOne(empresaId: number, id: number) {
    await this.empresas.validarEmpresaAtiva(empresaId);

    const profissional = await this.prisma.profissional.findUnique({
      where: { empresaId, id }
    })

    if (!profissional) {
      throw new NotFoundException('Profissional não encontrado')
    }

    return profissional;
  }

  async update(empresaId: number, id: number, dto: UpdateProfissionaisDto) {
    await this.empresas.validarEmpresaAtiva(empresaId);

    await this.findOne(empresaId, id)

    return this.prisma.profissional.update({ where: { id, empresaId }, data: dto })
  }

  async remove(empresaId: number, id: number) {
    await this.empresas.validarEmpresaAtiva(empresaId);

    await this.findOne(empresaId, id)

    const totalAgendamentos = await this.prisma.agendamento.count({
      where: { profissionalId: id, empresaId }
    })

    if (totalAgendamentos > 0) {
      throw new ConflictException('O profissional possui agendamentos. Desative-o com PATCH { ativo: false }')
    }

    return this.prisma.profissional.delete({ where: { empresaId, id } })
  }
}
