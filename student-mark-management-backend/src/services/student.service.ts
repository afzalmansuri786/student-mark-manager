import { Student } from "../entities/student.entity";
import { AppDataSource } from "../database/database.connection";
import { CreateStudentDto } from "../dto/create-student.dto";
import { UpdateStudentDto } from "../dto/update-student.dto";
import { validate } from "class-validator";
import { Like } from "typeorm";

export const studentService = {
    createStudent: async (data: CreateStudentDto) => {
        try {
            const {email, first_name, last_name} = data;

            if(!email || !first_name || !last_name){
                throw new Error("Input validation failed")
            }


            const studentRepository = AppDataSource.getRepository(Student);
            const student = studentRepository.create(data);
            await studentRepository.save(student);
            return student;
        } catch (error: any) {
            throw new Error(`Error creating student`);
        }
    },

    getAllStudents: async (page: number = 1, limit: number = 10, searchQuery: string = '', sortField: string = 'email', sortOrder: 'ASC' | 'DESC' = 'ASC') => {
        try {
            const studentRepository = AppDataSource.getRepository(Student);

            const whereConditions: any = {};

            if (searchQuery) {
                whereConditions.where = [
                    { first_name: Like(`%${searchQuery}%`) },
                    { last_name: Like(`%${searchQuery}%`) },
                    { email: Like(`%${searchQuery}%`) },
                ];
            }

            const orderConditions: any = {};
            if (sortField) {
                orderConditions[sortField ?? 'email'] = sortOrder ?? 'ASC'; // 'ASC' for ascending, 'DESC' for descending
            }

            const [students, total] = await studentRepository.findAndCount({
                where: whereConditions?.where,
                skip: (page - 1) * limit,
                take: limit,
                order: orderConditions,
            });

            return {
                data: students,
                totalCount: total,
                totalPages: Math.ceil(total / limit),
                currentPage: page,
            };
        } catch (error: any) {
            throw new Error(`Error fetching students`);
        }
    },

    getStudentById: async (id: number) => {
        try {
            const studentRepository = AppDataSource.getRepository(Student);
            const student = await studentRepository.findOne({ where: { id } });
            if (!student) {
                throw new Error("Student not found");
            }
            return student;
        } catch (error: any) {
            throw new Error(`Error fetching student by ID`);
        }
    },

    updateStudent: async (id: number, data: UpdateStudentDto) => {
        try {
            const errors = await validate(data);
            if (errors.length > 0) {
                throw new Error("Validation failed");
            }

            const studentRepository = AppDataSource.getRepository(Student);
            const student = await studentRepository.findOne({ where: { id } });
            if (!student) {
                throw new Error("Student not found");
            }

            await studentRepository.update(id, data);
            return await studentRepository.findOne({ where: { id } });
        } catch (error: any) {
            throw new Error(`Error updating student`);
        }
    },

    deleteStudent: async (id: number) => {
        try {
            const studentRepository = AppDataSource.getRepository(Student);
            const student = await studentRepository.findOne({ where: { id } });
            if (!student) {
                throw new Error("Student not found");
            }

            await studentRepository.delete(id);
            return { message: "Student deleted successfully" };
        } catch (error: any) {
            throw new Error(`Error deleting student`);
        }
    },
};
