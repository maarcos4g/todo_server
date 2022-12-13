-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "endDate" DATETIME NOT NULL,
    "description" TEXT,
    "isFinished" BOOLEAN NOT NULL DEFAULT false
);
