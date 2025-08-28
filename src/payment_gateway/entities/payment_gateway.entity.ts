import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('payment_gateways')
export class PaymentGateway {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    providerName: string;

    @Column()
    apiKey: string;

    @Column()
    apiSecret: string;

    @ManyToOne(() => User, user => user.paymentGateways)
    user: User;
}
