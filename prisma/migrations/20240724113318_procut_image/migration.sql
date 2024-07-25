-- CreateTable
CREATE TABLE "ProcutImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProcutImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProcutImage" ADD CONSTRAINT "ProcutImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
