import { Group } from "src/group/entities/gruop.entity";
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

    @ManyToOne(() => Group)
    group: Group;
}
