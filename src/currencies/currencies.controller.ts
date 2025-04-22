import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';

@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Post()
  createCurrency(@Body() newCurrency: CreateCurrencyDto) {
    return this.currenciesService.createCurrency(newCurrency);
  }

  @Get()
  getCurrencies() {
    return this.currenciesService.getCurrencies();
  }

  @Get(':id')
  getCurrency(@Param('id', ParseIntPipe) id: number) {
    return this.currenciesService.getCurrency(id);
  }

  @Patch(':id')
  updateCurrency(@Param('id', ParseIntPipe) id: number, @Body() currency: UpdateCurrencyDto) {
    return this.currenciesService.updateCurrency(id, currency);
  }

  @Delete(':id')
  deleteCurrency(@Param('id', ParseIntPipe) id: number) {
    return this.currenciesService.deleteCurrency(id);
  }
}
