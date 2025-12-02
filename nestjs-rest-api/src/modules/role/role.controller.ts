import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserModel } from '../user/user.model';
import { RoleModel } from './role.model';

@ApiTags('Roles')
@Controller('roles')
export class RoleController {
  public constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: 'Creating a role' })
  @ApiResponse({status: 201, type: RoleModel })
  @Post()
  public create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }


  @ApiOperation({ summary: 'Getting a role by value (name)' })
  @ApiResponse({status: 200, type: RoleModel })
  @Get('/:value')
  public getByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
