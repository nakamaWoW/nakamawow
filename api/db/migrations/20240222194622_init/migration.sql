-- CreateEnum
CREATE TYPE "Raids" AS ENUM ('BFD', 'Gnomeregan');

-- CreateTable
CREATE TABLE "Raider" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "reserves" INTEGER NOT NULL,

    CONSTRAINT "Raider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Raid" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "raid" "Raids" NOT NULL,

    CONSTRAINT "Raid_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Raider_name_key" ON "Raider"("name");
