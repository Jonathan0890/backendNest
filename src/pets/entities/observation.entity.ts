import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pet } from './pet.entity';

@Entity()
export class Observation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    note: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(() => Pet, (pet) => pet.observations, { onDelete: 'CASCADE' })
    pet: Pet;
}
