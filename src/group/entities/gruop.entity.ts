import { Grade } from "src/grade/entities/grade.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'gruops' })
export class Group {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    name: string

    @ManyToMany(()=> Grade, (grade) => grade.groups, { cascade: true })
    grade: Grade;

    @OneToMany(() => User, user => user.group)
    users: User[];
}
