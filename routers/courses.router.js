import express from 'express';
import * as coursesController from '../controllers/courses.controller.js';

const coursesRouter = express.Router();

coursesRouter.get('/courses', coursesController.getAllCourses);
coursesRouter.get('/courses/:id', coursesController.getSingleCourseById);
export default coursesRouter;