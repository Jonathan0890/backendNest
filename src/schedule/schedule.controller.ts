import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from './entities/schedule.entity';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) { }

  @Get()
  getSchedules(): Promise<Schedule[]> {
    return this.scheduleService.getSchedules();
  }

  @Get(':id')
  getSchedule(@Param('id', ParseIntPipe) id: number) {
    return this.scheduleService.getSchedule(id);
  }

  @Post()
  createSchedule(@Body() newSchedule: CreateScheduleDto) {
    return this.scheduleService.createSchedule(newSchedule);
  }

  @Patch(':id')
  updateSchedule(@Param('id', ParseIntPipe) id: number, @Body() schedule: UpdateScheduleDto) {
    return this.scheduleService.updateSchedule(id, schedule);
  }

  @Delete(':id')
  deleteSchedule(@Param('id', ParseIntPipe) id: number) {
    return this.scheduleService.deleteSchedule(id);
  }
}
