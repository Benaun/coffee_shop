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
import { Role } from "@prisma/client";
import { Auth } from "@/auth/decorators/auth.decorator";
import { CategoryDto } from "./dto/category.dto";

@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll() {
    return this.categoryService.getAll();
  }

  @Get("by-slug/:slug")
  async getBySlug(@Param("slug") slug: string) {
    return this.categoryService.getBySlug(slug);
  }

  @Auth(Role.ADMIN)
  @HttpCode(200)
  @Post()
  async create() {
    return this.categoryService.create();
  }

  @Auth(Role.ADMIN)
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(":id")
  async update(@Param("id") id: string, @Body() dto: CategoryDto) {
    return this.categoryService.update(id, dto);
  }

  @Auth(Role.ADMIN)
  @HttpCode(200)
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.categoryService.delete(id);
  }
}
