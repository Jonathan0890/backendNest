import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'reports' })
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    issue: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @ManyToOne(() => User)
    student: User
}
