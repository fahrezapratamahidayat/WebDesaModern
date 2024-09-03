/*
  Warnings:

  - You are about to drop the column `url` on the `gambarumkm` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `gambarwisatagaleri` table. All the data in the column will be lost.
  - Added the required column `blob` to the `GambarUMKM` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blob` to the `GambarWisataGaleri` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `gambarumkm` DROP COLUMN `url`,
    ADD COLUMN `blob` LONGBLOB NOT NULL;

-- AlterTable
ALTER TABLE `gambarwisatagaleri` DROP COLUMN `url`,
    ADD COLUMN `blob` LONGBLOB NOT NULL;
