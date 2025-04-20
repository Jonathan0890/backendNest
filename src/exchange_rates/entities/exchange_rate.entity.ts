import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'exchange_rates' })
export class ExchangeRate {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 10})
    base_currency: string

    @Column({ length: 10})
    target_currency: string

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    rate: number

}
