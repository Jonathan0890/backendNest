import { Group } from "src/group/entities/gruop.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'grades'})
export class Grade {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;
    
    @OneToMany(() => Group, group => group.grade)
    groups : Group[];
}
