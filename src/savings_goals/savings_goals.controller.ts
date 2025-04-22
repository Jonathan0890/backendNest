import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { SavingsGoalsService } from './savings_goals.service';
import { CreateSavingsGoalDto } from './dto/create-savings_goal.dto';
import { UpdateSavingsGoalDto } from './dto/update-savings_goal.dto';

@Controller('savings-goals')
export class SavingsGoalsController {
  constructor(private readonly savingsGoalsService: SavingsGoalsService) {}

  @Post()
  createSavingsGoal(@Body() newSavingsGoal: CreateSavingsGoalDto) {
    return this.savingsGoalsService.createSavingsGoal(newSavingsGoal);
  }

  @Get()
  getSavingsGoals() {
    return this.savingsGoalsService.getSavingsGoals();
  }

  @Get(':id')
  getSavingsGoal(@Param('id', ParseIntPipe) id: number) {
    return this.savingsGoalsService.getSavingsGoal(id);
  }

  @Patch(':id')
  updateSavingsGoal(@Param('id', ParseIntPipe) id: number, @Body() savingsGoal: UpdateSavingsGoalDto) {
    return this.savingsGoalsService.updateSavingsGoal(id, savingsGoal);
  }

  @Delete(':id')
  deleteSavingsGoal(@Param('id', ParseIntPipe) id: number) {
    return this.savingsGoalsService.deleteSavingsGoal(id);
  }
}
