import { CategoryCatalog } from "src/category_catalog/entities/category_catalog.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('promotion')
export class Promotion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('decimal', { precision: 15, scale: 2 })
    discountPercentage: number;

    @Column({ type: 'timestamp'})
    startDate: Date;

    @Column({ type: 'timestamp', nullable: true })
    endDate: Date;

    @ManyToOne(() => User, user => user.promotions, { onDelete: 'CASCADE' })
    createBy: User;

    @OneToMany(() => CategoryCatalog, category => category.promotion)
    category: CategoryCatalog;
}
