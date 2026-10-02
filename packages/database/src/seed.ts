import { PrismaClient, Role, PropertyType, TransactionType, ListingStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Database Seeding process for Hostinger VPS Environment...');

  // 1. Create Super Admin User
  const adminUser = await prisma.user.upsert({
    where: { email: 'superadmin@estateflow.io' },
    update: {
      fullName: 'Master Super Admin',
      role: Role.SUPER_ADMIN,
    },
    create: {
      email: 'superadmin@estateflow.io',
      fullName: 'Master Super Admin',
      phone: '+919000072227',
      passwordHash: '$2b$10$Ep3DkM8R2k1...sample_hashed_pass', // Default admin pass hash
      role: Role.SUPER_ADMIN,
      isEmailVerified: true,
      isPhoneVerified: true,
    },
  });

  console.log('✅ Super Admin created:', adminUser.email);

  // 2. Create Sample Agent User
  const agentUser = await prisma.user.upsert({
    where: { email: 'agent@estateflow.io' },
    update: {},
    create: {
      email: 'agent@estateflow.io',
      fullName: 'Kokapet Prime Realty',
      phone: '+919000072228',
      passwordHash: '$2b$10$Ep3DkM8R2k1...sample_hashed_pass',
      role: Role.AGENT,
      isEmailVerified: true,
      isPhoneVerified: true,
    },
  });

  console.log('✅ Agent User created:', agentUser.email);

  console.log('🎉 Database seeding completed cleanly!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
