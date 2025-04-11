import { Gruop } from "src/group/entities/group.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'grades'})
export class Grade {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;
    
    @OneToMany(() => Gruop, gruop => gruop.grade)
    groups : Gruop[];
}
