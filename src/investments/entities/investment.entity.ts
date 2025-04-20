import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'investments'})
export class Investment {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.investments)
    @JoinColumn()
    user: User

    @Column({length: 255})
    investment_name: string

    @Column({type: 'decimal', precision: 15, scale: 2})
    value: number

}
