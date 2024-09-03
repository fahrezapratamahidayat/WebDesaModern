/*
  Warnings:

  - You are about to drop the column `url` on the `gambargaleri` table. All the data in the column will be lost.
  - Added the required column `blob` to the `GambarGaleri` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `gambargaleri` DROP COLUMN `url`,
    ADD COLUMN `blob` LONGBLOB NOT NULL;
