import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Mark } from "./mark.entity";

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({ unique: true })
    email: string;

    // @OneToMany(() => Mark, (mark) => mark.student)
    // marks: Mark[];
}
