-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isReported" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "moderatedAt" TIMESTAMP(3),
ADD COLUMN     "moderatedBy" TEXT,
ADD COLUMN     "reportCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "reportReason" TEXT;
