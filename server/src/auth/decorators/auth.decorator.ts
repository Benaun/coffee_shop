import { Role } from "@prisma/client";
import { Roles } from "./roles.decorator";
import { applyDecorators, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../guards/jwt.guard";
import { RolesGuard } from "../guards/roles.guard";

export const Auth = (roles: Role | Role[] = [Role.USER]) => {
  if (!Array.isArray(roles)) {
    roles = [roles];
  }
  return applyDecorators(Roles(...roles), UseGuards(JwtAuthGuard, RolesGuard));
};
