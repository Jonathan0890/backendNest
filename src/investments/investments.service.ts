import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Investment } from './entities/investment.entity';

@Injectable()
export class InvestmentsService {
  constructor(
    @InjectRepository(Investment) private investmentRepository: Repository<Investment>,
  ) {}
  async createInvestment(investment: CreateInvestmentDto) {
    const investmentFound = await this.investmentRepository.findOne({
      where: {
        investment_name: investment.investment_name,
        value: investment.value
      }
    })

    if (investmentFound) {
      throw new HttpException('Investment already exists', HttpStatus.CONFLICT)
    }

    const newInvestment = this.investmentRepository.create(investment);
    return this.investmentRepository.save(newInvestment);
  }

  getInvestments() {
    return this.investmentRepository.find();
  }

  async getInvestment(id: number) {
    const investmentFound = await this.investmentRepository.findOne({
      where: {id}
    });

    if (!investmentFound) {
      throw new HttpException('Investment not found', HttpStatus.NOT_FOUND)
    }

    return this.investmentRepository.findOne({where: {id}});
  }

  async updateInvestment(id: number, investment: UpdateInvestmentDto) {
    const investmentFound = await this.investmentRepository.findOne({
      where: {id}
    });

    if (!investmentFound) {
      throw new HttpException('Investment not found', HttpStatus.NOT_FOUND)
    }

    const updateInvestment = Object.assign(investmentFound, investment);
    return this.investmentRepository.save(updateInvestment);
  }

  async deleteInvestment(id: number) {
    const result = await this.investmentRepository.delete({id});

    if (result.affected === 0){
      throw new HttpException('Investment not found', HttpStatus.NOT_FOUND)
    }
    return result;
  }
}
