import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRecurringPaymentDto } from './dto/create-recurring_payment.dto';
import { UpdateRecurringPaymentDto } from './dto/update-recurring_payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecurringPayment } from './entities/recurring_payment.entity';

@Injectable()
export class RecurringPaymentsService {
  constructor(
    @InjectRepository(RecurringPayment) private recurringPaymentRepository: Repository<RecurringPayment>,
  ) { }
  async createRecurringPayment(recurringPayment: CreateRecurringPaymentDto) {
    const recurringPaymentFound = await this.recurringPaymentRepository.findOne({
      where: {
        description: recurringPayment.description,
        frequency: recurringPayment.frequency,
        amount: recurringPayment.amount
      }
    });
    if (recurringPaymentFound) {
      throw new HttpException('Recurring payment already exists', HttpStatus.CONFLICT);
    }
    const newRecurringPayment = this.recurringPaymentRepository.create(recurringPayment);
    return this.recurringPaymentRepository.save(newRecurringPayment);
  }

  getRecurringPayments() {
    return this.recurringPaymentRepository.find();
  }

  async getRecurringPayment(id: number) {
    const recurringPaymentFound = await this.recurringPaymentRepository.findOne({
      where: { id }
    });
    if (!recurringPaymentFound) {
      throw new HttpException('Recurring payment not found', HttpStatus.NOT_FOUND);
    }
    return this.recurringPaymentRepository.findOne({ where: { id } });
  }

  async updateRecurringPayment(id: number, recurringPayment: UpdateRecurringPaymentDto) {
    const recurringPaymentFound = await this.recurringPaymentRepository.findOne({
      where: { id }
    });
    if (!recurringPaymentFound) {
      throw new HttpException('Recurring payment not found', HttpStatus.NOT_FOUND);
    }
    const updateRecurringPayment = Object.assign(recurringPaymentFound, recurringPayment);
    return this.recurringPaymentRepository.save(updateRecurringPayment);
  }

  async deleteRecurringPayment(id: number) {
    const result = await this.recurringPaymentRepository.delete({ id });
    if (result.affected === 0) {
      throw new HttpException('Recurring payment not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}