-- CreateTable
CREATE TABLE "Countrys" (
    "name" TEXT NOT NULL,
    "id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Countrys_id_key" ON "Countrys"("id");
