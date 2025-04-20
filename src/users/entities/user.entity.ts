import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";
import { Post } from "src/posts/entities/post.entity";
import { Role } from "src/roles/entities/role.entity";
import { Evaluation } from "src/evaluation/entities/evaluation.entity";
import { Attendance } from "src/attendance/entities/attendance.entity";
import { Report } from "src/report/entities/report.entity";
import { Contact } from "src/contact/entities/contact.entity";
import { Group } from "src/group/entities/gruop.entity";
import { BankAccount } from "src/bank_accounts/entities/bank_account.entity";
import { Budget } from "src/budgets/entities/budget.entity";
import { Investment } from "src/investments/entities/investment.entity";
import { Loan } from "src/loans/entities/loan.entity";
import { Reminder } from "src/reminders/entities/reminder.entity";
import { RecurringPayment } from "src/recurring_payments/entities/recurring_payment.entity";
import { MonthlyGoal } from "src/monthly_goals/entities/monthly_goal.entity";
import { SavingsGoal } from "src/savings_goals/entities/savings_goal.entity";
import { Summary } from "src/summary/entities/summary.entity";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    username: string

    @Column()
    password: string

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column({ nullable: true })
    authStrategy: string

    @OneToOne(() => Profile) //uno a uno
    @JoinColumn()
    profile: Profile

    @ManyToMany(() => Post, post => post.author ) //muchos a muchos
    posts: Post [];

    @ManyToMany(()=> Role, role => role.users) //muchos a muchos
    @JoinTable({ name: 'users_roles' })
    roles: Role [];

    @ManyToOne(() => Group, group => group.users ) 
    group: Group ;

    @OneToMany(() => Evaluation, evaluation => evaluation.student) 
    evaluations: Evaluation []

    @OneToMany(() => Attendance, attendance => attendance.student) 
    attendances: Attendance [];

    @OneToMany(() => Report, report => report.student) 
    reports: Report [];

    @OneToMany(()=> Contact, contact => contact.sender) 
    sentMessages: Contact [];

    @OneToMany(() => Contact, contact => contact.receiver) 
    receivedMessages: Contact [];


    //Parte de otro fronten de angular

    @OneToMany(()=> BankAccount, account => account.user)
    bankAccounts: BankAccount [];

    @OneToMany(()=> Budget, budget => budget.user)
    budgets: Budget [];

    @OneToMany(() => Investment, investment => investment.user)
    investments: Investment[];

    @OneToMany(() => Loan, loan => loan.user)
    loans: Loan[];

    @OneToMany(() => Reminder, reminder => reminder.user)
    reminders: Reminder[];

    @OneToMany(() => RecurringPayment, payment => payment.user)
    recurringPayments: RecurringPayment[];

    @OneToMany(() => MonthlyGoal, goal => goal.user)
    monthlyGoals: MonthlyGoal[];

    @OneToMany(() => SavingsGoal, savingGoal => savingGoal.user)
    savingGoals: SavingsGoal[];
    
    @OneToMany(()=> Summary, summary => summary.user)
    summaries: Summary [];
    
}