import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ScheduleService {

  constructor(
    @InjectRepository(Schedule) private scheduleRepository: Repository<Schedule>,
  ) { }

  async createSchedule(schedule: CreateScheduleDto) {
    const scheduleFound = await this.scheduleRepository.findOne({
      where: {
        subject: { id: schedule.subjectId },
        group: { id: schedule.groupId },
        day: schedule.day,
        startTime: schedule.startTime,
      },
      relations: ['subject', 'group'],
    });

    if (scheduleFound) {
      throw new HttpException('Schedule already exists', HttpStatus.CONFLICT);
    }
    const newSchedule = this.scheduleRepository.create(schedule);
    return this.scheduleRepository.save(newSchedule);
  }

  getSchedules() {
    return this.scheduleRepository.find({
      relations: ['subject', 'group'],
    });
  }

  async getSchedule(id: number) {
    const scheduleFound = await this.scheduleRepository.findOne({
      where: { id },
      relations: ['subject', 'group'],
    })

    if (!scheduleFound) {
      throw new HttpException('Schedule not found', HttpStatus.NOT_FOUND);
    }

    return this.scheduleRepository.findOne({ where: { id } });
  }

  async updateSchedule(id: number, schedule: UpdateScheduleDto) {
    const scheduleFound = await this.scheduleRepository.findOne({
      where: { id },
    })

    if (!scheduleFound) {
      throw new HttpException('Schedule not found', HttpStatus.NOT_FOUND);
    }

    const updateSchedule = Object.assign(scheduleFound, schedule);
    return this.scheduleRepository.save(updateSchedule);
  }

  async deleteSchedule(id: number) {
    const result = await this.scheduleRepository.delete({ id });

    if (result.affected === 0) {
      throw new HttpException('Schedule not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
