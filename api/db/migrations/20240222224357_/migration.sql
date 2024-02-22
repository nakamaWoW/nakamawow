-- CreateEnum
CREATE TYPE "Raids" AS ENUM ('BFD', 'Gnomeregan');

-- CreateEnum
CREATE TYPE "Class" AS ENUM ('Warrior', 'Paladin', 'Priest', 'Rogue', 'Warlock', 'Hunter', 'Mage', 'Druid', 'Unknown');

-- CreateEnum
CREATE TYPE "Specialization" AS ENUM ('DPS', 'Tank', 'Healer', 'Unknown');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Officer', 'Raider', 'Trial', 'Unknown');

-- CreateTable
CREATE TABLE "Raider" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "class" "Class" NOT NULL,
    "spec" "Specialization" NOT NULL,
    "role" "Role" NOT NULL,
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

-- CreateTable
CREATE TABLE "_RaidToRaider" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Raider_name_key" ON "Raider"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_RaidToRaider_AB_unique" ON "_RaidToRaider"("A", "B");

-- CreateIndex
CREATE INDEX "_RaidToRaider_B_index" ON "_RaidToRaider"("B");

-- AddForeignKey
ALTER TABLE "_RaidToRaider" ADD CONSTRAINT "_RaidToRaider_A_fkey" FOREIGN KEY ("A") REFERENCES "Raid"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RaidToRaider" ADD CONSTRAINT "_RaidToRaider_B_fkey" FOREIGN KEY ("B") REFERENCES "Raider"("id") ON DELETE CASCADE ON UPDATE CASCADE;
