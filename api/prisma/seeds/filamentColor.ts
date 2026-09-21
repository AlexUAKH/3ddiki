import { PrismaClientType } from 'prisma/seed';

const filamentColors = [
  { name: 'Black', color: '#000000' },
  { name: 'White', color: '#ffffff' },
  { name: 'Red', color: '#ff0000' },
  { name: 'Green', color: '#00ff00' },
  { name: 'Blue', color: '#0000ff' },
  { name: 'Brown coyote', color: '#81613c' },
  { name: 'Grey', color: '#808080' },
  { name: 'Sunny orange', color: '#ff7235' },
  { name: 'Light grey', color: '#6b6e6e' },
  { name: 'Forest green', color: '#228b22' },
  { name: 'Graphite', color: '#45499e' },
  { name: 'Midnight', color: '#0b1f2d' },
  { name: 'Klein blue', color: '#002fa7' },
  { name: 'Silver', color: '#9c9c9c' },
  { name: 'Dark khaki', color: '#bdb76b' },
  { name: 'Military green', color: '#2c5f34' },
  { name: 'Magenta', color: '#f95e88' },
  { name: 'Clay', color: '#978f81' },
];

export const FilamentColorSeeder = async (prisma: PrismaClientType) => {
  console.log('Seeding filament colors');

  filamentColors
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach(async ({ color, name }) => {
      await prisma.filamentColor.upsert({
        where: { color: color },
        create: {
          color,
          name,
        },
        update: {
          color,
          name,
        },
      });
    });
};
