import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import IORedis from 'ioredis';
import session from 'express-session';
import { parseBoolean } from './libs/common/utils/parse-boolean.util';
import { RedisStore } from 'connect-redis';


const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  
  app.use(cookieParser(configService.getOrThrow<string>('COOKIES_SECRET')));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({ 
    origin: configService.getOrThrow<string>('ALLOWED_ORIGIN'),
    credentials: true,
    exposedHeaders: ['set-cookie']
  });

  const redis = new IORedis(configService.getOrThrow<string>('REDIS_URI'));

  app.use(session({
    secret: configService.getOrThrow<string>('SESSION_SECRET'),
    name: configService.getOrThrow<string>('SESSION_NAME'),
    resave: true,
    saveUninitialized: false,
    cookie: {
      domain: configService.getOrThrow<string>('SESSION_DOMAIN'),
      maxAge: Number.parseInt(configService.getOrThrow('SESSION_MAX_AGE')),
      httpOnly: parseBoolean(configService.getOrThrow<string>('SESSION_HTTP_ONLY')),
      secure: parseBoolean(configService.getOrThrow<string>('SESSION_SECURE')),
      sameSite: 'lax'
    },
    store: new RedisStore({
      client: redis,
      prefix: configService.getOrThrow<string>('SESSION_FOLDER')
    })
  }))
  
  await app.listen(configService.getOrThrow<number>('APP_PORT'));
};


bootstrap();
