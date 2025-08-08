// src/seeder/seerder.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

import { User } from 'src/users/entities/user.entity';
import { Profile } from 'src/users/entities/profile.entity';
import { Role } from 'src/roles/entities/role.entity';
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
import { Group } from 'src/group/entities/gruop.entity';

@Injectable()
export class SeerderService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Profile) private profileRepo: Repository<Profile>,
        @InjectRepository(Role) private roleRepo: Repository<Role>,
        @InjectRepository(Group) private groupRepo: Repository<Group>,
        @InjectRepository(Grade) private gradeRepo: Repository<Grade>,
        @InjectRepository(Pet) private petRepo: Repository<Pet>,
        @InjectRepository(Observation) private observationRepo: Repository<Observation>,
        @InjectRepository(MedicalRecord) private medicalRecordRepo: Repository<MedicalRecord>,
        @InjectRepository(BankAccount) private bankAccountRepo: Repository<BankAccount>,
        @InjectRepository(Transaction) private transactionRepo: Repository<Transaction>,
        @InjectRepository(ExpenseCategory) private expenseCategoryRepo: Repository<ExpenseCategory>,
        @InjectRepository(Evaluation) private evaluationRepo: Repository<Evaluation>,
        @InjectRepository(Attendance) private attendanceRepo: Repository<Attendance>,
        @InjectRepository(Report) private reportRepo: Repository<Report>,
        @InjectRepository(Loan) private loanRepo: Repository<Loan>,
        @InjectRepository(Investment) private investmentRepo: Repository<Investment>,
        @InjectRepository(MonthlyGoal) private monthlyGoalRepo: Repository<MonthlyGoal>,
        @InjectRepository(SavingsGoal) private savingsGoalRepo: Repository<SavingsGoal>,
        @InjectRepository(Summary) private summaryRepo: Repository<Summary>,
        @InjectRepository(Reminder) private reminderRepo: Repository<Reminder>,
        @InjectRepository(RecurringPayment) private recurringPaymentRepo: Repository<RecurringPayment>,
        @InjectRepository(Contact) private contactRepo: Repository<Contact>,
        @InjectRepository(Post) private postRepo: Repository<Post>,
        @InjectRepository(Schedule) private scheduleRepo: Repository<Schedule>,
        @InjectRepository(Subject) private subjectRepo: Repository<Subject>,
        @InjectRepository(Currency) private currencyRepo: Repository<Currency>,
        @InjectRepository(ExchangeRate) private exchangeRateRepo: Repository<ExchangeRate>,
        @InjectRepository(Budget) private budgetRepo: Repository<Budget>,
    ) { }

    async seed() {
        // ---------- Roles ----------
        const roles = (await this.roleRepo.count())
            ? await this.roleRepo.find()
            : await this.roleRepo.save([
                this.roleRepo.create({ name: 'Admin' }),
                this.roleRepo.create({ name: 'User' }),
                this.roleRepo.create({ name: 'Guest' }),
                this.roleRepo.create({ name: 'Teacher' }),
                this.roleRepo.create({ name: 'Student' }),
                this.roleRepo.create({ name: 'Parent' }),
                this.roleRepo.create({ name: 'Guardian' }),
                this.roleRepo.create({ name: 'Employee' }),
            ]);

        // ---------- Grades ----------
        const grades = (await this.gradeRepo.count())
            ? await this.gradeRepo.find()
            : await this.gradeRepo.save([
                this.gradeRepo.create({ name: 'Grade 1' }),
                this.gradeRepo.create({ name: 'Grade 2' }),
                this.gradeRepo.create({ name: 'Grade 3' }),
            ]);

        // ---------- Groups (ManyToOne -> Grade) ----------
        const groups = (await this.groupRepo.count())
            ? await this.groupRepo.find()
            : await Promise.all([
                this.groupRepo.save(this.groupRepo.create({ name: 'Group A', grade: grades[0] })),
                this.groupRepo.save(this.groupRepo.create({ name: 'Group B', grade: grades[1] })),
                this.groupRepo.save(this.groupRepo.create({ name: 'Group C', grade: grades[2] })),
                this.groupRepo.save(this.groupRepo.create({ name: 'Group D', grade: grades[0] })),
                this.groupRepo.save(this.groupRepo.create({ name: 'Group E', grade: grades[1] })),
                this.groupRepo.save(this.groupRepo.create({ name: 'Group F', grade: grades[2] })),
            ]);

        // ---------- Subjects ----------
        const subjects = (await this.subjectRepo.count())
            ? await this.subjectRepo.find()
            : await this.subjectRepo.save([
                this.subjectRepo.create({ name: 'Math', group: groups[0] }),
                this.subjectRepo.create({ name: 'Science', group: groups[1] }),
                this.subjectRepo.create({ name: 'English', group: groups[0] }),
                this.subjectRepo.create({ name: 'History', group: groups[1] }),
                this.subjectRepo.create({ name: 'Art', group: groups[0] }),
                this.subjectRepo.create({ name: 'Music', group: groups[1] }),
            ]);

        // ---------- Schedules ----------
        const schedules = (await this.scheduleRepo.count())
            ? await this.scheduleRepo.find()
            : await this.scheduleRepo.save([
                this.scheduleRepo.create({ day: 'Monday', group: groups[0], subject: subjects[0], startTime: '09:00', endTime: '10:00' }),
                this.scheduleRepo.create({ day: 'Tuesday', group: groups[1], subject: subjects[1], startTime: '11:00', endTime: '12:00' }),
                this.scheduleRepo.create({ day: 'Wednesday', group: groups[0], subject: subjects[2], startTime: '13:00', endTime: '14:00' }),
                this.scheduleRepo.create({ day: 'Thursday', group: groups[1], subject: subjects[3], startTime: '15:00', endTime: '16:00' }),
                this.scheduleRepo.create({ day: 'Friday', group: groups[0], subject: subjects[0], startTime: '17:00', endTime: '18:00' }),
            ]);

        // ---------- Expense categories ----------
        const categories = (await this.expenseCategoryRepo.count())
            ? await this.expenseCategoryRepo.find()
            : await this.expenseCategoryRepo.save([
                this.expenseCategoryRepo.create({ category_name: 'Food' }),
                this.expenseCategoryRepo.create({ category_name: 'Transportation' }),
                this.expenseCategoryRepo.create({ category_name: 'Entertainment' }),
            ]);

        // ---------- Currencies & exchange rates ----------
        if ((await this.currencyRepo.count()) === 0) {
            await this.currencyRepo.save([
                this.currencyRepo.create({ currency_code: 'USD', currency_name: 'US Dollar' }),
                this.currencyRepo.create({ currency_code: 'EUR', currency_name: 'Euro' }),
                this.currencyRepo.create({ currency_code: 'MXN', currency_name: 'Peso MXN' }),
            ]);
        }

        if ((await this.exchangeRateRepo.count()) === 0) {
            await this.exchangeRateRepo.save(
                this.exchangeRateRepo.create({
                    base_currency: 'USD',
                    target_currency: 'MXN',
                    rate: 18.5,
                }),
            );
            await this.exchangeRateRepo.save(
                this.exchangeRateRepo.create({
                    base_currency: 'EUR',
                    target_currency: 'USD',
                    rate: 1.08,
                }),
            );
        }

        // ---------- Loop principal para crear usuarios y recursos relacionados ----------
        for (let i = 0; i < 10; i++) {
            // Profile
            const profile = await this.profileRepo.save(
                this.profileRepo.create({
                    firstname: faker.person.firstName(),
                    lastname: faker.person.lastName(),
                    age: faker.number.int({ min: 18, max: 65 }),
                }),
            );

            // User (nota: faker.internet.username() es la forma actual)
            const user = await this.userRepo.save(
                this.userRepo.create({
                    username: faker.internet.username(),
                    password: faker.internet.password(),
                    profile,
                    roles: [faker.helpers.arrayElement(roles)],
                    group: faker.helpers.arrayElement(groups),
                }),
            );

            // Pet
            await this.petRepo.save(
                this.petRepo.create({
                    name: faker.animal.dog(),
                    type: 'dog',
                    breed: faker.animal.dog(),
                    age: faker.number.int({ min: 1, max: 15 }),
                    owner: user,
                    observations: [this.observationRepo.create({ note: faker.lorem.sentence() })],
                    medicalRecords: [this.medicalRecordRepo.create({ description: faker.lorem.paragraph() })],
                }),
            );

            // Bank account
            const account = await this.bankAccountRepo.save(
                this.bankAccountRepo.create({
                    account_Number: faker.finance.accountNumber(),
                    accountType: 'Checking',
                    user,
                }),
            );

            // Transaction
            await this.transactionRepo.save(
                this.transactionRepo.create({
                    account,
                    transactionDate: faker.date.recent(),
                    amount: parseFloat(faker.finance.amount()),
                    category: faker.helpers.arrayElement(categories),
                }),
            );

            // Evaluation
            await this.evaluationRepo.save(
                this.evaluationRepo.create({
                    value: faker.number.int({ min: 0, max: 100 }),
                    remarks: faker.lorem.words(5),
                    student: user,
                    subject: faker.helpers.arrayElement(subjects),
                }),
            );

            // Attendance
            await this.attendanceRepo.save(
                this.attendanceRepo.create({
                    present: faker.datatype.boolean(),
                    student: user,
                    schedule: faker.helpers.arrayElement(schedules),
                }),
            );

            // Report
            await this.reportRepo.save(
                this.reportRepo.create({
                    issue: faker.lorem.words(3),
                    description: faker.lorem.paragraph(),
                    student: user,
                }),
            );

            // Loan
            await this.loanRepo.save(
                this.loanRepo.create({
                    user,
                    lender: faker.company.name(),
                    amount: parseFloat(faker.finance.amount()),
                    interest_rate: 5.5,
                    due_date: faker.date.future(),
                }),
            );

            // Investment
            await this.investmentRepo.save(
                this.investmentRepo.create({
                    user,
                    investment_name: 'Crypto',
                    value: parseFloat(faker.finance.amount()),
                }),
            );

            // MonthlyGoal
            await this.monthlyGoalRepo.save(
                this.monthlyGoalRepo.create({
                    user,
                    target_savings: 500,
                    target_investment: 300,
                    target_expense: 200,
                    month: 'August',
                }),
            );

            // SavingsGoal
            await this.savingsGoalRepo.save(
                this.savingsGoalRepo.create({
                    user,
                    goal_name: 'Buy Laptop',
                    goal_amount: 1000,
                    target_amount: 800,
                    deadline: faker.date.future(),
                }),
            );

            // Summary
            await this.summaryRepo.save(
                this.summaryRepo.create({
                    user,
                    total_income: 3000,
                    total_expense: 2000,
                    nel_balance: 1000,
                    summaryDate: new Date(),
                }),
            );

            // Reminder
            await this.reminderRepo.save(
                this.reminderRepo.create({
                    user,
                    title: 'Pay Rent',
                    description: 'Monthly rent payment',
                    due_date: faker.date.future(),
                    is_recurring: true,
                }),
            );

            // RecurringPayment
            await this.recurringPaymentRepo.save(
                this.recurringPaymentRepo.create({
                    user,
                    amount: 15.99,
                    description: 'Netflix Subscription',
                    frequency: 'MONTHLY',
                }),
            );

            // Contacts (opcional)
            const receiver = await this.userRepo.findOne({ where: { id: 1 } });
            if (receiver && receiver.id !== user.id) {
                await this.contactRepo.save(
                    this.contactRepo.create({
                        sender: user,
                        receiver,
                        message: faker.lorem.sentence(),
                    }),
                );
            }

            // Post
            await this.postRepo.save(
                this.postRepo.create({
                    title: faker.lorem.words(3),
                    content: faker.lorem.paragraph(),
                    author: user,
                }),
            );

            // Budget
            await this.budgetRepo.save(
                this.budgetRepo.create({
                    user,
                    budget_name: faker.commerce.productName(),
                }),
            );
        }

        console.log('✅ Seeding completed');
    }
}
