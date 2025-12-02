import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from '../user/user.model';
import { UsersRolesModel } from './users-roles.model';


export interface RoleCreationAttributes {
  value: string;
  description: string;
}


@Table({ tableName: 'roles' })
export class RoleModel extends Model<RoleModel, RoleCreationAttributes> {
  @ApiProperty({ example: '1', description: 'Unique ID' })
  @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  declare id: number;

  @ApiProperty({ example: 'Admin', description: 'Unique role' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false})
  value: string;

  @ApiProperty({ example: 'The main role ever', description: 'Role description' })
  @Column({ type: DataType.STRING, allowNull: false})
  description: string;

  @BelongsToMany(() => UserModel, () => UsersRolesModel)
  users: UserModel[];
}
