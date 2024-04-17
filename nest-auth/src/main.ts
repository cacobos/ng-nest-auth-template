import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';
import { AppModule } from './app/app.module';

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  const configSwagger = new DocumentBuilder()
    .setTitle('API para creación de aplicaciones con login')
    .setDescription('API para creación de aplicaciones con login')
    .setVersion('1.0')
    .addTag('skeleton')
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
