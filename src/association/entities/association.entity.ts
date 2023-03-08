import { Province } from 'src/provinces/entities/province.entity';
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Association {
    @PrimaryGeneratedColumn()
    association_id: number;

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

    @OneToOne(() => Province)
    @JoinColumn()
    province: Province 
}