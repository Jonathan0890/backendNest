// src/seeder/seeder.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeerderService } from './seerder.service';
import { User } from 'src/users/entities/user.entity';
import { Profile } from 'src/users/entities/profile.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Group } from 'src/group/entities/gruop.entity';
import { Grade } from 'src/grade/entities/grade.entity';
import { Pet } from 'src/pets/entities/pet.entity';
import { Observation } from 'src/pets/entities/observation.entity';
import { MedicalRecord } from 'src/pets/entities/medical-record.entity';
import { BankAccount } from 'src/bank_accounts/entities/bank_account.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { ExpenseCategory } from 'src/expense_categories/entities/expense_category.entity';
import { Evaluation } from 'src/evaluation/entities/evaluation.entity';
import { Attendance } from 'src/attendance/entities/attendance.entity';
import { Loan } from 'src/loans/entities/loan.entity';
import { Investment } from 'src/investments/entities/investment.entity';
import { MonthlyGoal } from 'src/monthly_goals/entities/monthly_goal.entity';
import { SavingsGoal } from 'src/savings_goals/entities/savings_goal.entity';
import { Summary } from 'src/summary/entities/summary.entity';
import { Reminder } from 'src/reminders/entities/reminder.entity';
import { RecurringPayment } from 'src/recurring_payments/entities/recurring_payment.entity';
import { Contact } from 'src/contact/entities/contact.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { Subject } from 'src/subject/entities/subject.entity';
import { Currency } from 'src/currencies/entities/currency.entity';
import { ExchangeRate } from 'src/exchange_rates/entities/exchange_rate.entity';
import { Budget } from 'src/budgets/entities/budget.entity';
import { Report } from 'src/report/entities/report.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([
            User, Profile, Role, Group, Grade, Pet, Observation, MedicalRecord,
            BankAccount, Transaction, ExpenseCategory, Evaluation, Attendance,
            Report, Loan, Investment, MonthlyGoal, SavingsGoal, Summary,
            Reminder, RecurringPayment, Contact, Post, Schedule, Subject,
            Currency, ExchangeRate, Budget, Report
        ]),
    ],
    providers: [SeerderService],
    exports: [SeerderService],
})
export class SeederModule { }
