import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto.js';
import { UpdateEmpresaDto } from './dto/update-empresa.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class EmpresasService {
  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreateEmpresaDto) {
    const existeEmpresa = await this.prisma.empresa.findUnique({
      where: { cnpj: dto.cnpj }
    })

    if (existeEmpresa) {
      throw new ConflictException(" Já existe empresa com este CNPJ")
    }
    return this.prisma.empresa.create({ data: dto })
  }

  findAll() {
    return this.prisma.empresa.findMany({ orderBy: { nome: `asc` } });
  }

  async findOne(id: number) {
    const empresa = await this.prisma.empresa.findUnique({
      where: { id }
    })

    if (!empresa) {
      throw new NotFoundException('Empresa não encontrada')
    }

    return empresa;
  }

  async update(id: number, dto: UpdateEmpresaDto) {
    await this.findOne(id)
    return this.prisma.empresa.update({ where: { id }, data: dto });
  }

  async validarEmpresaAtiva(id: number) {
    const empresa = await this.findOne(id)
    if (empresa.ativa === false) {
      throw new BadRequestException('Empresa inativa')
    }

    return empresa;
  }
}
