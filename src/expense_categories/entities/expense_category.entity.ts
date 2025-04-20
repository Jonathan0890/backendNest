import { Transaction } from "src/transactions/entities/transaction.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'expense_categories' })
export class ExpenseCategory {

    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 255})
    category_name: string

    @OneToMany(() => Transaction, transaction => transaction.category)
    transactions: Transaction[]

}
