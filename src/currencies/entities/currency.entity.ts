import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'currencies' })
export class Currency {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 10 })
    currency_code: string

    @Column({ length: 255 })
    currency_name: string
}
