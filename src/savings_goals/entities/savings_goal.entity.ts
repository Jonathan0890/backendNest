import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'savings_goals' })
export class SavingsGoal {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.savingGoals)
    user: User;

    @Column({ length: 255 })
    goal_name: string

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    goal_amount: number

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    target_amount: number

    @Column({ type: 'date' })
    deadline: Date

}
