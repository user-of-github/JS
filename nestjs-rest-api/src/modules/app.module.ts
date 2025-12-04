import { Module } from '@nestjs/common';
import path from 'node:path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { UserModel } from './user/user.model';
import { RoleModule } from './role/role.module';
import { RoleModel } from './role/role.model';
import { UsersRolesModel } from './role/users-roles.model';
import { AuthModule } from './auth/auth.module';
import { UtilsModule } from './utils/utils.module';
import { PostModule } from './post/post.module';
import { PostModel } from './post/post.model';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        `.env.${process.env.NODE_ENV}.local`,
        `.env.${process.env.NODE_ENV}`,
        '.env.local',
        '.env',
      ]
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, 'static'),
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>("DB_HOST"),
        port: configService.get<number>("DB_PORT"),
        username: configService.get<string>("DB_USERNAME"),
        password: configService.get<string>("DB_PASSWORD"),
        database: configService.get<string>("DB_NAME"),
        models: [UserModel, RoleModel, UsersRolesModel, PostModel],
        autoLoadModels: true
      }),
    }),
    UserModule,
    RoleModule,
    AuthModule,
    UtilsModule,
    PostModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
