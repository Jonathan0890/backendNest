import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateShoppingCartDto } from './dto/create-shopping_cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping_cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingCart } from './entities/shopping_cart.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectRepository(ShoppingCart) private shoppingCartRepository: Repository<ShoppingCart>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }
  async createShoppingCart(shoppingCart: CreateShoppingCartDto) {
    const { productName, userId, price, quantity } = shoppingCart;

    const shoppingCartFound = await this.shoppingCartRepository.findOne({
      where: {
        productName,
        user: { id: userId },
      },
      relations: ['user'],
    });

    if (shoppingCartFound) {
      throw new HttpException(
        'This product already exists in the shopping cart for this user',
        HttpStatus.CONFLICT,
      );
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const newShoppingCart = this.shoppingCartRepository.create({
      user,
      productName,
      price,
      quantity,
    });

    return this.shoppingCartRepository.save(newShoppingCart);
  }

  getShoppingCarts() {
    return this.shoppingCartRepository.find({
      relations: ['user'],
    });
  }

  async getShoppingCart(id: number) {
    return this.findCartOrThrow(id);
  }

  async updateShoppingCart(id: number, shoppingCart: UpdateShoppingCartDto) {
    const shoppingCartFound = await this.findCartOrThrow(id);

    const updateShoppingCart = Object.assign(shoppingCartFound, shoppingCart);
    return this.shoppingCartRepository.save(updateShoppingCart);
  }

  async deleteShoppingCart(id: number) {
    const result = await this.shoppingCartRepository.delete({ id });
    if (result.affected === 0) {
      throw new HttpException('Shopping cart not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  private async findCartOrThrow(id: number): Promise<ShoppingCart> {
    const cart = await this.shoppingCartRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!cart) {
      throw new HttpException('Shopping cart not found', HttpStatus.NOT_FOUND);
    }
    return cart;
  }
}
