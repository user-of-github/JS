import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Unique role' })
  @IsString()
  @IsNotEmpty()
  public readonly value: string;

  @ApiProperty({ example: 'Role with all rights', description: 'Description of this role' })
  @IsString()
  @IsNotEmpty()
  public readonly description: string;
}
