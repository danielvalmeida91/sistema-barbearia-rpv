/*
  Warnings:

  - You are about to drop the column `ativo` on the `servicos` table. All the data in the column will be lost.
  - Added the required column `duracaoMin` to the `servicos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preco` to the `servicos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `servicos` DROP COLUMN `ativo`,
    ADD COLUMN `duracaoMin` INTEGER NOT NULL,
    ADD COLUMN `preco` DOUBLE NOT NULL;
