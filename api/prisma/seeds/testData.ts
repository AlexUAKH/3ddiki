import bcrypt from 'bcrypt';

export const testDataSeeder = async (prisma: any) => {
  console.log('Seeding test data');

  const demoPassword = process.env.SEED_DEMO_PASSWORD ?? 'DemoPass123!';
  const hash = await bcrypt.hash(demoPassword, 10);

  await prisma.user.upsert({
    where: { email: 'admin@demo.local' },
    create: { email: 'admin@demo.local', passwordHash: hash, role: 'ADMIN' },
    update: { passwordHash: hash, role: 'ADMIN' },
  });

  await prisma.user.upsert({
    where: { email: 'user@demo.local' },
    create: { email: 'user@demo.local', passwordHash: hash, role: 'USER' },
    update: { passwordHash: hash },
  });

  console.log('Seed: demo users admin@demo.local, user@demo.local');
  console.log(
    'Seed: demo password from SEED_DEMO_PASSWORD (default DemoPass123!)',
  );
};
