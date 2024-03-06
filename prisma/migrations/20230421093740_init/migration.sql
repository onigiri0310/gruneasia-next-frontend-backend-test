-- CreateTable
CREATE TABLE `Area` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `displayName` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Company` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `prefectureId` INTEGER NOT NULL,
    `phone` VARCHAR(191) NULL,
    `postcode` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `local` VARCHAR(191) NOT NULL,
    `streetAddress` VARCHAR(191) NULL,
    `businessHour` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `fax` VARCHAR(191) NULL,
    `url` VARCHAR(191) NULL,
    `licenceNumber` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Postcode` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `postcode` VARCHAR(191) NULL,
    `prefectureKana` VARCHAR(191) NULL,
    `cityKana` VARCHAR(191) NULL,
    `localKana` VARCHAR(191) NULL,
    `prefecture` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `local` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Prefecture` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `areaId` INTEGER NULL,
    `name` VARCHAR(191) NULL,
    `displayName` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_prefectureId_fkey` FOREIGN KEY (`prefectureId`) REFERENCES `Prefecture`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prefecture` ADD CONSTRAINT `Prefecture_areaId_fkey` FOREIGN KEY (`areaId`) REFERENCES `Area`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
