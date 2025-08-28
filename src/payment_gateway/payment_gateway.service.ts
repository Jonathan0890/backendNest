import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePaymentGatewayDto } from './dto/create-payment_gateway.dto';
import { UpdatePaymentGatewayDto } from './dto/update-payment_gateway.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentGateway } from './entities/payment_gateway.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentGatewayService {
  constructor(
    @InjectRepository(PaymentGateway) private paymentGatewayRepository: Repository<PaymentGateway>,
  ) { }

  async createPaymentGateway(paymentGateway: CreatePaymentGatewayDto) {
    const paymentGatewayFound = await this.paymentGatewayRepository.findOne({
      where: { providerName: paymentGateway.providerName },
    });

    if (paymentGatewayFound) {
      throw new HttpException('Payment gateway already exists', HttpStatus.CONFLICT);
    }

    const newPaymentGateway = this.paymentGatewayRepository.create(paymentGateway);
    return this.paymentGatewayRepository.save(newPaymentGateway);
  }

  getPaymentGateways() {
    return this.paymentGatewayRepository.find();
  }

  async getPaymentGateway(id: number) {
    return this.findPaymentGatewayOrThrow(id);
  }

  async updatePaymentGateway(id: number, paymentGateway: UpdatePaymentGatewayDto) {
    const paymentGatewayFound = await this.findPaymentGatewayOrThrow(id);

    const updatePaymentGateway = Object.assign(paymentGatewayFound, paymentGateway);
    return this.paymentGatewayRepository.save(updatePaymentGateway);
  }

  async deletePaymentGateway(id: number) {
    const result = await this.paymentGatewayRepository.delete({ id });

    if (result.affected === 0) {
      throw new HttpException('Payment gateway not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  private async findPaymentGatewayOrThrow(id: number): Promise<PaymentGateway> {
    const paymentGatewayFound = await this.paymentGatewayRepository.findOne({ where: { id } });
    if (!paymentGatewayFound) {
      throw new HttpException('Payment gateway not found', HttpStatus.NOT_FOUND);
    }
    return paymentGatewayFound;
  }
}
