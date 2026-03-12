-- DropIndex
DROP INDEX "ViewFilter_viewId_idx";

-- DropIndex
DROP INDEX "ViewSort_viewId_idx";

-- AlterTable
ALTER TABLE "Table" ADD COLUMN     "rowCount" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "ViewFilter_viewId_columnId_idx" ON "ViewFilter"("viewId", "columnId");

-- CreateIndex
CREATE INDEX "ViewSort_viewId_order_idx" ON "ViewSort"("viewId", "order");
