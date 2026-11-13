import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateServicoDto } from './dto/create-servico.dto.js';
import { UpdateServicoDto } from './dto/update-servico.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { EmpresasService } from '../empresas/empresas.service.js';

@Injectable()
export class ServicosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly empresas: EmpresasService,
  ) { }
  async create(empresaId: number, dto: CreateServicoDto) {
    await this.empresas.validarEmpresaAtiva(empresaId)

    return this.prisma.servico.create({
      data: { ...dto, empresaId }
    })
  }

  async findAll(empresaId: number,) {
    await this.empresas.validarEmpresaAtiva(empresaId)

    return this.prisma.servico.findMany({
      where: { empresaId },
      orderBy: { nome: 'asc' }
    })
  }

  async findOne(empresaId: number, id: number) {
    await this.empresas.validarEmpresaAtiva(empresaId)

    const servico = await this.prisma.servico.findUnique({
      where: { empresaId, id }
    })

    if (!servico) {
      throw new NotFoundException('Serviço não encontrado')
    }

    return servico
  }

  async update(empresaId: number, id: number, dto: UpdateServicoDto) {
    await this.empresas.validarEmpresaAtiva(empresaId)
    await this.findOne(empresaId, id)

    return this.prisma.servico.update({
      where: { empresaId, id },
      data: dto
    })
  }

  async remove(empresaId: number, id: number) {
    await this.empresas.validarEmpresaAtiva(empresaId)

    const usos = await this.prisma.agendamentoServico.count({
      where: { empresaId, servicoId: id }
    })

    if (usos > 0) {
      throw new ConflictException('Serviço já utilizado em agendamentos e não pode ser excluído')
    }

    return this.prisma.servico.delete({
      where: { empresaId, id }
    })
  }
}
