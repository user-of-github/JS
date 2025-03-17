import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsEmail()
  public email: string;

  @IsString()
  @MinLength(2)
  public name: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(1000)
  public bio: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  public location: string;

  @IsOptional()
  public birthDate: any;
}