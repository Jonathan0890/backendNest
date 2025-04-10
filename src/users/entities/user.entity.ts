import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";
import { Post } from "src/posts/entities/post.entity";
import { Role } from "src/roles/entities/role.entity";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    username: string

    @Column()
    password: string

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column({ nullable: true })
    authStrategy: string

    @OneToOne(() => Profile) //uno a uno
    @JoinColumn()
    profile: Profile

    @ManyToMany(() => Post, post => post.author ) //muchos a muchos
    posts: Post [];

    @ManyToMany(()=> Role, role => role.users) //muchos a muchos
    @JoinTable({ name: 'users_roles' })
    roles: Role [];
}