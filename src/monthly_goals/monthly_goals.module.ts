import { Module } from '@nestjs/common';
import { MonthlyGoalsService } from './monthly_goals.service';
import { MonthlyGoalsController } from './monthly_goals.controller';

@Module({
  controllers: [MonthlyGoalsController],
  providers: [MonthlyGoalsService],
})
export class MonthlyGoalsModule {}
