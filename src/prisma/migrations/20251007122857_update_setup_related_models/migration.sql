/*
  Warnings:

  - A unique constraint covering the columns `[userId,category]` on the table `Setup` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category` to the `Setup` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SetupCategory" AS ENUM ('HOME_OFFICE', 'OFFICE', 'REMOTE_WORK');

-- CreateEnum
CREATE TYPE "SetupStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Setup" ADD COLUMN     "category" "SetupCategory" NOT NULL,
ADD COLUMN     "status" "SetupStatus" NOT NULL DEFAULT 'DRAFT',
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "imageUrl" DROP NOT NULL;

-- CreateTable
CREATE TABLE "SetupProduct" (
    "id" TEXT NOT NULL,
    "setupId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SetupProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SetupProduct_setupId_idx" ON "SetupProduct"("setupId");

-- CreateIndex
CREATE INDEX "SetupProduct_productId_idx" ON "SetupProduct"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "SetupProduct_setupId_productId_key" ON "SetupProduct"("setupId", "productId");

-- CreateIndex
CREATE INDEX "Product_deletedAt_idx" ON "Product"("deletedAt");

-- CreateIndex
CREATE INDEX "Setup_userId_idx" ON "Setup"("userId");

-- CreateIndex
CREATE INDEX "Setup_status_idx" ON "Setup"("status");

-- CreateIndex
CREATE INDEX "Setup_category_idx" ON "Setup"("category");

-- CreateIndex
CREATE UNIQUE INDEX "Setup_userId_category_key" ON "Setup"("userId", "category");

-- AddForeignKey
ALTER TABLE "SetupProduct" ADD CONSTRAINT "SetupProduct_setupId_fkey" FOREIGN KEY ("setupId") REFERENCES "Setup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SetupProduct" ADD CONSTRAINT "SetupProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
