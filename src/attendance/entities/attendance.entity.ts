import { Schedule } from "src/schedule/entities/schedule.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'attendances' })
export class Attendance {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: false })
    present: boolean;

    @ManyToOne(() => User)
    student: User;

    @ManyToOne(() => Schedule)
    schedule: Schedule;
}
