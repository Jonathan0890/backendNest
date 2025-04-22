import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateExpenseCategoryDto } from './dto/create-expense_category.dto';
import { UpdateExpenseCategoryDto } from './dto/update-expense_category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExpenseCategory } from './entities/expense_category.entity';

@Injectable()
export class ExpenseCategoriesService {
  constructor(
    @InjectRepository(ExpenseCategory) private expenseCategoryRepository: Repository<ExpenseCategory>,
  ) {}
  async createExpenseCategory(newExpenseCategory: CreateExpenseCategoryDto) {
    const expenseCategoryFound = await this.expenseCategoryRepository.findOne({
      where: { category_name: newExpenseCategory.category_name },
    })

    if (expenseCategoryFound) {
      throw new HttpException('Expense category already exists', HttpStatus.CONFLICT);
    }
    
    const expenseCategory = this.expenseCategoryRepository.create(newExpenseCategory);
    return this.expenseCategoryRepository.save(expenseCategory);
  }

  getExpenseCategories() {
    return this.expenseCategoryRepository.find();
  }

  async getExpenseCategory(id: number) {
    const expenseCategoryFound = await this.expenseCategoryRepository.findOne({
      where: { id },
    })
    if (!expenseCategoryFound) {
      throw new HttpException('Expense category not found', HttpStatus.NOT_FOUND);
    }
    return this.expenseCategoryRepository.findOne({ where: { id } });
  }

  async updateExpenseCategory(id: number, expenseCategory: UpdateExpenseCategoryDto) {
    const expenseCategoryFound = await this.expenseCategoryRepository.findOne({
      where: { id },
    })

    if (!expenseCategoryFound) {
      throw new HttpException('Expense category not found', HttpStatus.NOT_FOUND);
    }

    const updateExpenseCategory = Object.assign(expenseCategoryFound, expenseCategory);
    return this.expenseCategoryRepository.save(updateExpenseCategory);
  }

  async deleteExpenseCategory(id: number) {
    const result = await this.expenseCategoryRepository.delete({ id });

    if (result.affected === 0) {
      throw new HttpException('Expense category not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
  
}
