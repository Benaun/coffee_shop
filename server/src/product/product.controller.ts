import {
  Controller,
  Query,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
  HttpCode,
  Post,
  Put,
  Delete,
  Body,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { Auth } from "@/auth/decorators/auth.decorator";
import { ProductDto } from "./dto/product.dto";

@Controller("products")
export class ProductController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly productService: ProductService) { }

  @UsePipes(new ValidationPipe())
  @Get()
  async getAll(@Query("searchTerm") searchTerm?: string) {
    return this.productService.getAll(searchTerm);
  }

  @Get("by-slug/:slug")
  async getBySlug(@Param("slug") slug: string) {
    return this.productService.bySlug(slug);
  }

  @Get("by-category/:categorySlug")
  async getByCategory(@Param("categorySlug") categorySlug: string) {
    return this.productService.byCategory(categorySlug);
  }

  @Auth()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  async createProduct() {
    return this.productService.create();
  }

  @Auth()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(":id")
  async updateProduct(@Param("id") id: string, @Body() dto: ProductDto) {
    return this.productService.update(id, dto);
  }

  @Auth()
  @HttpCode(200)
  @Delete("id")
  async deleteProduct(@Param("id") id: string) {
    return this.productService.delete(id);
  }
}
