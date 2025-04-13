import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './entities/subject.entity';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get()
  getSubjects(): Promise<Subject[]> {
    return this.subjectService.getSubjects();
  }

  @Get(':id')
  getSubject(@Param('id', ParseIntPipe) id: number) {
    return this.subjectService.getSubject(id);
  }

  @Post()
  createSubject(@Body() newSubject: CreateSubjectDto) {
    return this.subjectService.createSubject(newSubject);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() subject: UpdateSubjectDto) {
    return this.subjectService.updateSubject(id, subject);
  }

  @Delete(':id')
  deleteSubject(@Param('id', ParseIntPipe) id: number) {
    return this.subjectService.deleteSubject(id);
  }
}
