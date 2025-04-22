import { Module } from '@nestjs/common';
import { SavingsGoalsService } from './savings_goals.service';
import { SavingsGoalsController } from './savings_goals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavingsGoal } from './entities/savings_goal.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SavingsGoal, User]),
  ],
  controllers: [SavingsGoalsController],
  providers: [SavingsGoalsService],
})
export class SavingsGoalsModule {}
