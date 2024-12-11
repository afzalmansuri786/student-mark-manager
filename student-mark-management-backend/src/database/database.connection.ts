import "reflect-metadata";
import { DataSource } from "typeorm";
import { Student } from "../entities/student.entity";
import { Mark } from "../entities/mark.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "postgres",
    synchronize: true,
    logging: true,
    entities: [Student, Mark],
    migrations: [],
    subscribers: [],
});
