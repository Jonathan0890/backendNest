import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Grade } from './entities/grade.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GradeService {

  constructor(
    @InjectRepository(Grade) private gradeRepository: Repository<Grade>,
  ) {}

  getGrades() {
    return this.gradeRepository.find();
  }

  async getGrade(id: number) {
    const gradeFound = await this.gradeRepository.findOne({
      where: {id}
    })
    if (!gradeFound) {
      throw new HttpException('Grade not found', HttpStatus.NOT_FOUND);
    }
    return this.gradeRepository.findOne({where: {id}});
  }

  async createGrade(grade: CreateGradeDto) {
    const gradeFound = await this.gradeRepository.findOne({
        where: {name: grade.name}
    })
    if (gradeFound) {
      throw new HttpException('Grade already exists', HttpStatus.CONFLICT);
    }
    const mewGrade = this.gradeRepository.create(grade);
    return this.gradeRepository.save(mewGrade);
  }

  async updateGrade(id: number, grade: UpdateGradeDto) {
    const gradeFound = await this.gradeRepository.findOne({
      where: {id}
    })
    if (!gradeFound) {
      throw new HttpException('Grade not found', HttpStatus.NOT_FOUND);
    }
    const updateGrade = Object.assign(gradeFound, grade);
    return this.gradeRepository.save(updateGrade);
  }

  async deleteGrade(id: number) {
    const result = await this.gradeRepository.delete({id});

    if (result.affected === 0){
      throw new HttpException('Grade not found', HttpStatus.NOT_FOUND)
    }
    return result;
  }
}
