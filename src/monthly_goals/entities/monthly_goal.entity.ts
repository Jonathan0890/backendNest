import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'monthly_goals' })
export class MonthlyGoal {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.monthlyGoals)
    @JoinColumn()
    user: User

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    target_savings: number;

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    target_investment: number;

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    target_expense: number;

    @Column({ length: 10 })
    month: string;
    
}
