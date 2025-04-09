import { AuthDto } from "@/auth/dto/auth.dto";
import { PrismaService } from "@/prisma.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { hash } from "argon2";
import { UserDto } from "./user.dto";
import { Prisma } from "@prisma/client";
import { userObject } from "./user.service copy";

@Injectable()
export class UserService {
  // eslint-disable-next-line prettier/prettier
  constructor(private prisma: PrismaService) { }

  async getUsers() {
    return this.prisma.user.findMany({
      select: {
        name: true,
        email: true,
        phone: true,
        password: false,
      },
    });
  }

  async getById(id: string, selectObject: Prisma.UserSelect = {}) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        ...userObject,
        favorites: {
          select: {
            id: true,
            title: true,
            price: true,
            image: true,
            slug: true,
            category: {
              select: {
                title: true,
              },
            },
          },
        },
        ...selectObject,
      },
    });

    if (!user) throw new Error("User not found");

    return user;
  }

  async toggleFavorite(userId: string, productId: string) {
    const user = await this.getById(userId);

    if (!user) throw new NotFoundException("User not found");

    const isExists = user.favorites.some((product) => product.id === productId);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        favorites: {
          [isExists ? "disconnect" : "connect"]: {
            id: productId,
          },
        },
      },
    });

    return { message: "Success" };
  }

  async create(dto: AuthDto) {
    const user = {
      name: "",
      email: dto.email,
      password: await hash(dto.password),
      phone: "",
    };
    return this.prisma.user.create({
      data: user,
    });
  }

  async update(id: string, dto: UserDto) {
    let data = dto;
    if (dto.password) {
      data = { ...dto, password: await hash(dto.password) };
    }
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
