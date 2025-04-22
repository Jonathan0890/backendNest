import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvestmentsService } from './investments.service';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';

@Controller('investments')
export class InvestmentsController {
  constructor(private readonly investmentsService: InvestmentsService) {}

  @Post()
  createInvestment(@Body() newInvestment: CreateInvestmentDto) {
    return this.investmentsService.createInvestment(newInvestment);
  }

  @Get()
  getInvestments() {
    return this.investmentsService.getInvestments();
  }

  @Get(':id')
  getInvestment(@Param('id') id: number) {
    return this.investmentsService.getInvestment(id);
  }

  @Patch(':id')
  updateInvestment(@Param('id') id: number, @Body() updateInvestmentDto: UpdateInvestmentDto) {
    return this.investmentsService.updateInvestment(id, updateInvestmentDto);
  }

  @Delete(':id')
  deleteInvestment(@Param('id') id: number) {
    return this.investmentsService.deleteInvestment(id);
  }
}
