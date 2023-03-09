import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['*'],
    methods: ['POST', 'PUT', 'DELETE', 'GET'],
    allowedHeaders: ['content-type']
  });
  await app.listen(3000);
}
bootstrap();
