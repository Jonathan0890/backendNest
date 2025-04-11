import { Gruop } from "src/group/entities/group.entity";
import { Subject } from "src/subject/entities/subject.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "schedules" })
export class Schedule {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    day: string;

    @Column()
    startTime: string;

    @Column()
    endTime: string;

    @ManyToOne(() => Subject)
    subject: Subject;

    @ManyToOne(() => Gruop)
    group: Gruop;
}
