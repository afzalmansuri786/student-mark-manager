import { AppDataSource } from "../database/database.connection";
import { Mark } from "../entities/mark.entity";
import { CreateMarkDto } from "../dto/create-mark.dto";
import { validate } from "class-validator";

export const markService = {
    createMark: async (data: CreateMarkDto) => {
        try {
            const errors = await validate(data);
            if (errors.length > 0) {
                throw new Error("Validation failed");
            }

            const markRepository = AppDataSource.getRepository(Mark);
            const mark = markRepository.create({ ...data, student: data?.studentId });
            await markRepository.save(mark);
            return { message: "Mark created successfully!" };
        } catch (error: any) {
            throw new Error(`Error creating mark: ${error.message}`);
        }
    },

    getMarksByStudentId: async (studentId: number) => {
        try {
            const markRepository = AppDataSource.getRepository(Mark);
            const marks = await markRepository.find({
                where: { student: { id: studentId } },
            });
            return marks;
        } catch (error: any) {
            throw new Error(`Error fetching marks for student with ID ${studentId}: ${error.message}`);
        }
    },

    updateMark: async (id: number, data: { mark: number }) => {
        try {
            const errors = await validate(data);
            if (errors.length > 0) {
                throw new Error("Validation failed");
            }

            const markRepository = AppDataSource.getRepository(Mark);
            let mark = await markRepository.findOne({ where: { id } });
            if (!mark) {
                throw new Error("Mark not found");
            }

            mark.mark = data.mark;

            mark = await markRepository.save(mark);

            return { message: "Mark updated successfully" };
        } catch (error: any) {
            throw new Error(`Error updating mark: ${error.message}`);
        }
    },

    deleteMark: async (id: number) => {
        try {
            const markRepository = AppDataSource.getRepository(Mark);
            const mark = await markRepository.findOne({ where: { id } });
            if (!mark) {
                throw new Error("Mark not found");
            }

            await markRepository.delete(id);
            return { message: "Mark deleted successfully" };
        } catch (error: any) {
            throw new Error(`Error deleting mark: ${error.message}`);
        }
    },
};
