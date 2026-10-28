import express from 'express';
import {pool} from './db.js';
import * as housesRepository from './repositories/houses.repository.js';
import { getAllHouses, getHouseById } from './controllers/houses.controller.js';
import housesRouter from './routers/houses.router.js';

const app = express();
const PORT = process.env.PORT || 2712;

// Middleware
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Welcome to the Hogwarts API! ⚡🧙‍♂️');
});

/* Houses all and singles */
app.use(housesRouter);

// Get all courses from the database
app.get('/courses', async (req, res) => {
  try {
    const allCourses = await pool.query(`
        SELECT 
        courses.id, 
        courses.course_name,
        teachers.teacher_name AS teacher
      FROM courses
      JOIN teachers ON courses.fk_teachers = teachers.id
    `);
    res.json(allCourses.rows); // Send the rows back as JSON
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all students with their house names
app.get('/students', async (req, res) => {
  try {
    const allStudents = await pool.query(`
      SELECT 
        students.id, 
        students.student_name, 
        houses.house_name AS house 
      FROM students 
      JOIN houses ON students.fk_house = houses.id
    `);
    res.json(allStudents.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get a single student by ID
app.get('/students/:id', async (req, res) => {
  try {
    const { id } = req.params; // Grabs the ID from the URL
    const student = await pool.query(`
      SELECT 
        students.id, 
        students.student_name, 
        houses.house_name AS house, 
        houses.house_color 
      FROM students 
      JOIN houses ON students.fk_house = houses.id 
      WHERE students.id = $1
    `, [id]);

    // Check if the student actually exists
    if (student.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json(student.rows[0]); // Return the single student object
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all teachers with their house names
app.get('/teachers', async (req, res) => {
  try {
    const allTeachers = await pool.query(`
      SELECT 
        teachers.id, 
        teachers.teacher_name, 
        houses.house_name AS house
      FROM teachers 
      JOIN houses ON teachers.fk_house = houses.id
    `);
    res.json(allTeachers.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});