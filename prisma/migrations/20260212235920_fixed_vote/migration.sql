/*
  Warnings:

  - The primary key for the `participant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `participant` table. The data in that column could be lost. The data in that column will be cast from `Char(36)` to `Int`.
  - The primary key for the `ticket` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `ticket` table. The data in that column could be lost. The data in that column will be cast from `Char(36)` to `Int`.
  - The primary key for the `vote` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `vote` table. The data in that column could be lost. The data in that column will be cast from `Char(36)` to `Int`.
  - You are about to alter the column `ticketId` on the `vote` table. The data in that column could be lost. The data in that column will be cast from `Char(36)` to `Int`.
  - You are about to alter the column `participantId` on the `vote` table. The data in that column could be lost. The data in that column will be cast from `Char(36)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `vote` DROP FOREIGN KEY `Vote_participantId_fkey`;

-- DropForeignKey
ALTER TABLE `vote` DROP FOREIGN KEY `Vote_ticketId_fkey`;

-- DropIndex
DROP INDEX `Participant_name_idx` ON `participant`;

-- DropIndex
DROP INDEX `Ticket_number_idx` ON `ticket`;

-- AlterTable
ALTER TABLE `participant` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `ticket` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `vote` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `ticketId` INTEGER NOT NULL,
    MODIFY `participantId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Vote` ADD CONSTRAINT `Vote_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vote` ADD CONSTRAINT `Vote_participantId_fkey` FOREIGN KEY (`participantId`) REFERENCES `Participant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
