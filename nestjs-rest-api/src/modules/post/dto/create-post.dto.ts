import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'Breaking news !', description: 'New post title' })
  @IsString()
  @IsNotEmpty()
  public readonly title: string;

  @ApiProperty({ example: 'lorem20', description: 'New post text content' })
  @IsString()
  @IsNotEmpty()
  public readonly content: string;
}
