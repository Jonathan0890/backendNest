import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'reminders' })
export class Reminder {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.reminders)
    @JoinColumn()
    user: User

    @Column({ length: 255 })
    title: string

    @Column({ type: 'text' })
    description: string

    @Column({ type: 'date' })
    due_date: Date

    @Column({ default: false })
    is_recurring: boolean
    
}
