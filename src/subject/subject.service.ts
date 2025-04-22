import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubjectService {

  constructor(
    @InjectRepository(Subject) private subjectRepository: Repository<Subject>,
  ) {}
  
  async createSubject(subject: CreateSubjectDto) {
    const subjectFound = await this.subjectRepository.findOne({
      where: { name: subject.name },
    });
    if (subjectFound) {
      throw new HttpException('Subject already exists', HttpStatus.CONFLICT);
    }

    const newSubject = this.subjectRepository.create(subject);
    return this.subjectRepository.save(newSubject);
  }

  getSubjects() {
    return this.subjectRepository.find();
  }

  async getSubject(id: number) {
    const subjectFound = await this.subjectRepository.findOne({
      where: { id },
    })
    if (!subjectFound) {
      throw new HttpException('Subject not found', HttpStatus.NOT_FOUND);
    }
    return this.subjectRepository.findOne({where: {id}});
  }

  async updateSubject(id: number, subject: UpdateSubjectDto) {
    const subjectFound = await this.subjectRepository.findOne({
      where: { id },
    })
    if (!subjectFound) {
      throw new HttpException('Subject not found', HttpStatus.NOT_FOUND);
    }
    const updateSubject = Object.assign(subjectFound, subject);
    return this.subjectRepository.save(updateSubject);
  }

  async deleteSubject(id: number) {
    const result = await this.subjectRepository.delete({ id });
    if (result.affected === 0) {
      throw new HttpException('Subject not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
