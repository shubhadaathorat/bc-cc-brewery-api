import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

import { Association } from '../../association/entities/association.entity';

export enum Role {
    User = 'user',
    Admin = 'admin',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn({type: 'int2'})
    id: number;

    @Column({
        type: "varchar",
        length: 75
    })
	first_name: string;

    @Column({
        type: "varchar",
        length: 75
    })
	last_name: string;

    @Column({
        type: "varchar",
        length: 25,
        unique: true,
        nullable: false
    })
	username: string;

    @Column({ 
        type: "varchar",
        length: 128,
        unique: true,
        nullable: false
    })
	email: string;

    @Column({
        type: "varchar",
        length: 255,
        nullable: false,
    })
	user_password: string;

    @Column({
        type: 'enum',
        enum: Role,
        nullable: false,
        default: Role.Admin
    })
    user_role: Role;

    @Column({nullable: false})
    is_active: boolean

    @OneToOne(() => Association)
    @JoinColumn()
    association: Association 
    
    @Column({type: 'int2'})
    created_by: number
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @Column({type: 'int2'})
    updated_by: number
    
    @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
    updated_at: Date;
}