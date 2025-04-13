import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { GradeService } from './grade.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';

@Controller('grade')
export class GradeController {
  constructor(private readonly gradeService: GradeService) { }

  @Get()
  getGrades() {
    return this.gradeService.getGrades();
  }

  @Get(':id')
  getGrade(@Param('id', ParseIntPipe) id: number) {
    return this.gradeService.getGrade(id);
  }

  @Post()
  createGrade(@Body() newGrade: CreateGradeDto) {
    return this.gradeService.createGrade(newGrade);
  }

  @Patch(':id')
  updateGrade(@Param('id', ParseIntPipe) id: number, @Body() grade: UpdateGradeDto) {
    return this.gradeService.updateGrade(id, grade);
  }

  @Delete(':id')
  deleteGrade(@Param('id', ParseIntPipe) id: number) {
    return this.gradeService.deleteGrade(id);
  }
}
