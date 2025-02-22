/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductToCategory" DROP CONSTRAINT "ProductToCategory_categoryType_fkey";

-- DropIndex
DROP INDEX "ProductToCategory_categoryType_idx";

-- DropTable
DROP TABLE "Category";
