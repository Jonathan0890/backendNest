import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reminder } from './entities/reminder.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RemindersService {
  constructor(
    @InjectRepository(Reminder) private reminderRepository: Repository<Reminder>
  ) { }
  async createReminder(reminder: CreateReminderDto) {
    const reminderFound = await this.reminderRepository.findOne({
      where: {
        title: reminder.title,
        due_date: reminder.due_date,
        is_recurring: reminder.is_recurring,
        description: reminder.description
      }
    });

    if (reminderFound) {
      throw new HttpException('Reminder already exists', HttpStatus.CONFLICT);
    }

    const newReminder = this.reminderRepository.create(reminder);
    return this.reminderRepository.save(newReminder);
  }

  async getReminders() {
    return await this.reminderRepository.find();
  }

  async getReminder(id: number) {
    const reminderFound = await this.reminderRepository.findOneBy({ id });

    if (!reminderFound) {
      throw new HttpException('Reminder not found', HttpStatus.NOT_FOUND);
    }

    return this.reminderRepository.findOneBy({ id });
  }

  async updateReminder(id: number, reminder: UpdateReminderDto) {
    const reminderFound = await this.reminderRepository.findOneBy({ id });

    if (!reminderFound) {
      throw new HttpException('Reminder not found', HttpStatus.NOT_FOUND);
    }

    const updatedReminder = Object.assign(reminderFound, reminder);
    return this.reminderRepository.save(updatedReminder);
  }

  async deleteReminder(id: number) {
    const result = await this.reminderRepository.delete({ id });

    if (result.affected === 0) {
      throw new HttpException('Reminder not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
