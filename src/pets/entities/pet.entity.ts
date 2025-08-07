import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Observation } from './observation.entity';
import { MedicalRecord } from './medical-record.entity';

@Entity()
export class Pet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    type: string; // dog, cat, etc.

    @Column({ nullable: true })
    breed: string;

    @Column({ type: 'int', nullable: true })
    age: number;

    @ManyToOne(() => User, (user) => user.pets, { eager: false })
    owner: User;

    @OneToMany(() => Observation, (observation) => observation.pet, { cascade: true })
    observations: Observation[];

    @OneToMany(() => MedicalRecord, (medicalRecord) => medicalRecord.pet, { cascade: true })
    medicalRecords: MedicalRecord[];
}
