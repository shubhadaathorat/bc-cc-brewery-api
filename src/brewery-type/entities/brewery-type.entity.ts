import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class BreweryType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 30
    })
	type_name: string;

    @Column({nullable: false})
    is_active: boolean

    @Column()
    created_by: number
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @Column()
    updated_by: number
    
    @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
    updated_at: Date;
}
