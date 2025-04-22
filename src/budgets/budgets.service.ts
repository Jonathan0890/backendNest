import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Budget } from './entities/budget.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BudgetsService {
  constructor(
    @InjectRepository(Budget) private budgetRepository: Repository<Budget>,
  ) {}
  async createBudget(budget: CreateBudgetDto) {
    const budgetFound = await this.budgetRepository.findOne({
      where: {
        budget_name: budget.budget_name ,
      },
    })

    if (budgetFound) {
      throw new HttpException('Budget already exists', HttpStatus.CONFLICT);
    }

    const newBudget = this.budgetRepository.create(budget);
    return await this.budgetRepository.save(newBudget);
  }

  getBudgets() {
    return this.budgetRepository.find();
  }

  async getBudget(id: number) {
    const budgetFound = await this.budgetRepository.findOne({
      where: {
        id,
      },
    })

    if (!budgetFound) {
      throw new HttpException('Budget not found', HttpStatus.NOT_FOUND);
    }
    return this.budgetRepository.findOne({where: {id}});
  }

  async updateBudget(id: number, budget: UpdateBudgetDto) {
    const budgetFound = await this.budgetRepository.findOne({
      where: {
        id,
      },
    })

    if (!budgetFound) {
      throw new HttpException('Budget not found', HttpStatus.NOT_FOUND);
    }

    const updateBudget = Object.assign(budgetFound, budget);
    return this.budgetRepository.save(updateBudget);
  }

  async deleteBudget(id: number) {
    const result = await this.budgetRepository.delete({ id });

    if (result.affected === 0) {
      throw new HttpException('Budget not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
