import { IsDateString, IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsEmail()
  public email: string;

  @IsOptional()
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
  @IsDateString({}, {
    message: 'Birth date must be a valid ISO 8601 date string. For example 2025-03-17T12:28:00.000Z'
  })
  public birthDate: any;
}