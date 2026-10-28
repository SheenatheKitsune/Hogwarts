import { pool } from '../db.js';

export async function getAllTeachers() {
    const result = await pool.query('SELECT * FROM teachers');
    return result.rows;
  }

  export async function getSingleTeacherById(id) {
    const result = await pool.query('SELECT * FROM teachers WHERE id = $1', [id]);
    return result.rows[0];
  }