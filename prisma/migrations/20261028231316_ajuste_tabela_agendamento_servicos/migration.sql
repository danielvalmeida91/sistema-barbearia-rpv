/*
  Warnings:

  - You are about to drop the `AgendamentoServico` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `AgendamentoServico` DROP FOREIGN KEY `AgendamentoServico_agendamentoId_fkey`;

-- DropForeignKey
ALTER TABLE `AgendamentoServico` DROP FOREIGN KEY `AgendamentoServico_servicoId_fkey`;

-- DropTable
DROP TABLE `AgendamentoServico`;

-- CreateTable
CREATE TABLE `agendamento_servicos` (
    `precoCobrado` DOUBLE NOT NULL,
    `servicoId` INTEGER NOT NULL,
    `agendamentoId` INTEGER NOT NULL,

    PRIMARY KEY (`agendamentoId`, `servicoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `agendamento_servicos` ADD CONSTRAINT `agendamento_servicos_servicoId_fkey` FOREIGN KEY (`servicoId`) REFERENCES `servicos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `agendamento_servicos` ADD CONSTRAINT `agendamento_servicos_agendamentoId_fkey` FOREIGN KEY (`agendamentoId`) REFERENCES `agendamentos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
