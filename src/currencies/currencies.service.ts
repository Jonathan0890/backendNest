import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Currency } from './entities/currency.entity';

@Injectable()
export class CurrenciesService {
  constructor(
    @InjectRepository(Currency) private currencyRepository: Repository<Currency>,
  ) {}
  async createCurrency(currency: CreateCurrencyDto) {
    const currencyFound = await this.currencyRepository.findOne({
      where: {
        currency_code: currency.currency_code,
        currency_name: currency.currency_name,
      },
    })

    if (currencyFound) {
      throw new HttpException('Currency already exists', HttpStatus.CONFLICT);
    }

    const newCurrency = this.currencyRepository.create(currency);
    return this.currencyRepository.save(newCurrency);
  }

  getCurrencies() {
    return this.currencyRepository.find();
  }

  async getCurrency(id: number) {
    const currencyFound = await this.currencyRepository.findOne({
      where: {
        id,
      },
    })

    if (!currencyFound) {
      throw new HttpException('Currency not found', HttpStatus.NOT_FOUND);
    }
    return this.currencyRepository.findOne({ where: { id } });
  }

  async updateCurrency(id: number, currency: UpdateCurrencyDto) {
    const currencyFound = await this.currencyRepository.findOne({
      where: {
        id,
      },
    })

    if (!currencyFound) {
      throw new HttpException('Currency not found', HttpStatus.NOT_FOUND);
    }

    const updateCurrency = Object.assign(currencyFound, currency);
    return this.currencyRepository.save(updateCurrency);
  }

  async deleteCurrency(id: number) {
    const result = await this.currencyRepository.delete({ id });

    if (result.affected === 0) {
      throw new HttpException('Currency not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
