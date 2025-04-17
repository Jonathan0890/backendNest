import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MonthlyGoalsService } from './monthly_goals.service';
import { CreateMonthlyGoalDto } from './dto/create-monthly_goal.dto';
import { UpdateMonthlyGoalDto } from './dto/update-monthly_goal.dto';

@Controller('monthly-goals')
export class MonthlyGoalsController {
  constructor(private readonly monthlyGoalsService: MonthlyGoalsService) {}

  @Post()
  create(@Body() createMonthlyGoalDto: CreateMonthlyGoalDto) {
    return this.monthlyGoalsService.create(createMonthlyGoalDto);
  }

  @Get()
  findAll() {
    return this.monthlyGoalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.monthlyGoalsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMonthlyGoalDto: UpdateMonthlyGoalDto) {
    return this.monthlyGoalsService.update(+id, updateMonthlyGoalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.monthlyGoalsService.remove(+id);
  }
}
