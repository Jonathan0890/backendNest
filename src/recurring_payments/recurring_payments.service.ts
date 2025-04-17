import { Injectable } from '@nestjs/common';
import { CreateRecurringPaymentDto } from './dto/create-recurring_payment.dto';
import { UpdateRecurringPaymentDto } from './dto/update-recurring_payment.dto';

@Injectable()
export class RecurringPaymentsService {
  create(createRecurringPaymentDto: CreateRecurringPaymentDto) {
    return 'This action adds a new recurringPayment';
  }

  findAll() {
    return `This action returns all recurringPayments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recurringPayment`;
  }

  update(id: number, updateRecurringPaymentDto: UpdateRecurringPaymentDto) {
    return `This action updates a #${id} recurringPayment`;
  }

  remove(id: number) {
    return `This action removes a #${id} recurringPayment`;
  }
}
