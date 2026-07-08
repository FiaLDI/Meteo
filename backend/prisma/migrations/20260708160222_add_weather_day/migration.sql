/*
  Warnings:

  - A unique constraint covering the columns `[cityId,day]` on the table `Weather` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `day` to the `Weather` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Weather_cityId_createdAt_idx";

-- DropIndex
DROP INDEX "Weather_cityId_idx";

-- AlterTable
ALTER TABLE "Weather" ADD COLUMN     "day" INTEGER NOT NULL,
ALTER COLUMN "isStale" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Weather_cityId_day_key" ON "Weather"("cityId", "day");
