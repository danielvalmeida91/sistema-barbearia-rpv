import { Module } from '@nestjs/common';
import { ServicosService } from './servicos.service.js';
import { ServicosController } from './servicos.controller.js';
import { EmpresasModule } from '../empresas/empresas.module.js';

@Module({
  controllers: [ServicosController],
  providers: [ServicosService],
  imports: [EmpresasModule]
})
export class ServicosModule { }
