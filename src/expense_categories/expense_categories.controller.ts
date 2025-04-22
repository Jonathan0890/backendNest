import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ExpenseCategoriesService } from './expense_categories.service';
import { CreateExpenseCategoryDto } from './dto/create-expense_category.dto';
import { UpdateExpenseCategoryDto } from './dto/update-expense_category.dto';

@Controller('expense-categories')
export class ExpenseCategoriesController {
  constructor(private readonly expenseCategoriesService: ExpenseCategoriesService) {}

  @Post()
  createExpenseCategory(@Body() newExpenseCategory: CreateExpenseCategoryDto) {
    return this.expenseCategoriesService.createExpenseCategory(newExpenseCategory);
  }

  @Get()
  getExpenseCategories() {
    return this.expenseCategoriesService.getExpenseCategories();
  }

  @Get(':id')
  getExpenseCategory(@Param('id', ParseIntPipe) id: number) {
    return this.expenseCategoriesService.getExpenseCategory(id);
  }

  @Patch(':id')
  updateExpenseCategory(@Param('id', ParseIntPipe) id: number, @Body() expenseCategory: UpdateExpenseCategoryDto) {
    return this.expenseCategoriesService.updateExpenseCategory(id, expenseCategory);
  }

  @Delete(':id')
  deleteExpenseCategory(@Param('id', ParseIntPipe) id: number) {
    return this.expenseCategoriesService.deleteExpenseCategory(id);
  }
}
