import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  public constructor(@InjectModel(UserModel) private readonly userRepository: typeof UserModel) {}

  public async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  public async getAll(): Promise<UserModel[]> {
    const users = await this.userRepository.findAll();
    return users;
  }
}
