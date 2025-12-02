import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './modules/app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT') || 4201;


  const config = new DocumentBuilder()
    .setTitle('Educational NestJS REST API')
    .setDescription('REST API documentation')
    .setVersion('1.0.0')
    .addTag('@user-of-github')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, documentFactory);

  await app.listen(port, () => {
    console.log('Server has started');
  });
}

bootstrap();
