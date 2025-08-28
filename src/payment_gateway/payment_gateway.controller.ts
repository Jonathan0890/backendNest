import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PaymentGatewayService } from './payment_gateway.service';
import { CreatePaymentGatewayDto } from './dto/create-payment_gateway.dto';
import { UpdatePaymentGatewayDto } from './dto/update-payment_gateway.dto';

@Controller('payment-gateway')
export class PaymentGatewayController {
  constructor(private readonly paymentGatewayService: PaymentGatewayService) {}

  @Post()
  createPaymentGateway(@Body() newPaymentGateway: CreatePaymentGatewayDto) {
    return this.paymentGatewayService.createPaymentGateway(newPaymentGateway);
  }

  @Get()
  getPaymentGateways() {
    return this.paymentGatewayService.getPaymentGateways();
  }

  @Get(':id')
  getPaymentGateway(@Param('id', ParseIntPipe) id: number) {
    return this.paymentGatewayService.getPaymentGateway(id);
  }

  @Patch(':id')
  updatePaymentGateway(@Param('id', ParseIntPipe) id: number, @Body() paymentGateway: UpdatePaymentGatewayDto) {
    return this.paymentGatewayService.updatePaymentGateway(id, paymentGateway);
  }

  @Delete(':id')
  deletePaymentGateway(@Param('id', ParseIntPipe) id: number) {
    return this.paymentGatewayService.deletePaymentGateway(id);
  }
}
