import { AuthDto } from "@/auth/dto/auth.dto";
import { PrismaService } from "@/prisma.service";
import { Injectable } from "@nestjs/common";
import { hash } from "argon2";
import { UserDto } from "./user.dto";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

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

  async getById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
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
