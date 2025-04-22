import { Module } from '@nestjs/common';
import { MonthlyGoalsService } from './monthly_goals.service';
import { MonthlyGoalsController } from './monthly_goals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { MonthlyGoal } from './entities/monthly_goal.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MonthlyGoal, User]),
  ],
  controllers: [MonthlyGoalsController],
  providers: [MonthlyGoalsService],
})
export class MonthlyGoalsModule {}
