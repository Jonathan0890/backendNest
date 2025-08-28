import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promotion } from './entities/promotion.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Promotion, User])
  ],
  controllers: [PromotionController],
  providers: [PromotionService],
  exports: [PromotionService],
})
export class PromotionModule {}
