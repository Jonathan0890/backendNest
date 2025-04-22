import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) { }

  @Get()
  getTransactions() {
    return this.transactionsService.getTransactions();
  }

  @Get(':id')
  getTransaction(@Param('id', ParseIntPipe) id: number) {
    return this.transactionsService.getTransaction(id);
  }

  @Post()
  createTransaction(@Body() newTransaction: CreateTransactionDto) {
    return this.transactionsService.createTransaction(newTransaction);
  }

  @Patch(':id')
  updateTransaction(@Param('id', ParseIntPipe) id: number, @Body() transaction: UpdateTransactionDto) {
    return this.transactionsService.updateTransaction(id, transaction);
  }

  @Delete(':id')
  deleteTransaction(@Param('id', ParseIntPipe) id: number) {
    return this.transactionsService.daleteTransaction(id);
  }
}
