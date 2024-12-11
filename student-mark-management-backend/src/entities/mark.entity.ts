import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, DeepPartial } from "typeorm";
import { Student } from "./student.entity";

@Entity()
export class Mark {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    subject: string;

    @Column("int")
    mark: number;

    @ManyToOne(() => Student, { eager: true, onDelete: 'CASCADE', })
    student: Student | number;
}
