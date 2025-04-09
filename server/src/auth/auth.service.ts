import { PrismaService } from "@/prisma.service";
import { UserService } from "@/user/user.service";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthDto } from "./dto/auth.dto";
import { verify } from "argon2";
import { User } from "@prisma/client";
import { omit } from "lodash";

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private userService: UserService,
    private prisma: PrismaService,
    // eslint-disable-next-line prettier/prettier
  ) { }

  private async issueTokens(userId: string) {
    const payload = { id: userId };
    const accessToken = this.jwt.sign(payload, {
      expiresIn: "1h",
    });
    const refreshToken = this.jwt.sign(payload, {
      expiresIn: "7d",
    });
    return { accessToken, refreshToken };
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.userService.getByEmail(dto.email);
    if (!user) throw new NotFoundException("User not found");
    const isValid = await verify(user.password, dto.password);
    if (!isValid) throw new UnauthorizedException("Invalid data");
    return user;
  }

  private omitPassword(user: User) {
    return omit(user, ["password"]);
  }

  async buildResponseObject(user: User) {
    const tokens = await this.issueTokens(user.id);
    return { user: this.omitPassword(user), ...tokens };
  }

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);
    return this.buildResponseObject(user);
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken);
    if (!result) throw new UnauthorizedException("Invalid token");
    const user = await this.userService.getById(result.id);
    return this.buildResponseObject(user);
  }

  async register(dto: AuthDto) {
    const userExists = await this.userService.getByEmail(dto.email);
    if (userExists) {
      throw new BadRequestException("Пользователь уже существует");
    }
    const user = await this.userService.create(dto);
    return this.buildResponseObject(user);
  }
}
