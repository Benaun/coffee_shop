import { Prisma } from "@prisma/client";

export const categoryObject: Prisma.CategorySelect = {
  id: true,
  title: true,
  slug: true,
  image: true,
};
