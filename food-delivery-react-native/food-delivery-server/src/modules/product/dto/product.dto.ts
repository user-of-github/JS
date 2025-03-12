import { IsNumber, IsPositive, IsString } from 'class-validator';

export class ProductDto {
  @IsString()
  public readonly name: string;

  @IsString()
  public readonly description: string;

  @IsString()
  public readonly image: string;

  @IsString()
  public readonly categoryId: string;

  @IsNumber()
  public readonly price: number;
}
