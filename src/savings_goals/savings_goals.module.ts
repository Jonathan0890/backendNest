import { Module } from '@nestjs/common';
import { SavingsGoalsService } from './savings_goals.service';
import { SavingsGoalsController } from './savings_goals.controller';

@Module({
  controllers: [SavingsGoalsController],
  providers: [SavingsGoalsService],
})
export class SavingsGoalsModule {}
