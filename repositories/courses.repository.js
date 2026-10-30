import { pool } from '../db.js';

// GET all courses
export async function getAllCourses() {
    const result = await pool.query('SELECT * FROM courses');
    return result.rows;
  }

  export async function getSingleCourseById(id) {
    const result = await pool.query('SELECT * FROM courses WHERE id = $1', [id]);
    return result.rows[0];
  }
