import { Subject } from "src/subject/entities/subject.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'evaluations'})
export class Evaluation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value : number;

    @Column({ nullable: true })
    remarks : string;

    @ManyToOne(()=> User)
    student: User;

    @ManyToOne(()=> Subject)
    subject: Subject;
}
