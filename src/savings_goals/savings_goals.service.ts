import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSavingsGoalDto } from './dto/create-savings_goal.dto';
import { UpdateSavingsGoalDto } from './dto/update-savings_goal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SavingsGoal } from './entities/savings_goal.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SavingsGoalsService {
  constructor(
    @InjectRepository(SavingsGoal) private savingsGoalRepository: Repository<SavingsGoal>,
  ) { }
  async createSavingsGoal(savingsGoal: CreateSavingsGoalDto) {
    const savingsGoalFound = await this.savingsGoalRepository.findOne({
      where: {
        goal_name: savingsGoal.goal_name,
        goal_amount: savingsGoal.goal_amount,
        target_amount: savingsGoal.target_amount,
        deadline: savingsGoal.deadline
      }
    });

    if (savingsGoalFound) {
      throw new HttpException('Savings goal already exists', HttpStatus.BAD_REQUEST);
    }

    const newSavingsGoal = this.savingsGoalRepository.create(savingsGoal);
    return this.savingsGoalRepository.save(newSavingsGoal);
  }

  getSavingsGoals() {
    return `This action returns all savingsGoals`;
  }

  async getSavingsGoal(id: number) {
    const savingsGoal = await this.savingsGoalRepository.findOne({ where: { id } });

    if (!savingsGoal) {
      throw new HttpException('Savings goal not found', HttpStatus.NOT_FOUND);
    }

    return this.savingsGoalRepository.findOne({ where: { id } });
  }

  async updateSavingsGoal(id: number, savingsGoal: UpdateSavingsGoalDto) {
    const savingsGoalFound = await this.savingsGoalRepository.findOne({ where: { id } });

    if (!savingsGoalFound) {
      throw new HttpException('Savings goal not found', HttpStatus.NOT_FOUND);
    }

    const updatedSavingsGoal = Object.assign(savingsGoalFound, savingsGoal);
    return this.savingsGoalRepository.save(updatedSavingsGoal);
  }

  async deleteSavingsGoal(id: number) {
    const result = await this.savingsGoalRepository.delete({ id });

    if (result.affected === 0) {
      throw new HttpException('Savings goal not found', HttpStatus.NOT_FOUND)
    }
    return result;
  }
}
