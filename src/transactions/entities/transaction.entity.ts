import { BankAccount } from "src/bank_accounts/entities/bank_account.entity";
import { ExpenseCategory } from "src/expense_categories/entities/expense_category.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'transactions' })
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => BankAccount, account => account.transactions)
    @JoinColumn()
    account: BankAccount

    @Column({type:'date'})
    transactionDate: Date;
    
    @Column({type:'decimal', precision: 10, scale: 2})
    amount: number

    @ManyToOne(() => ExpenseCategory, category => category.transactions)
    @JoinColumn()
    category: ExpenseCategory
}
