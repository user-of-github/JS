import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { RoleModel } from '../role/role.model';
import { UsersRolesModel } from '../role/users-roles.model';


export interface UserCreationAttributes {
  email: string;
  password: string;
}


@Table({ tableName: 'users' })
export class UserModel extends Model<UserModel, UserCreationAttributes> {
  @ApiProperty({ example: '1', description: 'Unique ID' })
  @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  declare id: number;

  @ApiProperty({ example: 'email@mail.com', description: 'Unique email' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false})
  email: string;

  @ApiProperty({ example: '123456', description: 'User password' })
  @Column({ type: DataType.STRING, allowNull: false})
  password: string;

  @ApiProperty({ example: 'true', description: 'Is user currently banned or not' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isBanned: boolean;

  @ApiProperty({ example: 'For spam', description: 'Reason of banning (if banned)' })
  @Column({ type: DataType.STRING, allowNull: true })
  banReason: string;

  @BelongsToMany(() => RoleModel, () => UsersRolesModel)
  roles: RoleModel[];
}
