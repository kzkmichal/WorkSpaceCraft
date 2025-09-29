-- CreateEnum
CREATE TYPE "ProConType" AS ENUM ('PROS', 'CONS');

-- CreateEnum
CREATE TYPE "SetupDifficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "brand" TEXT,
ADD COLUMN     "model" TEXT;

-- CreateTable
CREATE TABLE "ProductDimension" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "unit" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductDimension_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductTechnicalFeature" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductTechnicalFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductProCon" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "isPro" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductProCon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductUserExperience" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "setupDifficulty" "SetupDifficulty" NOT NULL,
    "assemblyRequired" BOOLEAN NOT NULL DEFAULT false,
    "toolsNeeded" TEXT[],
    "compatibility" TEXT[],
    "userManualLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductUserExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SearchAnalytics" (
    "id" SERIAL NOT NULL,
    "query" TEXT NOT NULL,
    "result_count" INTEGER DEFAULT 0,
    "user_id" TEXT,
    "search_context" TEXT DEFAULT 'unknown',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SearchAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProductDimension_productId_idx" ON "ProductDimension"("productId");

-- CreateIndex
CREATE INDEX "ProductTechnicalFeature_productId_idx" ON "ProductTechnicalFeature"("productId");

-- CreateIndex
CREATE INDEX "ProductProCon_productId_idx" ON "ProductProCon"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductUserExperience_productId_key" ON "ProductUserExperience"("productId");

-- CreateIndex
CREATE INDEX "ProductUserExperience_productId_idx" ON "ProductUserExperience"("productId");

-- CreateIndex
CREATE INDEX "SearchAnalytics_query_idx" ON "SearchAnalytics"("query");

-- CreateIndex
CREATE INDEX "SearchAnalytics_created_at_idx" ON "SearchAnalytics"("created_at" DESC);

-- AddForeignKey
ALTER TABLE "ProductDimension" ADD CONSTRAINT "ProductDimension_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductTechnicalFeature" ADD CONSTRAINT "ProductTechnicalFeature_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductProCon" ADD CONSTRAINT "ProductProCon_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductUserExperience" ADD CONSTRAINT "ProductUserExperience_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
