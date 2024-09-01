import { IsNumber, IsOptional, IsString } from "class-validator";

export class ProductDto {
  @IsString()
  title: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsString()
  categoryId: string;
}

export class GetAllProductsDto {
  @IsOptional()
  @IsString()
  searchTerm?: string;
}
