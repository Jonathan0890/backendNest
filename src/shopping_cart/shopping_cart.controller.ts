import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ShoppingCartService } from './shopping_cart.service';
import { CreateShoppingCartDto } from './dto/create-shopping_cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping_cart.dto';

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Post()
  createShoppingCart(@Body() createShoppingCartDto: CreateShoppingCartDto) {
    return this.shoppingCartService.createShoppingCart(createShoppingCartDto);
  }

  @Get()
  getShoppingCarts() {
    return this.shoppingCartService.getShoppingCarts();
  }

  @Get(':id')
  getShoppingCart(@Param('id', ParseIntPipe) id: number) {
    return this.shoppingCartService.getShoppingCart(id);
  }

  @Patch(':id')
  updateShoppingCart(@Param('id', ParseIntPipe) id: number, @Body() shoppingCart: UpdateShoppingCartDto) {
    return this.shoppingCartService.updateShoppingCart(id, shoppingCart);
  }

  @Delete(':id')
  deleteShoppingCart(@Param('id', ParseIntPipe) id: number) {
    return this.shoppingCartService.deleteShoppingCart(id);
  }
}
