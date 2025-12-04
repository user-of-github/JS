import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BanUserDto {
  @ApiProperty({ example: '132314', description: 'User\'s ID' })
  @IsNumber()
  public readonly userId: number;

  @ApiProperty({ example: 'Spam', description: 'Reason of banning' })
  @IsString()
  @IsNotEmpty()
  public readonly banReason: string;
}
