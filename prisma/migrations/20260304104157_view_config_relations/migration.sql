/*
  Warnings:

  - You are about to drop the column `config` on the `View` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "View" DROP COLUMN "config",
ADD COLUMN     "search" TEXT;

-- CreateTable
CREATE TABLE "ViewFilter" (
    "id" TEXT NOT NULL,
    "viewId" TEXT NOT NULL,
    "columnId" TEXT NOT NULL,
    "operator" TEXT NOT NULL,
    "value" TEXT,

    CONSTRAINT "ViewFilter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ViewSort" (
    "id" TEXT NOT NULL,
    "viewId" TEXT NOT NULL,
    "columnId" TEXT NOT NULL,
    "direction" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ViewSort_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ViewHiddenColumn" (
    "id" TEXT NOT NULL,
    "viewId" TEXT NOT NULL,
    "columnId" TEXT NOT NULL,

    CONSTRAINT "ViewHiddenColumn_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ViewFilter_viewId_idx" ON "ViewFilter"("viewId");

-- CreateIndex
CREATE INDEX "ViewSort_viewId_idx" ON "ViewSort"("viewId");

-- CreateIndex
CREATE UNIQUE INDEX "ViewHiddenColumn_viewId_columnId_key" ON "ViewHiddenColumn"("viewId", "columnId");

-- AddForeignKey
ALTER TABLE "ViewFilter" ADD CONSTRAINT "ViewFilter_viewId_fkey" FOREIGN KEY ("viewId") REFERENCES "View"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ViewSort" ADD CONSTRAINT "ViewSort_viewId_fkey" FOREIGN KEY ("viewId") REFERENCES "View"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ViewHiddenColumn" ADD CONSTRAINT "ViewHiddenColumn_viewId_fkey" FOREIGN KEY ("viewId") REFERENCES "View"("id") ON DELETE CASCADE ON UPDATE CASCADE;
