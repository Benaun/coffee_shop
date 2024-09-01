import { PrismaService } from "@/prisma.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { categoryObject } from "./category.objext";
import { CategoryDto } from "./dto/category.dto";
import { generateSlug } from "@/assets/genSlug";

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.category.findMany({
      select: categoryObject,
    });
  }

  async getById(id: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
      select: categoryObject,
    });
    if (!category) throw new NotFoundException(" Нет такой ");
    return category;
  }

  async getBySlug(slug: string) {
    const category = await this.prisma.category.findUnique({
      where: { slug },
      select: categoryObject,
    });
    if (!category) throw new NotFoundException(" Нет такой ");
    return category;
  }

  async create() {
    const category = {
      title: "",
      slug: "",
      image: "",
    };
    return this.prisma.category.create({
      data: category,
    });
  }

  async update(id: string, dto: CategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: {
        title: dto.title,
        slug: generateSlug(dto.title),
        image: dto.image,
      },
    });
  }

  async delete(id: string) {
    return await this.prisma.category.delete({
      where: { id },
    });
  }
}
