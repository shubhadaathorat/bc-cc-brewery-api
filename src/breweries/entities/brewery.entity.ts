import { Association } from 'src/association/entities/association.entity';
import { Column, Entity,  PrimaryGeneratedColumn, OneToOne, JoinColumn, Unique } from 'typeorm';

export enum BreweryType {
    micro = 'micro',
    macro = 'macro',
    taproom = 'taproom',
    brewpub = 'brewpub',
    large = 'large'
}

@Entity()
@Unique(['brewery_name', 'brewery_type', 'county_province'])
export class Brewery {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 75
    })
	brewery_name: string;

    @Column({
        type: 'enum',
        enum: BreweryType,
        nullable: false,
        default: BreweryType.micro
    })
    brewery_type: BreweryType;

    @Column({
        type: "varchar",
        length: 255
    })
	street_address: string;

    @Column({ 
        type: "varchar",
        length: 75
    })
	city: string;

    @Column({
        type: "varchar",
        length: 75
    })
	county_province: string;

    @Column({
        type: "varchar",
        length: 10
    })
	postal_code: string;

    @Column({
        type: "varchar",
        length: 75
    })
	country: string;

    @OneToOne(type => Association, association => association.id)
    @JoinColumn()
    association: Association

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