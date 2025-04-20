import { Transaction } from "src/transactions/entities/transaction.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'bank_accounts' })
export class BankAccount {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 20 })
    account_Number: string

    @ManyToOne(() => User, user => user.bankAccounts)
    @JoinColumn()
    user: User

    @Column({ length: 50 })
    accountType: string

    @OneToMany(()=> Transaction, transaction => transaction.account)
    transactions: Transaction[];
    
}
