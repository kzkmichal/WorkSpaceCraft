/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `ProductDimension` table. All the data in the column will be lost.
  - You are about to drop the column `isPro` on the `ProductProCon` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ProductProCon` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ProductTechnicalFeature` table. All the data in the column will be lost.
  - Added the required column `type` to the `ProductProCon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductDimension" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "ProductProCon" DROP COLUMN "isPro",
DROP COLUMN "updatedAt",
ADD COLUMN     "type" "ProConType" NOT NULL;

-- AlterTable
ALTER TABLE "ProductTechnicalFeature" DROP COLUMN "updatedAt";
