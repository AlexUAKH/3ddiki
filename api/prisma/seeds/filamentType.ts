import { PrismaClientType } from 'prisma/seed';

const filamentTypes = ['PLA', 'PETg', 'PETg Glow'];

export const FilamentTypeSeeder = async (prisma: PrismaClientType) => {
  console.log('Seeding filament types');

  filamentTypes.forEach(async (type) => {
    await prisma.filamentType.upsert({
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
