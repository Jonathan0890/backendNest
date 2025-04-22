import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';

@Controller('reminders')
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @Post()
  createReminder(@Body() createReminderDto: CreateReminderDto) {
    return this.remindersService.createReminder(createReminderDto);
  }

  @Get()
  getReminders() {
    return this.remindersService.getReminders();
  }

  @Get(':id')
  getReminder(@Param('id', ParseIntPipe) id: number) {
    return this.remindersService.getReminder(id);
  }

  @Patch(':id')
  updateReminder(@Param('id', ParseIntPipe) id: number, @Body() reminder: UpdateReminderDto) {
    return this.remindersService.updateReminder(id, reminder);
  }

  @Delete(':id')
  deleteReminder(@Param('id', ParseIntPipe) id: number) {
    return this.remindersService.deleteReminder(id);
  }
}
