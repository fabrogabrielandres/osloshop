-- DropIndex
DROP INDEX "Countrys_id_key";

-- AlterTable
ALTER TABLE "Countrys" ADD CONSTRAINT "Countrys_pkey" PRIMARY KEY ("id");
