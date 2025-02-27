-- CreateTable
CREATE TABLE "Log" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "accessedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);
