import { Module } from '@nestjs/common';
import { ProfissionaisService } from './profissionais.service.js';
import { ProfissionaisController } from './profissionais.controller.js';
import { EmpresasModule } from '../empresas/empresas.module.js';

@Module({
  controllers: [ProfissionaisController],
  providers: [ProfissionaisService],
  imports: [EmpresasModule],
})
export class ProfissionaisModule { }
