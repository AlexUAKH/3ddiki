import { HttpStatus, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const port = process.env.PORT ?? '3006';
  const app = await NestFactory.create(AppModule, { rawBody: true });

  // app.use(cookieParser());
  const allowedOrigins = [
    process.env.ADMIN_URL || 'http://localhost:3000', // admin
    process.env.CLIENT_URL || 'http://localhost:3001', // client,
  ];

  app.enableCors({
    origin: (origin, callback) => {
      // Разрешаем запросы без origin (например, Postman или мобильные приложения)
      // или если origin находится в нашем списке разрешенных
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Blocked by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // credentials: true, // Нужно, если фронтенды отправляют куки или сессии
  });

  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      whitelist: true,
    }),
  );

  app.setGlobalPrefix('api');

  await app.listen(port);
  Logger.log(`Listening on http://localhost:${port}`);
}
bootstrap();
