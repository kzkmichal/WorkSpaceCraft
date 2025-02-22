/*
  Warnings:

  - You are about to drop the column `categoryType` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `subcategoryId` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fullSlug]` on the table `Subcategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fullSlug` to the `Subcategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_subcategoryId_fkey";

-- DropIndex
DROP INDEX "Subcategory_slug_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "categoryType",
DROP COLUMN "subcategoryId";

-- AlterTable
ALTER TABLE "Subcategory" ADD COLUMN     "fullSlug" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ProductToSubcategory" (
    "productId" TEXT NOT NULL,
    "subcategoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductToSubcategory_pkey" PRIMARY KEY ("productId","subcategoryId")
);

-- CreateTable
CREATE TABLE "ProductToCategory" (
    "productId" TEXT NOT NULL,
    "categoryType" "CategoryType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductToCategory_pkey" PRIMARY KEY ("productId","categoryType")
);

-- CreateIndex
CREATE INDEX "ProductToSubcategory_subcategoryId_idx" ON "ProductToSubcategory"("subcategoryId");

-- CreateIndex
CREATE INDEX "ProductToSubcategory_productId_idx" ON "ProductToSubcategory"("productId");

-- CreateIndex
CREATE INDEX "ProductToCategory_productId_idx" ON "ProductToCategory"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Subcategory_fullSlug_key" ON "Subcategory"("fullSlug");

-- AddForeignKey
ALTER TABLE "ProductToSubcategory" ADD CONSTRAINT "ProductToSubcategory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductToSubcategory" ADD CONSTRAINT "ProductToSubcategory_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "Subcategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductToCategory" ADD CONSTRAINT "ProductToCategory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
