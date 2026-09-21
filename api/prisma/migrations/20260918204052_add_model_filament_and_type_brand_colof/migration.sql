-- CreateTable
CREATE TABLE "filament" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL,
    "brandId" INTEGER NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "stock" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "filament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "filamentTypes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "filamentTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "filamentBrands" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "filamentBrands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "filamentColors" (
    "id" SERIAL NOT NULL,
    "color" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "filamentColors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FilamentToFilamentColor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_FilamentToFilamentColor_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "filament_name_key" ON "filament"("name");

-- CreateIndex
CREATE UNIQUE INDEX "filamentTypes_name_key" ON "filamentTypes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "filamentBrands_name_key" ON "filamentBrands"("name");

-- CreateIndex
CREATE UNIQUE INDEX "filamentColors_color_key" ON "filamentColors"("color");

-- CreateIndex
CREATE INDEX "_FilamentToFilamentColor_B_index" ON "_FilamentToFilamentColor"("B");

-- AddForeignKey
ALTER TABLE "filament" ADD CONSTRAINT "filament_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "filamentTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filament" ADD CONSTRAINT "filament_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "filamentBrands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FilamentToFilamentColor" ADD CONSTRAINT "_FilamentToFilamentColor_A_fkey" FOREIGN KEY ("A") REFERENCES "filament"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FilamentToFilamentColor" ADD CONSTRAINT "_FilamentToFilamentColor_B_fkey" FOREIGN KEY ("B") REFERENCES "filamentColors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
