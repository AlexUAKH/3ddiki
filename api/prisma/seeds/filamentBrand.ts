import { PrismaClientType } from 'prisma/seed';

const filamentBrands = ['333', '3D Plast', 'Sunlu', 'Bambu'];

export const FilamentBrandSeeder = async (prisma: PrismaClientType) => {
  console.log('Seeding filament brands');

  filamentBrands.forEach(async (type) => {
    await prisma.filamentBrand.upsert({
      where: { name: type },
      create: {
        name: type,
      },
      update: {
        name: type,
      },
    });
  });
};
