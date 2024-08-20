/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `ArticleDesa` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `isi` to the `ArticleDesa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `ArticleDesa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `articledesa` ADD COLUMN `gambarUrl` VARCHAR(255) NULL,
    ADD COLUMN `isi` LONGTEXT NOT NULL,
    ADD COLUMN `slug` VARCHAR(255) NOT NULL,
    ADD COLUMN `status` ENUM('Draft', 'Publikasi', 'Arsip') NOT NULL DEFAULT 'Draft';

-- CreateIndex
CREATE UNIQUE INDEX `ArticleDesa_slug_key` ON `ArticleDesa`(`slug`);
