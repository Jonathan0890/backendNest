import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { User } from 'src/users/entities/user.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Attendance, User, Schedule
    ]),
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService],
  exports: [AttendanceService],
})
export class AttendanceModule {}
