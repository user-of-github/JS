import { IsArray, IsInt, IsNumber, IsString, Max, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDto {
  @IsNumber()
  @Min(0)
  public price: number;

  @IsString()
  public productId: string;

  @IsNumber()
  @IsInt()
  @Min(0)
  @Max(100)
  public count: number;
}

export class OrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  public items: OrderItemDto[];
}