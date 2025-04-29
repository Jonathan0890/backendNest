import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'recurring_payments' })
export class RecurringPayment {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({ type: 'decimal'})
    amount: number

    @Column({ length: 255 })
    description: string

    @Column({ type: 'enum', enum: ['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'], default: 'DAILY' })
    frequency: string

    @ManyToOne(() => User, user => user.recurringPayments)
    @JoinColumn()
    user: User;

}
