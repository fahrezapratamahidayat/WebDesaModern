-- CreateTable
CREATE TABLE `UMKM` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,
    `jenisUsaha` VARCHAR(191) NOT NULL,
    `produkUtama` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `telepon` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `website` VARCHAR(191) NULL,
    `lokasiGambar` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GambarUMKM` (
    `id` VARCHAR(191) NOT NULL,
    `umkmId` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `keterangan` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GambarUMKM` ADD CONSTRAINT `GambarUMKM_umkmId_fkey` FOREIGN KEY (`umkmId`) REFERENCES `UMKM`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
