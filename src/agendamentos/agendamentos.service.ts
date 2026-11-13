import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto.js';
import { UpdateStatusDto } from './dto/update-status.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { EmpresasService } from '../empresas/empresas.service.js';

const DETALHES = {
  cliente: { select: { id: true, nome: true, telefone: true } },
  profissional: { select: { id: true, nome: true } },
  servicos: {
    include: {
      servico: { select: { id: true, nome: true, duracaoMin: true } },
    }
  }

}

const hora = (d: Date) =>
  d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

@Injectable()
export class AgendamentosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly empresas: EmpresasService
  ) { }

  async create(empresaId: number, dto: CreateAgendamentoDto) {
    await this.empresas.validarEmpresaAtiva(empresaId)

    const inicio = new Date(dto.inicio)
    if (inicio <= new Date()) {
      throw new BadRequestException('Não é possível agendar numa data antiga')
    }

    const cliente = await this.prisma.cliente.findFirst({
      where: { empresaId, id: dto.clienteId }
    })

    if (!cliente) {
      throw new NotFoundException("Cliente não encontrado nesta empresa")
    }

    const profissional = await this.prisma.profissional.findFirst({
      where: { id: dto.profissionalId, empresaId }
    })

    if (!profissional) {
      throw new NotFoundException("Profissional não encontrado nesta empresa")
    }

    if (!profissional.ativo) {
      throw new NotFoundException("Profissional inativo não recebe agendamentos")
    }

    const servicos = await this.prisma.servico.findMany({
      where: { empresaId, id: { in: dto.servicoIds } }
    })

    if (servicos.length !== dto.servicoIds.length) {
      throw new NotFoundException("Serviço não encontrado nesta empresa")
    }

    const duracaoTotal = servicos.reduce((soma, s) => soma + s.duracaoMin, 0)
    const fim = new Date(inicio.getTime() + duracaoTotal * 60_000)

    const conflito = await this.prisma.agendamento.findFirst({
      where: {
        empresaId,
        profissionalId: dto.profissionalId,
        status: 'AGENDADO',
        inicio: { lt: fim },
        fim: { gt: inicio }
      }
    })

    if (conflito) {
      throw new ConflictException(
        `${profissional.nome} já tem atendimento das ` + `${hora(conflito.inicio)} às ${hora(conflito.fim)}`
      )
    }

    return this.prisma.agendamento.create({
      data: {
        inicio,
        fim,
        empresaId,
        clienteId: dto.clienteId,
        profissionalId: dto.profissionalId,
        servicos: {
          create: servicos.map((s) => ({
            servicoId: s.id,
            precoCobrado: s.preco
          }))
        }
      },
      include: DETALHES
    });
  }

  findAll() {
    return `This action returns all agendamentos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} agendamento`;
  }

  atualizarStatus(id: number, updateAgendamentoDto: UpdateStatusDto) {
    return `This action updates a #${id} agendamento`;
  }

  remove(id: number) {
    return `This action removes a #${id} agendamento`;
  }
}
