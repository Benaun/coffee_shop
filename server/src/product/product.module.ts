import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { PrismaService } from "@/prisma.service";
import { CategoryModule } from "@/category/category.module";

@Module({
  controllers: [ProductController],
  imports: [CategoryModule],
  providers: [ProductService, PrismaService],
})
// eslint-disable-next-line prettier/prettier
export class ProductModule { }
