import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum Role {
    User = 'admin',
    Admin = 'user',
}

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
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
        default: Role.User,
        nullable: false
    })
    user_role: Role;

    @Column({nullable: false})
    is_active: boolean
    
    @Column({        
        nullable: false
    })
    created_by: number
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @Column({        
        nullable: false
    })
    updated_by: number
    
    @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
    updated_at: Date;
}