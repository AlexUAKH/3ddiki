import bcrypt from 'bcrypt';

export const AdminSeeder = async (prisma: any) => {
  console.log('Seeding admin user');

  const adminEmail = process.env.SEED_ADMIN_EMAIL;
  const adminPassword = process.env.SEED_ADMIN_PASSWORD;
  if (adminEmail && adminPassword) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await prisma.user.upsert({
      where: { email: adminEmail.toLowerCase() },
      create: {
        email: adminEmail.toLowerCase(),
        password: passwordHash,
        role: 'ADMIN',
        name: 'Admin',
        lastName: 'Admin',
      },
      update: { role: 'ADMIN', password: passwordHash },
    });
    console.log('Seed: admin user', adminEmail.toLowerCase());
  }
};
