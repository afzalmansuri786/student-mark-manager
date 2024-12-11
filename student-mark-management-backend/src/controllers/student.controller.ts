import { Request, Response } from "express";
import { studentService } from "../services/student.service";
import { CreateStudentDto } from "../dto/create-student.dto";
import { UpdateStudentDto } from "../dto/update-student.dto";

export const studentController = {
    createStudent: async (req: Request, res: Response) => {
        try {
            const data = req.body as CreateStudentDto;
            const student = await studentService.createStudent(data);
            res.status(201).json({ status: "success", data: student });
        } catch (error: any) {
            res.status(400).json({ status: "error", message: error.message });
        }
    },

    getAllStudents: async (req: Request, res: Response) => {
        try {
            const { page = 1, limit = 10, searchQuery = '' } = req.query;
            const result = await studentService.getAllStudents(
                Number(page),
                Number(limit),
                String(searchQuery),
            );
            res.status(200).json({ status: "success", data: result });
        } catch (error: any) {
            res.status(500).json({ status: "error", message: error.message });
        }
    },

    getStudentById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const student = await studentService.getStudentById(Number(id));
            res.status(200).json({ status: "success", data: student });
        } catch (error: any) {
            res.status(404).json({ status: "error", message: error.message });
        }
    },

    updateStudent: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const data = req.body as UpdateStudentDto;
            const updatedStudent = await studentService.updateStudent(Number(id), data);
            res.status(200).json({ status: "success", data: updatedStudent });
        } catch (error: any) {
            res.status(400).json({ status: "error", message: error.message });
        }
    },

    deleteStudent: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const response = await studentService.deleteStudent(Number(id));
            res.status(200).json({ status: "success", message: response.message });
        } catch (error: any) {
            res.status(404).json({ status: "error", message: error.message });
        }
    },
};
