import { User } from "src/users/entities/user.entity";
import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class Budget {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.budgets)
    @JoinColumn()
    user: User

    @Column({ length: 255 })
    budget_name: string
}
