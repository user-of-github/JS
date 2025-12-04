import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from '../user/user.model';

export interface PostCreationAttributes {
  title: string;
  content: string;
  userId: number;
  image: string;
}

@Table({tableName: 'posts'})
export class PostModel extends Model<PostModel, PostCreationAttributes> {
  @ApiProperty({ example: '1', description: 'Unique ID' })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: string;

  @ApiProperty({ example: 'Breaking news', description: 'Post title' })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({ example: '25W MagSafe power bank Xmas savings at up to 60% off', description: 'Post text content' })
  @Column({ type: DataType.STRING, allowNull: false })
  content: string;

  @ApiProperty({ example: 'Magsafe.png', description: 'Post image name' })
  @Column({ type: DataType.STRING, allowNull: false })
  image: string;

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @BelongsTo(() => UserModel)
  author: UserModel;
}
