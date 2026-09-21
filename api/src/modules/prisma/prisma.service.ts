import { Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'generated/prisma/client';

@Injectable()
// implements OnModuleInit, OnModuleDestroy
export class PrismaService extends PrismaClient {
  constructor() {
    //   const connectionString = `${process.env.DATABASE_URL}`;
    //   const pool = new Pool({ connectionString });
    //   const adapter = new PrismaPg(pool);
    // const prisma = new PrismaClient({ adapter });

    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    });
    super({ adapter });
  }

  // async onModuleInit() {
  //   await this.$connect();
  // }

  // async onModuleDestroy() {
  //   await this.$disconnect();
  // }
}
