import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleService } from '../role/role.service';

@Injectable()
export class UserService {
  private static readonly DefaultRole = 'USER';

  public constructor(
    @InjectModel(UserModel) private readonly userRepository: typeof UserModel,
    private readonly roleService: RoleService
  ) {}

  public async createUser(dto: CreateUserDto) {
    const [user, defaultRole] = await Promise.all([
      this.userRepository.create(dto),
      this.roleService.getRoleByValue(UserService.DefaultRole)
    ]);

    if (defaultRole) {
      await user.$set('roles', [defaultRole.id]);
      user.roles = [defaultRole];
    }

    return user;
  }

  public async getAll(): Promise<UserModel[]> {
    const users = await this.userRepository.findAll({ include: { all: true }});
    return users;
  }

  public async getUserByEmail(email: string): Promise<UserModel | null> {
    const user = await this.userRepository.findOne({ where: { email }, include: { all: true } });
    return user?.get({ plain: true }) || null;
  }
}
