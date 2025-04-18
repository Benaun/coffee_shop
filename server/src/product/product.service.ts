import { PrismaService } from "@/prisma.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { productObject } from "./product.object";
import { ProductDto } from "./dto/product.dto";
import { generateSlug } from "@/assets/genSlug";
import { CategoryService } from "@/category/category.service";

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private categoryService: CategoryService,
    // eslint-disable-next-line prettier/prettier
  ) { }

  async create() {
    const product = {
      title: "",
      slug: " ",
      description: "",
      price: 0,
      image: "",
    };

    return await this.prisma.product.create({
      data: product,
    });
  }

  async update(id: string, dto: ProductDto) {
    const { title, description, price, categoryId, image } = dto;

    await this.categoryService.getById(categoryId);

    return this.prisma.product.update({
      where: { id },
      data: {
        title,
        description,
        price,
        image,
        slug: generateSlug(title),
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
  }

  async delete(id: string) {
    return await this.prisma.product.delete({
      where: { id },
    });
  }

  async getAll(searchTerm?: string) {
    if (searchTerm) {
      return this.search(searchTerm);
    }
    return this.prisma.product.findMany({
      select: productObject,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async search(searchTerm: string) {
    return this.prisma.product.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        ],
      },
      select: productObject,
    });
  }

  async byCategory(categorySlug: string) {
    const products = await this.prisma.product.findMany({
      where: {
        category: {
          slug: categorySlug,
        },
      },
      select: productObject,
    });
    if (!products) throw new NotFoundException(" Такого нет ");
    return products;
  }

  async bySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      select: productObject,
    });
    if (!product) throw new NotFoundException(" Такого нет ");
    return product;
  }
}
