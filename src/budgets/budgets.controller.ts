import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Post()
  createBudget(@Body() newBudget: CreateBudgetDto) {
    return this.budgetsService.createBudget(newBudget);
  }

  @Get()
  getBudgets() {
    return this.budgetsService.getBudgets();
  }

  @Get(':id')
  getBudget(@Param('id', ParseIntPipe) id: number) {
    return this.budgetsService.getBudget(id);
  }

  @Patch(':id')
  updateBudget(@Param('id', ParseIntPipe) id: number, @Body() budget: UpdateBudgetDto) {
    return this.budgetsService.updateBudget(id, budget);
  }

  @Delete(':id')
  deleteBudget(@Param('id', ParseIntPipe) id: number) {
    return this.budgetsService.deleteBudget(id);
  }
}
