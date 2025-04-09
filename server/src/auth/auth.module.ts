import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { getJwtConfig } from "@/config/jwt.config";
import { PrismaService } from "@/prisma.service";
import { RefreshTokenService } from "./refresh-token.service";

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigModule],
      useFactory: getJwtConfig,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtService, RefreshTokenService],
})
// eslint-disable-next-line prettier/prettier
export class AuthModule { }
