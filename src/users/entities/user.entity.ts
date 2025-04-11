import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";
import { Post } from "src/posts/entities/post.entity";
import { Role } from "src/roles/entities/role.entity";
import { Gruop } from "src/group/entities/group.entity";
import { Evaluation } from "src/evaluation/entities/evaluation.entity";
import { Attendance } from "src/attendance/entities/attendance.entity";
import { Report } from "src/report/entities/report.entity";
import { Contact } from "src/contact/entities/contact.entity";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    username: string

    @Column()
    password: string

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column({ nullable: true })
    authStrategy: string

    @OneToOne(() => Profile) //uno a uno
    @JoinColumn()
    profile: Profile

    @ManyToMany(() => Post, post => post.author ) //muchos a muchos
    posts: Post [];

    @ManyToMany(()=> Role, role => role.users) //muchos a muchos
    @JoinTable({ name: 'users_roles' })
    roles: Role [];

    @ManyToOne(() => Gruop, gruop => gruop.users ) //uno a muchos
    gruop: Gruop;

    @OneToMany(() => Evaluation, evaluation => evaluation.student) //uno a muchos
    evaluations: Evaluation []

    @OneToMany(() => Attendance, attendance => attendance.student) //uno a muchos
    attendances: Attendance [];

    @OneToMany(() => Report, report => report.student) //uno a muchos
    reports: Report [];

    @OneToMany(()=> Contact, contact => contact.sender) //uno a muchos
    sentMessages: Contact [];

    @OneToMany(() => Contact, contact => contact.receiver) //uno a muchos
    receivedMessages: Contact [];

}