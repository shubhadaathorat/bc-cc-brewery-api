import { Country } from 'src/countries/entities/country.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';


@Entity()
export class Province {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 75
    })
	province_name: string;

    @OneToOne(() => Country)
    @JoinColumn()
    country: Country 
}