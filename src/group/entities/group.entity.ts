import { Grade } from "src/grade/entities/grade.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'gruops' })
export class Gruop {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    name: string

    @ManyToMany(()=> Grade, grade => grade.groups)
    grade: Grade ;

    @OneToMany(() => User, user => user.gruop)
    users: User[]
}
