import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Put,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { Auth } from "@/auth/decorators/auth.decorator";
import { CurrentUser } from "@/auth/decorators/user.decorator";
import { Role } from "@prisma/client";
import { UserDto } from "./user.dto";

@Controller("/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @Get("profile")
  async getProfile(@CurrentUser("id") id: string) {
    return this.userService.getById(id);
  }

  @Auth()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put("profile")
  async updateProfile(@CurrentUser("id") id: string, @Body() dto: UserDto) {
    return this.userService.update(id, dto);
  }

  @Auth(Role.ADMIN)
  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @Auth(Role.ADMIN)
  @HttpCode(200)
  @Delete(":id")
  async deleteUser(@Param("id") id: string) {
    return this.userService.delete(id);
  }
}
