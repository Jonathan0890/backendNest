import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'summary' })
export class Summary {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.summaries)
    user: User

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total_income: number

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total_expense: number

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    nel_balance: number

    @Column({type: 'date'})
    summaryDate: Date
}
