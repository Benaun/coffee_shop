import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CategoryService } from "./category.service";
import { Auth } from "@/auth/decorators/auth.decorator";
import { CategoryDto } from "./dto/category.dto";

@Controller("categories")
export class CategoryController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly categoryService: CategoryService) { }

  @Get()
  async getAll() {
    return this.categoryService.getAll();
  }

  @Get("by-id/:id")
  async getById(@Param("id") id: string) {
    return this.categoryService.getById(id);
  }

  @Get("by-slug/:slug")
  async getBySlug(@Param("slug") slug: string) {
    return this.categoryService.getBySlug(slug);
  }

  @Auth()
  @HttpCode(200)
  @Post()
  async create() {
    return this.categoryService.create();
  }

  @Auth()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(":id")
  async update(@Param("id") id: string, @Body() dto: CategoryDto) {
    return this.categoryService.update(id, dto);
  }

  @Auth()
  @HttpCode(200)
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.categoryService.delete(id);
  }
}
