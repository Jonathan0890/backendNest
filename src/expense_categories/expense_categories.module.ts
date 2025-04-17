import { Module } from '@nestjs/common';
import { ExpenseCategoriesService } from './expense_categories.service';
import { ExpenseCategoriesController } from './expense_categories.controller';

@Module({
  controllers: [ExpenseCategoriesController],
  providers: [ExpenseCategoriesService],
})
export class ExpenseCategoriesModule {}
