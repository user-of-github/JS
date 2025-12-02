import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './user.model';
import { RoleModel } from '../role/role.model';
import { UsersRolesModel } from '../role/users-roles.model';

@Module({
  imports: [SequelizeModule.forFeature([UserModel, RoleModel, UsersRolesModel])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
