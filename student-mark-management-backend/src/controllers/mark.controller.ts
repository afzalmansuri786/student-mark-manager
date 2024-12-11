import { Request, Response } from "express";
import { markService } from "../services/mark.service";
import { CreateMarkDto } from "../dto/create-mark.dto";

export const markController = {
    createMark: async (req: Request, res: Response) => {
        try {
            const data = req.body as CreateMarkDto;
            const mark = await markService.createMark(data);
            res.status(201).json({ status: "success", data: mark });
        } catch (error: any) {
            res.status(400).json({ status: "error", message: error.message });
        }
    },

    getMarksByStudentId: async (req: Request, res: Response) => {
        try {
            const { studentId } = req.params;
            const marks = await markService.getMarksByStudentId(Number(studentId));
            res.status(200).json({ status: "success", data: marks });
        } catch (error: any) {
            res.status(500).json({ status: "error", message: error.message });
        }
    },

    updateMark: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const data = req.body as CreateMarkDto;
            const updatedMark = await markService.updateMark(Number(id), data);
            res.status(200).json({ status: "success", data: { ...updatedMark } });
        } catch (error: any) {
            res.status(400).json({ status: "error", message: error.message });
        }
    },

    deleteMark: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const response = await markService.deleteMark(Number(id));
            res.status(200).json({ status: "success", message: response.message });
        } catch (error: any) {
            res.status(404).json({ status: "error", message: error.message });
        }
    },
};
