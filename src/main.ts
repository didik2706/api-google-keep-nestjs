import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // setup versioning
  app.enableVersioning({
    type: VersioningType.URI
  });
  // setup validation
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(process.env.PORT);
}
bootstrap();