import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { Repository } from 'typeorm';
import { Promotion } from './entities/promotion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(Promotion) private readonly promotionRepository: Repository<Promotion>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }
  async createPromotion(promotion: CreatePromotionDto, userId: number) {
    const { title, startDate, endDate } = promotion;

    if (endDate <= startDate) {
      throw new HttpException(
        'End date must be greater than start date',
        HttpStatus.BAD_REQUEST,
      );
    }

    const promotionFound = await this.promotionRepository.findOne(
      { where: { title } }
    )
    if (promotionFound) {
      throw new HttpException('Promotion already exists', HttpStatus.CONFLICT);
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const newPromotion = this.promotionRepository.create({
      ...promotion,
      createBy: user,
    });
    return await this.promotionRepository.save(newPromotion);

  }

  getPromotions() {
    return this.promotionRepository.find({
      relations: ['createBy', 'category'],
    });
  }

  async getPromotion(id: number) {
    return this.findPromotionOrThrow(id);
  }

  async updatePromotion(id: number, promotion: UpdatePromotionDto) {
    const promotionFound = await this.findPromotionOrThrow(id);

    if (promotion.startDate && promotion.endDate && promotion.endDate <= promotion.startDate) {
      throw new HttpException(
        'End date must be greater than start date',
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatePromotion = Object.assign(promotionFound, promotion);
    return this.promotionRepository.save(updatePromotion);
  }

  async deletePromotion(id: number) {
    const result = await this.promotionRepository.delete({ id });
    if (result.affected === 0) {
      throw new HttpException('Promotion not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  private async findPromotionOrThrow(id: number): Promise<Promotion> {
    const promotionFound = await this.promotionRepository.findOne({
      where: { id },
      relations: ['createBy', 'category'],
    });
    if (!promotionFound) {
      throw new HttpException('Promotion not found', HttpStatus.NOT_FOUND);
    }
    return promotionFound;
  }
}
