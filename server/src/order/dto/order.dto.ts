import { IsArray, IsNumber, IsString } from "class-validator";

export class OrderItemDto {
  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsString()
  productId: string;
}

export class OrderDto {
  @IsArray()
  items: OrderItemDto[];
}
