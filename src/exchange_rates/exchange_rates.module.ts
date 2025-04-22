import { Module } from '@nestjs/common';
import { ExchangeRatesService } from './exchange_rates.service';
import { ExchangeRatesController } from './exchange_rates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangeRate } from './entities/exchange_rate.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExchangeRate]),
  ],
  controllers: [ExchangeRatesController],
  providers: [ExchangeRatesService],
  exports: [ExchangeRatesService],
})
export class ExchangeRatesModule {}
