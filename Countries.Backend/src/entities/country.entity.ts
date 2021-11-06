import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Guid } from "guid-typescript";
import { Continent } from "../enums/continent";

@Entity()
export class Country{
    @PrimaryGeneratedColumn('uuid')
    id: Guid;

    @Column()
    name: string;

    @Column('float')
    area: number;

    @Column()
    continent: Continent;

    @Column()
    description: string;
}