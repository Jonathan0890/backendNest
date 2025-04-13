import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  createAttendance(@Body() newAttendance: CreateAttendanceDto) {
    return this.attendanceService.createAttendance(newAttendance);
  }

  @Get()
  getAttendances() {
    return this.attendanceService.getAttendances();
  }

  @Get(':id')
  getAttendance(@Param('id', ParseIntPipe) id: number) {
    return this.attendanceService.getAttendance(id);
  }

  @Patch(':id')
  updateAttendance(@Param('id', ParseIntPipe) id: number, @Body() attendance: UpdateAttendanceDto) {
    return this.attendanceService.updateAttendance(id, attendance);
  }

  @Delete(':id')
  removeAttendance(@Param('id', ParseIntPipe) id: number) {
    return this.attendanceService.deleteAttendance(id);
  }
}
