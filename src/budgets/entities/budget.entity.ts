import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'budgets' })
export class Budget {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.budgets)
    @JoinColumn()
    user: User

    @Column({ length: 255 })
    budget_name: string
}
