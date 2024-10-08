import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ProductModule } from "./product/product.module";
import { CategoryModule } from "./category/category.module";
import { OrderModule } from "./order/order.module";

@Module({
  imports: [UserModule, AuthModule, ProductModule, CategoryModule, OrderModule],
})
export class AppModule {}
