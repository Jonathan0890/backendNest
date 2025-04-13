import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Evaluation } from './entities/evaluation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EvaluationService {

  constructor(
    @InjectRepository(Evaluation) private evaluationRepository: Repository<Evaluation>,
  ) { }

  getEvaluations() {
    return this.evaluationRepository.find();
  }

  async getEvaluation(id: number) {
    const evaluationFound = await this.evaluationRepository.findOne(
      {where: {id}});
    if (!evaluationFound) {
      throw new HttpException('Evaluation not found', HttpStatus.NOT_FOUND);
    }
    return this.evaluationRepository.findOne({where: {id}});
  }

  async createEvaluation( evaluation: CreateEvaluationDto) {
    const evaluationFound = await this.evaluationRepository.findOne(
      {where: {value: evaluation.value, remarks: evaluation.remarks}
    });
    if (evaluationFound) {
      throw new HttpException('Evaluation already exists', HttpStatus.CONFLICT);
    }
    
    const newEvaluation = this.evaluationRepository.create(evaluation);
    return this.evaluationRepository.save(newEvaluation);
  }

  async updateEvaluation(id: number,  evaluation: UpdateEvaluationDto) {
    const evaluationFound = await this.evaluationRepository.findOne(
      {where: {id}});
    if (!evaluationFound) {
      throw new HttpException('Evaluation not found', HttpStatus.NOT_FOUND);
    }
    const updateEvaluation = Object.assign(evaluationFound, evaluation);
    return this.evaluationRepository.save(updateEvaluation);
  }

  async deleteEvaluation(id: number) {
    const result = await this.evaluationRepository.delete({id});
    if (result.affected === 0) {
      throw new HttpException('Evaluation not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
