/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `SubCategory` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[categoryType,slug]` on the table `SubCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryType` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryType` to the `SubCategory` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('HOME', 'REMOTE', 'OFFICE');

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "SubCategory" DROP CONSTRAINT "SubCategory_categoryId_fkey";

-- DropIndex
DROP INDEX "SubCategory_categoryId_slug_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "categoryId",
ADD COLUMN     "categoryType" "CategoryType" NOT NULL;

-- AlterTable
ALTER TABLE "SubCategory" DROP COLUMN "categoryId",
ADD COLUMN     "categoryType" "CategoryType" NOT NULL;

-- DropTable
DROP TABLE "Category";

-- CreateIndex
CREATE UNIQUE INDEX "SubCategory_categoryType_slug_key" ON "SubCategory"("categoryType", "slug");
