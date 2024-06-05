-- CreateTable
CREATE TABLE "Art" (
    "id" SERIAL NOT NULL,
    "idArt" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "longTitle" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "webImage" TEXT NOT NULL,
    "principalOrFirstMaker" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Art_pkey" PRIMARY KEY ("id")
);
