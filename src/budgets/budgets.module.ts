import { Module } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { BudgetsController } from './budgets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Budget } from './entities/budget.entity';
import { ExpenseCategory } from 'src/expense_categories/entities/expense_category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Budget, User, ExpenseCategory]),
  ],
  controllers: [BudgetsController],
  providers: [BudgetsService],
  exports: [BudgetsService],
})
export class BudgetsModule {}
