import { Prisma } from "@prisma/client";

export const userObject: Prisma.UserSelect = {
  id: true,
  email: true,
  name: true,
  avatar: true,
  password: false,
  phone: true,
};
