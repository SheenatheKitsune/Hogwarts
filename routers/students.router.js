import express from 'express';
import * as studentsController from '../controllers/students.controller.js';

const studentsRouter = express.Router();

studentsRouter.get('/students', studentsController.getAllStudents);
studentsRouter.get('/students/:id', studentsController.getStudentById);
studentsRouter.post('/students', studentsController.createNewStudent);
studentsRouter.put('/students/:id', studentsController.updateExistingStudent);
studentsRouter.delete('/students/:id', studentsController.removeStudent);
export default studentsRouter;