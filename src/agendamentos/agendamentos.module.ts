import { Module } from '@nestjs/common';
import { AgendamentosService } from './agendamentos.service.js';
import { AgendamentosController } from './agendamentos.controller.js';

@Module({
  controllers: [AgendamentosController],
  providers: [AgendamentosService],
})
export class AgendamentosModule {}
