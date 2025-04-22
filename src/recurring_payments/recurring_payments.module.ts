import { Module } from '@nestjs/common';
import { RecurringPaymentsService } from './recurring_payments.service';
import { RecurringPaymentsController } from './recurring_payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecurringPayment } from './entities/recurring_payment.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecurringPayment, User]),
  ],
  controllers: [RecurringPaymentsController],
  providers: [RecurringPaymentsService],
  exports: [RecurringPaymentsService],
})
export class RecurringPaymentsModule {}
