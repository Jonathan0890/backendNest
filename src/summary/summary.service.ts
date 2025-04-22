import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSummaryDto } from './dto/create-summary.dto';
import { UpdateSummaryDto } from './dto/update-summary.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Summary } from './entities/summary.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SummaryService {
  constructor(
    @InjectRepository(Summary) private summaryRepository: Repository<Summary>
  ) {}
  async createSummary(summary: CreateSummaryDto) {
    const summaryFound = await this.summaryRepository.findOne({
      where: {
        summaryDate: summary.summaryDate,
        total_expense: summary.total_expense,
        total_income: summary.total_income,
        nel_balance: summary.nel_balance,
      },
    });
    if (summaryFound) {
      throw new HttpException('Summary already exists', HttpStatus.CONFLICT);
    }
    return await this.summaryRepository.save(summary);
  }

  getSummaries() {
    return this.summaryRepository.find();
  }

  async getSummary(id: number) {
    const summaryFound = await this.summaryRepository.findOne({
      where: { id },
    })
    if (!summaryFound) {
      throw new HttpException('Summary not found', HttpStatus.NOT_FOUND);
    }
    return  this.summaryRepository.findOne({where: {id}});
  }

  async updateSummary(id: number, summary: UpdateSummaryDto) {
    const summaryFound = await this.summaryRepository.findOne({where: {id}});
    if (!summaryFound) {
      throw new HttpException('Summary not found', HttpStatus.NOT_FOUND);
    }
    const updatedSummary = Object.assign(summaryFound,summary);
    return  this.summaryRepository.save(updatedSummary);
  }

  async deleteSummary(id: number) {
    const result = await this.summaryRepository.delete({ id });
    if (result.affected === 0) {
      throw new HttpException('Summary not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
