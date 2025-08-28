import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Req } from '@nestjs/common';
import { Request } from 'express';
import { PromotionService } from './promotion.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';

interface AuthRequest extends Request {
  user: { id: number }; }

@Controller('promotion')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Post()
  createPromotion(@Body() newPromotion: CreatePromotionDto, @Req() req: AuthRequest) {
    const userId = req.user.id; 
    return this.promotionService.createPromotion(newPromotion, userId);
  }

  @Get()
  getPromotions() {
    return this.promotionService.getPromotions();
  }

  @Get(':id')
  getPromotion(@Param('id', ParseIntPipe) id: number) {
    return this.promotionService.getPromotion(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() promotion: UpdatePromotionDto) {
    return this.promotionService.updatePromotion(id, promotion);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.promotionService.deletePromotion(id);
  }
}
