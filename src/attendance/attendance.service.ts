import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AttendanceService {

  constructor(
    @InjectRepository(Attendance) private attendanceRepository: Repository<Attendance>,
  ) {}
  async createAttendance(attendance: CreateAttendanceDto) {
    const attendanceFound = await this.attendanceRepository.findOne({
      where: { present: attendance.present}
    });

    if (attendanceFound) {
      throw new HttpException('Attendance already exists', HttpStatus.CONFLICT);
    }
    const newAttendance = this.attendanceRepository.create(attendance);
    return this.attendanceRepository.save(newAttendance);
  }

  getAttendances() {
    return this.attendanceRepository.find();
  }

  async getAttendance(id: number) {
    const attendanceFound = await this.attendanceRepository.findOne({
      where: { id }
    })

    if (!attendanceFound) {
      throw new HttpException('Attendance not found', HttpStatus.NOT_FOUND);
    }
    return this.attendanceRepository.findOne({where: {id}});
  }

  async updateAttendance(id: number, attendance: UpdateAttendanceDto) {
    const attendanceFound = await this.attendanceRepository.findOne({
      where: { id }
    })

    if (!attendanceFound) {
      throw new HttpException('Attendance not found', HttpStatus.NOT_FOUND);
    }
    const UpdateAttendance = Object.assign(attendanceFound, attendance);
    return this.attendanceRepository.save(UpdateAttendance);
  }

  async deleteAttendance(id: number) {
    const result = await this.attendanceRepository.delete({ id });

    if (result.affected === 0) {
      throw new HttpException('Attendance not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
