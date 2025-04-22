import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsService {

  constructor(
    @InjectRepository(Transaction) private transactionRepository: Repository<Transaction>,
  ) { }
  async createTransaction(transaction: CreateTransactionDto) {
    const transactionFound = await this.transactionRepository.findOne({
      where: { transactionDate: transaction.transactionDate, amount: transaction.amount },
    });
    if (transactionFound) {
      throw new HttpException('Transaction already exists', HttpStatus.CONFLICT);
    }
    const newTransaction = this.transactionRepository.create(transaction);
    return this.transactionRepository.save(newTransaction);
  }

  getTransactions() {
    return this.transactionRepository.find();
  }

  async getTransaction(id: number) {
    const transactionFound = await this.transactionRepository.findOne({
      where: { id },
    });
    if (!transactionFound) {
      throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
    }
    return this.transactionRepository.findOne({ where: { id } });
  }

  async updateTransaction(id: number, transaction: UpdateTransactionDto) {
    const transactionFound = await this.transactionRepository.findOne({
      where: { id },
    });
    if (!transactionFound) {
      throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
    }
    const updateTransaction = Object.assign(transactionFound, transaction);
    return this.transactionRepository.save(updateTransaction);
  }

  async daleteTransaction(id: number) {
    const result = await this.transactionRepository.delete({ id });

    if (result.affected === 0) {
      throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
