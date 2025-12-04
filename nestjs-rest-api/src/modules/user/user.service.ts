import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleService } from '../role/role.service';
import { BanUserDto } from './dto/ban-user.dto';
import { AddRoleToUserDto } from './dto/add-user-role.dto';

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

  public async banUser(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);

    if (!user) {
      throw new NotFoundException(`User "${dto.userId} not found`);
    }

    user.isBanned = true;
    user.banReason = dto.banReason;

    await user.save();

    return user;
  }

  public async addRoleToUser(dto: AddRoleToUserDto) {
    const [user, role] = await Promise.all([
      this.userRepository.findByPk(dto.userId),
      this.roleService.getRoleByValue(dto.value)
    ]);

    if (role && user) {
      await user.$add('role', role.id);
      return dto;
    } else {
      throw new NotFoundException(`Unable to add role "${dto.value}" for user "${dto.userId}". User or role not found.`)
    }
  }
}
