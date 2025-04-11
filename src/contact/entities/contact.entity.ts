import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'contacts' })
export class Contact {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    sentAt: Date;

    @ManyToOne(() => User)
    sender: User;

    @ManyToOne(() => User)
    receiver: User;
}
