import { Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './currencies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangeRate } from 'src/exchange_rates/entities/exchange_rate.entity';
import { Currency } from './entities/currency.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Currency, ExchangeRate]),
  ],
  controllers: [CurrenciesController],
  providers: [CurrenciesService],
  exports: [CurrenciesService],
})
export class CurrenciesModule {}
