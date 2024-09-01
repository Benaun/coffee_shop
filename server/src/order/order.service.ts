import { PrismaService } from "@/prisma.service";
import { productObject } from "@/product/product.object";
import { Injectable } from "@nestjs/common";
import { OrderDto } from "./dto/order.dto";

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          include: {
            product: {
              select: productObject,
            },
          },
        },
      },
    });
  }

  async getByUser(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          include: {
            product: {
              select: productObject,
            },
          },
        },
      },
    });
  }

  async createOrder(dto: OrderDto, userId: string) {
    const total = dto.items.reduce(
      (acc, cur) => acc + cur.price * cur.quantity,
      0,
    );
    return this.prisma.order.create({
      data: {
        items: {
          create: dto.items,
        },
        total,
        user: {
          connect: { id: userId },
        },
      },
    });
  }
}
