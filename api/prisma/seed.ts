import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { PrismaClient } from '../generated/prisma/client';
import { AdminSeeder } from './seeds/admin';
// import { FilamentBrandSeeder } from './seeds/filamentBrand';
// import { FilamentColorSeeder } from './seeds/filamentColor';
// import { FilamentTypeSeeder } from './seeds/filamentType';
import { FilamentBrandSeeder } from './seeds/filamentBrand';
import { FilamentColorSeeder } from './seeds/filamentColor';
import { FilamentTypeSeeder } from './seeds/filamentType';
import { testDataSeeder } from './seeds/testData';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export type PrismaClientType = typeof prisma;

async function main() {
  await AdminSeeder(prisma);

  const testData =
    process.env.SEED_TEST_DATA === 'true' || process.env.SEED_TEST_DATA === '1';
  if (testData) {
    await testDataSeeder(prisma);
  }

  await FilamentTypeSeeder(prisma);
  await FilamentBrandSeeder(prisma);
  await FilamentColorSeeder(prisma);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
