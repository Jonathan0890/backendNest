import { PartialType } from '@nestjs/mapped-types';
import { CreateRecurringPaymentDto } from './create-recurring_payment.dto';

export class UpdateRecurringPaymentDto extends PartialType(CreateRecurringPaymentDto) {}
