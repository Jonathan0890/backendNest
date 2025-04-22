import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Evaluation } from 'src/evaluation/entities/evaluation.entity';
import { Attendance } from 'src/attendance/entities/attendance.entity';
import { Report } from 'src/report/entities/report.entity';
import { Contact } from 'src/contact/entities/contact.entity';
import { Group } from 'src/group/entities/gruop.entity';
import { BankAccount } from 'src/bank_accounts/entities/bank_account.entity';
import { Budget } from 'src/budgets/entities/budget.entity';
import { Currency } from 'src/currencies/entities/currency.entity';
import { ExchangeRate } from 'src/exchange_rates/entities/exchange_rate.entity';
import { ExpenseCategory } from 'src/expense_categories/entities/expense_category.entity';
import { Investment } from 'src/investments/entities/investment.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { Loan } from 'src/loans/entities/loan.entity';
import { MonthlyGoal } from 'src/monthly_goals/entities/monthly_goal.entity';
import { Reminder } from 'src/reminders/entities/reminder.entity';
import { RecurringPayment } from 'src/recurring_payments/entities/recurring_payment.entity';
import { SavingsGoal } from 'src/savings_goals/entities/savings_goal.entity';
import { Summary } from 'src/summary/entities/summary.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, Profile, Role, Group, Evaluation, Attendance, Report, Contact,
      BankAccount, Budget, Currency, ExchangeRate, ExpenseCategory, Investment,
      Loan, MonthlyGoal, Reminder, RecurringPayment, SavingsGoal, Summary, Transaction
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
