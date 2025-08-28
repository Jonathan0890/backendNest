import { Promotion } from "src/promotion/entities/promotion.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('category_catalog')
export class CategoryCatalog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    description: string;

    @ManyToOne(() => Promotion, promotion => promotion.category)
    promotion: Promotion;
}
