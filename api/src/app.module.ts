import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { FilamentModule } from './modules/filament/filament.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ProductsModule } from './modules/products/products.module';
import { StorageModule } from './modules/storage/storage.module';
import { UserModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    AuthModule,
    PrismaModule,
    UserModule,
    FilamentModule,
    ProductsModule,
    AdminModule,
    RouterModule.register([
      {
        path: 'admin',
        module: AdminModule,
      },
    ]),
    StorageModule,

    //   transport: {
    //     host: process.env.MAIL_HOST, // e.g., smtp.gmail.com
    //     port: Number(process.env.MAIL_PORT || 465),
    //     secure: true,
    //     auth: {
    //       user: process.env.MAIL_USER,
    //       pass: process.env.MAIL_PASS,
    //     },
    //   },
    //   defaults: {
    //     from: process.env.MAIL_FROM,
    //   },
    //   template: {
    //     dir: process.cwd() + '/templates/',
    //     adapter: new HandlebarsAdapter(),
    //     options: {
    //       strict: true,
    //     },
    //   },
    // }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
