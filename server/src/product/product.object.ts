import { categoryObject } from "@/category/category.objext";
import { Prisma } from "@prisma/client";

export const productObject: Prisma.ProductSelect = {
  id: true,
  createdAt: true,
  title: true,
  slug: true,
  description: true,
  price: true,
  image: true,
  category: { select: categoryObject },
};
