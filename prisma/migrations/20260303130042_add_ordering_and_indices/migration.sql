/*
  Warnings:

  - Added the required column `order` to the `Row` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Row" ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Table" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "View" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "Base_userId_idx" ON "Base"("userId");

-- CreateIndex
CREATE INDEX "Column_tableId_order_idx" ON "Column"("tableId", "order");

-- CreateIndex
CREATE INDEX "Row_tableId_order_idx" ON "Row"("tableId", "order");

-- CreateIndex
CREATE INDEX "Row_values_idx" ON "Row" USING GIN ("values");

-- CreateIndex
CREATE INDEX "Table_baseId_idx" ON "Table"("baseId");

-- CreateIndex
CREATE INDEX "View_tableId_order_idx" ON "View"("tableId", "order");
