-- CreateTable
CREATE TABLE "Logs" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "raiderName" TEXT NOT NULL,
    "raiderReserves" INTEGER NOT NULL,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("id")
);
