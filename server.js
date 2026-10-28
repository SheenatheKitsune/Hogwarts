import express from 'express';
import {pool} from './db.js';
import housesRouter from './routers/houses.router.js';
import teachersRouter from './routers/teachers.router.js';
import { createNewTeacher } from './controllers/teachers.controller.js';

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

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});