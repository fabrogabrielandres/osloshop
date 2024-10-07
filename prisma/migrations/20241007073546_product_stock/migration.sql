-- CreateTable
CREATE TABLE "ProducStock" (
    "id" TEXT NOT NULL,
    "XS" INTEGER NOT NULL DEFAULT 0,
    "S" INTEGER NOT NULL DEFAULT 0,
    "M" INTEGER NOT NULL DEFAULT 0,
    "L" INTEGER NOT NULL DEFAULT 0,
    "XL" INTEGER NOT NULL DEFAULT 0,
    "XXL" INTEGER NOT NULL DEFAULT 0,
    "XXXL" INTEGER NOT NULL DEFAULT 0,
    "producStockId" TEXT NOT NULL,

    CONSTRAINT "ProducStock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProducStock_producStockId_key" ON "ProducStock"("producStockId");

-- AddForeignKey
ALTER TABLE "ProducStock" ADD CONSTRAINT "ProducStock_producStockId_fkey" FOREIGN KEY ("producStockId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
