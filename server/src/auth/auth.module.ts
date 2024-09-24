import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { getJwtConfig } from "@/config/jwt.config";
import { UserModule } from "@/user/user.module";
import { PrismaService } from "@/prisma.service";
import { RefreshTokenService } from "./refresh-token.service";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigModule],
      useFactory: getJwtConfig,
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, AuthService, RefreshTokenService],
})
export class AuthModule {}
