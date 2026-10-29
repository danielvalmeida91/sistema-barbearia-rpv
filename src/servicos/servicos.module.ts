import { Module } from '@nestjs/common';
import { ServicosService } from './servicos.service.js';
import { ServicosController } from './servicos.controller.js';

@Module({
  controllers: [ServicosController],
  providers: [ServicosService],
})
export class ServicosModule {}
