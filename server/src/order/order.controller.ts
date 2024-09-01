import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { Auth } from "@/auth/decorators/auth.decorator";
import { CurrentUser } from "@/auth/decorators/user.decorator";
import { OrderDto } from "./dto/order.dto";

@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Auth()
  @Get()
  async getAll() {
    return this.orderService.getAll();
  }

  @Auth()
  @Get("my-orders")
  async getByUser(@CurrentUser("id") userId: string) {
    return this.orderService.getByUser(userId);
  }

  @Auth()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  async placeOrder(@Body() dto: OrderDto, @CurrentUser("id") userId: string) {
    return this.orderService.createOrder(dto, userId);
  }
}
