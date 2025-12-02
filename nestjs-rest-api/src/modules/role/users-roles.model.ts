import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { UserModel } from '../user/user.model';
import { RoleModel } from './role.model';


@Table({ tableName: 'users_roles', createdAt: false, updatedAt: false })
export class UsersRolesModel extends Model<UsersRolesModel> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @ForeignKey(() => RoleModel)
  @Column({ type: DataType.INTEGER})
  roleId: number;

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER})
  userId: number;
}
