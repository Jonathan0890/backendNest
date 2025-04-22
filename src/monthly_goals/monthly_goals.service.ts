import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMonthlyGoalDto } from './dto/create-monthly_goal.dto';
import { UpdateMonthlyGoalDto } from './dto/update-monthly_goal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MonthlyGoal } from './entities/monthly_goal.entity';

@Injectable()
export class MonthlyGoalsService {
  constructor(
    @InjectRepository(MonthlyGoal) private monthlyGoalRepository: Repository<MonthlyGoal>,
  ) {}
  async createMonthlyGoal(monthlyGoal: CreateMonthlyGoalDto) {
    const monthlyGoalfound = await this.monthlyGoalRepository.findOne({
      where: { month: monthlyGoal.month },
    })

    if (monthlyGoalfound) {
      throw new HttpException('Monthly goal already exists', HttpStatus.CONFLICT);
    }

    const newMonthlyGoal = this.monthlyGoalRepository.create(monthlyGoal);
    return this.monthlyGoalRepository.save(newMonthlyGoal);
  }

  getMonthlyGoals() {
    return this.monthlyGoalRepository.find();
  }

  async getMonthlyGoal(id: number) {
    const monthlyGoal = await this.monthlyGoalRepository.findOne({
      where: { id },
    });
    if (!monthlyGoal) {
      throw new HttpException('Monthly goal not found', HttpStatus.NOT_FOUND);
    }
    return this.monthlyGoalRepository.findOne({where: {id}});
    }

  async updateMonthlyGoal(id: number, monthlyGoal: UpdateMonthlyGoalDto) {
    const monthlyGoalfound = await this.monthlyGoalRepository.findOne({ 
      where: { id },
    });
    if (!monthlyGoalfound) {
      throw new HttpException('Monthly goal not found', HttpStatus.NOT_FOUND);
    }
    const updateMonthlyGoal = Object.assign(monthlyGoalfound, monthlyGoal);
    return this.monthlyGoalRepository.save(updateMonthlyGoal);
  }

  async deleteMonthlyGoal(id: number) {
    const result = await this.monthlyGoalRepository.delete({ id });

    if (result.affected === 0) {
      throw new HttpException('Monthly goal not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
