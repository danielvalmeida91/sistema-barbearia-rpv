import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { ConfigModule } from '@nestjs/config';
import { EmpresasModule } from './empresas/empresas.module.js';
import { ClientesModule } from './clientes/clientes.module.js';
import { ProfissionaisModule } from './profissionais/profissionais.module.js';
import { ServicosModule } from './servicos/servicos.module.js';
import { AgendamentosModule } from './agendamentos/agendamentos.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    // ObserveModule.forRoot({
    //   appKey: 'YOUR_APP_KEY',
    //   appSecret: 'YOUR_APP_SECRET',
    //   serviceId: 'sistema-barbearia-rpv',
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    EmpresasModule,
    ClientesModule,
    ProfissionaisModule,
    ServicosModule,
    AgendamentosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule { }
