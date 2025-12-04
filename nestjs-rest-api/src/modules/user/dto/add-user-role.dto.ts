import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddRoleToUserDto {
  @ApiProperty({ example: '133', description: 'User\'s ID' })
  @IsNumber()
  public readonly userId: number;

  @ApiProperty({ example: 'ADMIN', description: 'Title of existing role' })
  @IsString()
  @IsNotEmpty()
  public readonly value: string;
}
