import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import {User} from './user.entity';

@Entity()
export class Association {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 255
    })
	association_name: string;

    @Column()
    created_by: number
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @Column()
    updated_by: number
    
    @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
    updated_at: Date;

    @OneToOne(() => User, user => user.id)
    user_id: User;
}