import express from "express";
import { studentController } from "../controllers/student.controller";
import { markController } from "../controllers/mark.controller";

const router = express.Router();

// Students routes
router.post("/students", studentController.createStudent);
router.get("/students", studentController.getAllStudents);
router.get("/students/:id", studentController.getStudentById);
router.put("/students/:id", studentController.updateStudent);
router.delete("/students/:id", studentController.deleteStudent);

// Marks routes
router.post("/marks", markController.createMark);
router.get("/marks/student/:studentId", markController.getMarksByStudentId);
router.put("/marks/:id", markController.updateMark);
router.delete("/marks/:id", markController.deleteMark);

export default router;
