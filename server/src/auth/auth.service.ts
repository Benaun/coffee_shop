import { EmailService } from "@/email/email.service";
import { PrismaService } from "@/prisma.service";
import { UserService } from "@/user/user.service";
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthDto } from "./dto/auth.dto";
import { Role, type User } from "@prisma/client";
import { omit } from "lodash";
import { verify } from "argon2";

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private userService: UserService,
    private emailService: EmailService,
    private prisma: PrismaService,
  ) {}

  private readonly TOKEN_EXPIRATION_ACCESS = "1h";
  private readonly TOKEN_EXPIRATION_REFRESH = "7d";

  private omitPassword(user: User) {
    return omit(user, ["password"]);
  }

  private async issueTokens(userId: string, role: Role[]) {
    const payload = { id: userId, role };
    const accessToken = this.jwt.sign(payload, {
      expiresIn: this.TOKEN_EXPIRATION_ACCESS,
    });
    const refreshToken = this.jwt.sign(payload, {
      expiresIn: this.TOKEN_EXPIRATION_REFRESH,
    });
    return { accessToken, refreshToken };
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.userService.getByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException("Неверный email или пароль!");
    }
    const isValid = await verify(user.password, dto.password);
    if (!isValid) {
      throw new UnauthorizedException("Неверный email или пароль!");
    }
    return user;
  }

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);
    return this.buildResponseObject(user);
  }

  async register(dto: AuthDto) {
    const userExists = await this.userService.getByEmail(dto.email);
    if (userExists) {
      throw new BadRequestException("Пользователь уже существует");
    }
    const user = await this.userService.create(dto);

    // await this.emailService.sendVerification(
    //     user.email, `http://localhost:4200/verify-email?token=${user.verificationToken}`
    // )

    return this.buildResponseObject(user);
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken);
    if (!result) {
      throw new UnauthorizedException("Invalid refresh token");
    }
    const user = await this.userService.getById(result.id);
    return this.buildResponseObject(user);
  }

  //   async verifyEmail(token: string) {
  //     const user = await this.prisma.user.findFirst({
  //       where: {
  //         verifToken: token,
  //       },
  //     });

  //     if (!user) throw new NotFoundException("Token not exists!");

  //     await this.userService.update(user.id, {
  //       verifToken: null,
  //     });

  //     return "Почта подтверждена";
  //   }

  async buildResponseObject(user: User) {
    const tokens = await this.issueTokens(user.id, user.role);
    return { user: this.omitPassword(user), ...tokens };
  }
}
