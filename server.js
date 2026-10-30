import express from 'express';
/* Houses */
import housesRouter from './routers/houses.router.js';
/* Teachers */
import teachersRouter from './routers/teachers.router.js';
import { createNewTeacher } from './controllers/teachers.controller.js';
/* Students */
import studentsRouter from './routers/students.router.js';
import { createNewStudent } from './controllers/students.controller.js';
/* Courses */
import coursesRouter from './routers/courses.router.js';

const app = express();
const PORT = process.env.PORT || 2712;

// Middleware
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Welcome to the Hogwarts API! ⚡🧙‍♂️');
});

/* Router for houses */
app.use(housesRouter);

/* Router for teachers */
app.use(teachersRouter);
app.post('/teachers', createNewTeacher);

/* Router for students */
app.use(studentsRouter);
app.post('/students', createNewStudent);

/* Router for courses */
app.use(coursesRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});