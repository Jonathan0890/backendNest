import { Module } from '@nestjs/common';
import { ExpenseCategoriesService } from './expense_categories.service';
import { ExpenseCategoriesController } from './expense_categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseCategory } from './entities/expense_category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExpenseCategory]),
  ],
  controllers: [ExpenseCategoriesController],
  providers: [ExpenseCategoriesService],
  exports: [ExpenseCategoriesService]
})
export class ExpenseCategoriesModule {}
