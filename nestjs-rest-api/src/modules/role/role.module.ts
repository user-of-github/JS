import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoleModel } from './role.model';
import { UserModel } from '../user/user.model';
import { UsersRolesModel } from './users-roles.model';

@Module({
  imports: [
    SequelizeModule.forFeature([RoleModel, UserModel, UsersRolesModel])
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService]
})
export class RoleModule {}
