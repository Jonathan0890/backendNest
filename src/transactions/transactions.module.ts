import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { BankAccount } from 'src/bank_accounts/entities/bank_account.entity';
import { ExpenseCategory } from 'src/expense_categories/entities/expense_category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, BankAccount, ExpenseCategory]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
