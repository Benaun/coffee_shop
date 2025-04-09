import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ProductModule } from "./product/product.module";
import { CategoryModule } from "./category/category.module";
import { OrderModule } from "./order/order.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    UserModule,
    AuthModule,
    ProductModule,
    CategoryModule,
    OrderModule,
    ConfigModule.forRoot(),
  ],
})
// eslint-disable-next-line prettier/prettier
export class AppModule { }
