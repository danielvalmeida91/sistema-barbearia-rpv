import { Injectable } from '@nestjs/common';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto.js';
import { UpdateAgendamentoDto } from './dto/update-agendamento.dto.js';

@Injectable()
export class AgendamentosService {
  create(createAgendamentoDto: CreateAgendamentoDto) {
    return 'This action adds a new agendamento';
  }

  findAll() {
    return `This action returns all agendamentos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} agendamento`;
  }

  update(id: number, updateAgendamentoDto: UpdateAgendamentoDto) {
    return `This action updates a #${id} agendamento`;
  }

  remove(id: number) {
    return `This action removes a #${id} agendamento`;
  }
}
