import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleModel } from './role.model';
import { RoleModule } from './role.module';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RoleService {
  public constructor(@InjectModel(RoleModel) private readonly roleRepository: typeof RoleModel) {
  }


  public async createRole(dto: CreateRoleDto): Promise<RoleModel>{
    const role = await this.roleRepository.create(dto);
    return role;
  }


  public async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({ where: { value }});
    return role;
  }

}
