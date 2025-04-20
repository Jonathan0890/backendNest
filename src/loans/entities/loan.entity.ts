import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'loans' })
export class Loan {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.loans)
    @JoinColumn()
    user: User

    @Column({ length: 100 })
    lender: string;

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    amount: number;

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    interest_rate: number;

    @Column({ type: 'date' })
    due_date: Date;

}
