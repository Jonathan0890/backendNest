import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { MonthlyGoalsService } from './monthly_goals.service';
import { CreateMonthlyGoalDto } from './dto/create-monthly_goal.dto';
import { UpdateMonthlyGoalDto } from './dto/update-monthly_goal.dto';

@Controller('monthly-goals')
export class MonthlyGoalsController {
  constructor(private readonly monthlyGoalsService: MonthlyGoalsService) {}

  @Post()
  createMonthlyGoal(@Body() newMonthlyGoal: CreateMonthlyGoalDto) {
    return this.monthlyGoalsService.createMonthlyGoal(newMonthlyGoal);
  }

  @Get()
  getMonthlyGoals() {
    return this.monthlyGoalsService.getMonthlyGoals();
  }

  @Get(':id')
  getMonthlyGoal(@Param('id', ParseIntPipe) id: number) {
    return this.monthlyGoalsService.getMonthlyGoal(id);
  }

  @Patch(':id')
  updateMonthlyGoal(@Param('id', ParseIntPipe) id: number, @Body() monthlyGoal: UpdateMonthlyGoalDto) {
    return this.monthlyGoalsService.updateMonthlyGoal(id, monthlyGoal);
  }

  @Delete(':id')
  deleteMonthlyGoal(@Param('id', ParseIntPipe) id: number) {
    return this.monthlyGoalsService.deleteMonthlyGoal(id);
  }
}
