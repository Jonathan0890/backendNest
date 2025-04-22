import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank_account.dto';
import { UpdateBankAccountDto } from './dto/update-bank_account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BankAccount } from './entities/bank_account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BankAccountsService {
  @InjectRepository(BankAccount) private bankAccountRepository: Repository<BankAccount>
  async createBankAccount(bankAccount: CreateBankAccountDto) {
    const bankAccountFound = await this.bankAccountRepository.findOne({
      where: {
        accountType: bankAccount.accountType,
        account_Number: bankAccount.account_Number
      },
    })

    if (bankAccountFound) {
      throw new HttpException('Bank account already exists', HttpStatus.BAD_REQUEST);
    }

    const newBankAccount = this.bankAccountRepository.create(bankAccount);
    return this.bankAccountRepository.save(newBankAccount);
  }

  getBankAccounts() {
    return this.bankAccountRepository.find();
  }

  async getBankAccount(id: number) {
    const bankAccountFound = await this.bankAccountRepository.findOne({
      where: { id },
    })

    if (!bankAccountFound) {
      throw new HttpException('Bank account not found', HttpStatus.NOT_FOUND);
    }
    return this.bankAccountRepository.findOne({where: {id}});
  }

  async updateBankAccount(id: number, bankAccount: UpdateBankAccountDto) {
    const bankAccountFound = await this.bankAccountRepository.findOne({
      where: { id },
    })

    if (!bankAccountFound) {
      throw new HttpException('Bank account not found', HttpStatus.NOT_FOUND);
    }
    const updateBankAccount = Object.assign(bankAccountFound, bankAccount);
    return  this.bankAccountRepository.save(updateBankAccount);
  }

  async deleteBankAccount(id: number) {
    const result = await this.bankAccountRepository.delete({ id });

    if (result.affected === 0) {
      throw new HttpException('Bank account not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
