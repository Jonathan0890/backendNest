import { Module } from '@nestjs/common';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Loan } from './entities/loan.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Loan, User]),
  ],
  controllers: [LoansController],
  providers: [LoansService],
})
export class LoansModule {}
