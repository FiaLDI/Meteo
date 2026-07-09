/*
  Warnings:

  - Added the required column `weatherCode` to the `Weather` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Weather" ADD COLUMN     "weatherCode" INTEGER NOT NULL;
