import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'dogs' })
export class Dog {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 100 })
    name: string

    @Column({ length: 50 })
    breed: string

    @Column({ type: 'int' })
    age: number
}