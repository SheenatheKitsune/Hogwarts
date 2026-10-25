const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 2712;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Welcome to the Hogwarts API! ⚡🧙‍♂️');
});

// --- NEW HOGWARTS ROUTE || Making for the different tables!!!---
// Get all houses from the database
app.get('/houses', async (req, res) => {
  try {
    const allHouses = await pool.query('SELECT * FROM houses');
    res.json(allHouses.rows); // Send the rows back as JSON
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

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