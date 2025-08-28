import { Module } from '@nestjs/common';
import { ShoppingCartService } from './shopping_cart.service';
import { ShoppingCartController } from './shopping_cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCart } from './entities/shopping_cart.entity';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShoppingCart, User]),
    UsersModule
  ],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
  exports: [ShoppingCartService],
})
export class ShoppingCartModule {}
