import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateExchangeRateDto } from './dto/create-exchange_rate.dto';
import { UpdateExchangeRateDto } from './dto/update-exchange_rate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExchangeRate } from './entities/exchange_rate.entity';

@Injectable()
export class ExchangeRatesService {

  constructor(
    @InjectRepository(ExchangeRate) private exchangeRateRepository: Repository<ExchangeRate>,
  ) { }
  async createExchangeRate(exchangeRate: CreateExchangeRateDto) {
    const exchangeRateFound = await this.exchangeRateRepository.findOne({
      where:{
        base_currency: exchangeRate.base_currency,
        target_currency: exchangeRate.target_currency,
        rate: exchangeRate.rate,
      }
    })

    if (exchangeRateFound) {
      throw new HttpException('Exchange rate already exists', HttpStatus.CONFLICT);
    }

    const newExchangeRate = this.exchangeRateRepository.create(exchangeRate);
    return this.exchangeRateRepository.save(newExchangeRate);
  }

  getExchangeRates() {
    return this.exchangeRateRepository.find();
  }

  async getExchangeRate(id: number) {
    const exchangeRateFound = await this.exchangeRateRepository.findOne({
      where: { id },
    })

    if (!exchangeRateFound) {
      throw new HttpException('Exchange rate not found', HttpStatus.NOT_FOUND);
    }

    return this.exchangeRateRepository.findOne({ where: { id } });
  }

  async updateExchangeRate(id: number, exchangeRate: UpdateExchangeRateDto) {
    const exchangeRateFound = await this.exchangeRateRepository.findOne({
      where: { id },
    })

    if (!exchangeRateFound) {
      throw new HttpException('Exchange rate not found', HttpStatus.NOT_FOUND);
    }

    const updateExchangeRate = Object.assign(exchangeRateFound, exchangeRate);
    return this.exchangeRateRepository.save(updateExchangeRate);
  }

  async deleteExchangeRate(id: number) {
    const result = await this.exchangeRateRepository.delete({ id });

    if (result.affected === 0) {
      throw new HttpException('Exchange rate not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
