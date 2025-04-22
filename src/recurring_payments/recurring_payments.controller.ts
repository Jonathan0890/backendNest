import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { RecurringPaymentsService } from './recurring_payments.service';
import { CreateRecurringPaymentDto } from './dto/create-recurring_payment.dto';
import { UpdateRecurringPaymentDto } from './dto/update-recurring_payment.dto';

@Controller('recurring-payments')
export class RecurringPaymentsController {
  constructor(private readonly recurringPaymentsService: RecurringPaymentsService) {}

  @Post()
  createRecurringPayment(@Body() newRecurringPayment: CreateRecurringPaymentDto) {
    return this.recurringPaymentsService.createRecurringPayment(newRecurringPayment);
  }

  @Get()
  getRecurringPayments() {
    return this.recurringPaymentsService.getRecurringPayments();
  }

  @Get(':id')
  getRecurringPayment(@Param('id', ParseIntPipe) id: number) {
    return this.recurringPaymentsService.getRecurringPayment(id);
  }

  @Patch(':id')
  updateRecurringPayment(@Param('id', ParseIntPipe) id: number, @Body() recurringPayment: UpdateRecurringPaymentDto) {
    return this.recurringPaymentsService.updateRecurringPayment(id, recurringPayment);
  }

  @Delete(':id')
  deleteRecurringPayment(@Param('id', ParseIntPipe) id: number) {
    return this.recurringPaymentsService.deleteRecurringPayment(id);
  }
}
