import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  createLoan(@Body() newLoan: CreateLoanDto) {
    return this.loansService.createLoan(newLoan);
  }

  @Get()
  getLoans() {
    return this.loansService.getLoans();
  }

  @Get(':id')
  getLoan(@Param('id', ParseIntPipe) id: number) {
    return this.loansService.getLoan(id);
  }

  @Patch(':id')
  updateLoan(@Param('id', ParseIntPipe) id: number, @Body() loan: UpdateLoanDto) {
    return this.loansService.updateLoan(id, loan);
  }

  @Delete(':id')
  deleteLoan(@Param('id', ParseIntPipe) id: number) {
    return this.loansService.deleteLoan(id);
  }
}
