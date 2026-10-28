import express from 'express';
import * as teachersController from '../controllers/teachers.controller.js';

const teachersRouter = express.Router();

teachersRouter.get('/teachers', teachersController.getAllTeachers);
teachersRouter.get('/teachers/:id', teachersController.getTeacherById);
export default teachersRouter;