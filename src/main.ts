import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ logger: true }));

  // setup versioning
  app.enableVersioning({
    type: VersioningType.URI
  });
  // setup validation
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(3000);
}
bootstrap();
