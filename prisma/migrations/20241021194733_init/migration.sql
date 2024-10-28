-- CreateTable
CREATE TABLE "Boda" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Boda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invitados" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "TipoHab" TEXT NOT NULL,
    "Codigo" INTEGER NOT NULL,
    "In" TIMESTAMP(3) NOT NULL,
    "Out" TIMESTAMP(3) NOT NULL,
    "Nights" INTEGER NOT NULL,
    "Tarifa" DOUBLE PRECISION NOT NULL,
    "Total" DOUBLE PRECISION,
    "Deposito" BOOLEAN NOT NULL DEFAULT false,
    "ModoDePago" TEXT,
    "Observaciones" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "BodaId" TEXT NOT NULL,

    CONSTRAINT "Invitados_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Boda_name_key" ON "Boda"("name");

-- AddForeignKey
ALTER TABLE "Invitados" ADD CONSTRAINT "Invitados_BodaId_fkey" FOREIGN KEY ("BodaId") REFERENCES "Boda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
