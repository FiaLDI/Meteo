/*
  Warnings:

  - You are about to drop the column `city` on the `Weather` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Weather` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Weather` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Weather` table. All the data in the column will be lost.
  - Added the required column `cityId` to the `Weather` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Weather_city_date_key";

-- AlterTable
ALTER TABLE "Weather" DROP COLUMN "city",
DROP COLUMN "latitude",
DROP COLUMN "longitude",
DROP COLUMN "updatedAt",
ADD COLUMN     "cityId" TEXT NOT NULL,
ADD COLUMN     "isStale" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "City_name_key" ON "City"("name");

-- CreateIndex
CREATE INDEX "Weather_cityId_idx" ON "Weather"("cityId");

-- CreateIndex
CREATE INDEX "Weather_cityId_createdAt_idx" ON "Weather"("cityId", "createdAt");

-- AddForeignKey
ALTER TABLE "Weather" ADD CONSTRAINT "Weather_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;
