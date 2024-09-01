import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { PrismaService } from "@/prisma.service";

@Module({
  controllers: [ProductController],
  imports: [CategoryModule],
  providers: [ProductService, PrismaService],
})
export class ProductModule {}
