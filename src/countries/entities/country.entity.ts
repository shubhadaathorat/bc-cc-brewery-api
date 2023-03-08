import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Country {
    @PrimaryGeneratedColumn()
    country_id: number;

    @Column({
        type: "varchar",
        length: 75
    })
	country_name: string;

    @Column()
    code: string
}