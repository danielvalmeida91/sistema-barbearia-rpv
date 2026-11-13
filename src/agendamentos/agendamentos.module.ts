import { Module } from '@nestjs/common';
import { AgendamentosService } from './agendamentos.service.js';
import { AgendamentosController } from './agendamentos.controller.js';
import { EmpresasModule } from '../empresas/empresas.module.js';

@Module({
  controllers: [AgendamentosController],
  providers: [AgendamentosService],
  imports: [EmpresasModule]
})
export class AgendamentosModule { }
