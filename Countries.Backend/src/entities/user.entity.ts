import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Guid } from "guid-typescript";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: Guid;

    @Column({unique: true})
    username: string;

    @Column()
    hashedPassword: string;
}