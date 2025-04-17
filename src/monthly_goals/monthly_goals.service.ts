import { Injectable } from '@nestjs/common';
import { CreateMonthlyGoalDto } from './dto/create-monthly_goal.dto';
import { UpdateMonthlyGoalDto } from './dto/update-monthly_goal.dto';

@Injectable()
export class MonthlyGoalsService {
  create(createMonthlyGoalDto: CreateMonthlyGoalDto) {
    return 'This action adds a new monthlyGoal';
  }

  findAll() {
    return `This action returns all monthlyGoals`;
  }

  findOne(id: number) {
    return `This action returns a #${id} monthlyGoal`;
  }

  update(id: number, updateMonthlyGoalDto: UpdateMonthlyGoalDto) {
    return `This action updates a #${id} monthlyGoal`;
  }

  remove(id: number) {
    return `This action removes a #${id} monthlyGoal`;
  }
}
