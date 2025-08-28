import { Module } from '@nestjs/common';
import { PaymentGatewayService } from './payment_gateway.service';
import { PaymentGatewayController } from './payment_gateway.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentGateway } from './entities/payment_gateway.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentGateway]),
  ],
  controllers: [PaymentGatewayController],
  providers: [PaymentGatewayService],
  exports: [PaymentGatewayService],
})
export class PaymentGatewayModule {}
