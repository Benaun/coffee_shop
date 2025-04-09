import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Put,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { Auth } from "@/auth/decorators/auth.decorator";
import { CurrentUser } from "@/auth/decorators/user.decorator";
import { UserDto } from "./user.dto";

@Controller("/users")
export class UserController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly userService: UserService) { }

  @Auth()
  @Get("profile")
  async getProfile(@CurrentUser("id") id: string) {
    return this.userService.getById(id);
  }

  @Auth()
  @Patch("profile/favorites/:productId")
  @HttpCode(200)
  async toggleFavorites(
    @CurrentUser("id") id: string,
    @Param("productId") productId: string,
  ) {
    return this.userService.toggleFavorite(id, productId);
  }

  @Auth()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put("profile")
  async updateProfile(@CurrentUser("id") id: string, @Body() dto: UserDto) {
    return this.userService.update(id, dto);
  }

  @Auth()
  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @Auth()
  @HttpCode(200)
  @Delete(":id")
  async deleteUser(@Param("id") id: string) {
    return this.userService.delete(id);
  }
}
