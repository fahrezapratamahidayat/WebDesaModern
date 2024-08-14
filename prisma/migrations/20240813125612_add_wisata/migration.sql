-- CreateTable
CREATE TABLE `WisataDesa` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(255) NOT NULL,
    `deskripsi` TEXT NOT NULL,
    `lokasi` VARCHAR(255) NOT NULL,
    `alamat` VARCHAR(255) NOT NULL,
    `telepon` VARCHAR(255) NOT NULL,
    `email` VARCHAR(191) NULL,
    `website` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GambarWisataGaleri` (
    `id` VARCHAR(191) NOT NULL,
    `wisataDesaId` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `keterangan` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GambarWisataGaleri` ADD CONSTRAINT `GambarWisataGaleri_wisataDesaId_fkey` FOREIGN KEY (`wisataDesaId`) REFERENCES `WisataDesa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
