import { Module } from '@nestjs/common';
import { ExchangeRatesService } from './exchange_rates.service';
import { ExchangeRatesController } from './exchange_rates.controller';

@Module({
  controllers: [ExchangeRatesController],
  providers: [ExchangeRatesService],
})
export class ExchangeRatesModule {}
