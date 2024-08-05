/*
  Warnings:

  - Added the required column `keunggulan` to the `UMKM` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `umkm` ADD COLUMN `keunggulan` VARCHAR(191) NOT NULL;
