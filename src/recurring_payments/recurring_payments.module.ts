import { Module } from '@nestjs/common';
import { RecurringPaymentsService } from './recurring_payments.service';
import { RecurringPaymentsController } from './recurring_payments.controller';

@Module({
  controllers: [RecurringPaymentsController],
  providers: [RecurringPaymentsService],
})
export class RecurringPaymentsModule {}
