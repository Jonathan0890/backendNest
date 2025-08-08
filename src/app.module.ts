import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { GradeModule } from './grade/grade.module';
import { GruopModule } from './group/group.module';
import { SubjectModule } from './subject/subject.module';
import { ScheduleModule } from './schedule/schedule.module';
import { AttendanceModule } from './attendance/attendance.module';
import { ReportModule } from './report/report.module';
import { ContactModule } from './contact/contact.module';
import { EvaluationModule } from './evaluation/evaluation.module';
import { LoggerService } from './logger/logger.service';
import { LoggerModule } from './logger/logger.module';
import { FilesModule } from './files/files.module';
import { CacheCustomModule} from './cache/cache.module';
import { BankAccountsModule } from './bank_accounts/bank_accounts.module';
import { TransactionsModule } from './transactions/transactions.module';
import { BudgetsModule } from './budgets/budgets.module';
import { InvestmentsModule } from './investments/investments.module';
import { ExpenseCategoriesModule } from './expense_categories/expense_categories.module';
import { LoansModule } from './loans/loans.module';
import { RecurringPaymentsModule } from './recurring_payments/recurring_payments.module';
import { SavingsGoalsModule } from './savings_goals/savings_goals.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { RemindersModule } from './reminders/reminders.module';
import { SummaryModule } from './summary/summary.module';
import { ExchangeRatesModule } from './exchange_rates/exchange_rates.module';
import { MonthlyGoalsModule } from './monthly_goals/monthly_goals.module';
import { DatabaseModule } from './config/database.module';
import { PetsModule } from './pets/pets.module';
import { SeederModule } from './seeder/seeder.module';

@Module({
  imports: [
    DatabaseModule,
    SeederModule,
    UsersModule,
    PostsModule,
    AuthModule,
    RolesModule,
    GradeModule,
    GruopModule,
    SubjectModule,
    ScheduleModule,
    AttendanceModule,
    ReportModule,
    ContactModule,
    EvaluationModule,
    LoggerModule,
    FilesModule,
    CacheCustomModule,
    BankAccountsModule,
    TransactionsModule,
    BudgetsModule,
    InvestmentsModule,
    ExpenseCategoriesModule,
    LoansModule,
    RecurringPaymentsModule,
    SavingsGoalsModule,
    CurrenciesModule,
    RemindersModule,
    SummaryModule,
    ExchangeRatesModule,
    MonthlyGoalsModule,
    PetsModule,
  ],
  controllers: [AppController],
  providers: [AppService,  LoggerService ],
  exports: [LoggerService]
})
export class AppModule {}
