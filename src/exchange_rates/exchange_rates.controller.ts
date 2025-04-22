import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ExchangeRatesService } from './exchange_rates.service';
import { CreateExchangeRateDto } from './dto/create-exchange_rate.dto';
import { UpdateExchangeRateDto } from './dto/update-exchange_rate.dto';

@Controller('exchange-rates')
export class ExchangeRatesController {
  constructor(private readonly exchangeRatesService: ExchangeRatesService) {}

  @Post()
  createExchangeRate(@Body() newExchangeRate: CreateExchangeRateDto) {
    return this.exchangeRatesService.createExchangeRate(newExchangeRate);
  }

  @Get()
  getExchangeRates() {
    return this.exchangeRatesService.getExchangeRates();
  }

  @Get(':id')
  getExchangeRate(@Param('id', ParseIntPipe) id: number) {
    return this.exchangeRatesService.getExchangeRate(id);
  }

  @Patch(':id')
  updateExchangeRate(@Param('id', ParseIntPipe) id: number, @Body() exchangeRate: UpdateExchangeRateDto) {
    return this.exchangeRatesService.updateExchangeRate(id, exchangeRate);
  }

  @Delete(':id')
  deleteExchangeRate(@Param('id', ParseIntPipe) id: number) {
    return this.exchangeRatesService.deleteExchangeRate(id);
  }
}
