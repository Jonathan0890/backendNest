import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loan } from './entities/loan.entity';

@Injectable()
export class LoansService {
  constructor(
    @InjectRepository(Loan) private loanRepository: Repository<Loan>,
  ) { }
  async createLoan(loan: CreateLoanDto) {
    const loanFound = await this.loanRepository.findOne({
      where: {
        lender: loan.lender,
        due_date: loan.due_date,
        amount: loan.amount,
        interest_rate: loan.interest_rate
      }
    });
    if (loanFound) {
      throw new HttpException('Loan already exists', HttpStatus.CONFLICT)
    }

    const newLoan = this.loanRepository.create(loan);
    return this.loanRepository.save(newLoan);
  }

  getLoans() {
    return this.loanRepository.find();
  }

  async getLoan(id: number) {
    const loanFound = await this.loanRepository.findOne({ where: { id } });

    if (!loanFound) {
      throw new HttpException('Loan not found', HttpStatus.NOT_FOUND)
    }

    return this.loanRepository.findOne({ where: { id } });
  }

  async updateLoan(id: number, loan: UpdateLoanDto) {
    const loanFound = await this.loanRepository.findOne({ where: { id } });

    if (!loanFound) {
      throw new HttpException('Loan not found', HttpStatus.NOT_FOUND)
    }

    const updateLoan = Object.assign(loanFound, loan);
    return this.loanRepository.save(updateLoan);
  }

  async deleteLoan(id: number) {
    const result = await this.loanRepository.delete({ id });

    if (result.affected === 0) {
      throw new HttpException('Loan not found', HttpStatus.NOT_FOUND)
    }
    return result;
  }
}
