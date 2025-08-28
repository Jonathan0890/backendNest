import { User } from "src/users/entities/user.entity";
import { Column,  Entity,  ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('shopping_cart')
export class ShoppingCart {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    productName: string;

    @Column('decimal', { precision: 15, scale: 2 })
    price: number;

    @Column()
    quantity: number;

    @ManyToOne(()=> User, user => user.shoppingCarts)
    user: User;
}
