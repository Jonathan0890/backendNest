import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { BankAccountsService } from './bank_accounts.service';
import { CreateBankAccountDto } from './dto/create-bank_account.dto';
import { UpdateBankAccountDto } from './dto/update-bank_account.dto';

@Controller('bank-accounts')
export class BankAccountsController {
  constructor(private readonly bankAccountsService: BankAccountsService) {}

  @Post()
  createBankAccount(@Body() newBankAccount: CreateBankAccountDto) {
    return this.bankAccountsService.createBankAccount(newBankAccount);
  }

  @Get()
  getBankAccounts() {
    return this.bankAccountsService.getBankAccounts();
  }

  @Get(':id')
  getBankAccount(@Param('id', ParseIntPipe) id: number) {
    return this.bankAccountsService.getBankAccount(id);
  }

  @Patch(':id')
  updateBankAccount(@Param('id', ParseIntPipe) id: number, @Body() bankAccount: UpdateBankAccountDto) {
    return this.bankAccountsService.updateBankAccount(id, bankAccount);
  }

  @Delete(':id')
  deleteBankAccount(@Param('id', ParseIntPipe) id: number) {
    return this.bankAccountsService.deleteBankAccount(id);
  }
}
