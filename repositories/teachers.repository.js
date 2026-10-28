import { pool } from '../db.js';

export async function getAllTeachers() {
    const result = await pool.query('SELECT * FROM teachers');
    return result.rows;
  }

  export async function getSingleTeacherById(id) {
    const result = await pool.query('SELECT * FROM teachers WHERE id = $1', [id]);
    return result.rows[0];
  }

  export async function insertTeacher(teacherName, fkHouse) {
    const query = `
        INSERT INTO teachers (teacher_name, fk_house) 
        VALUES ($1, $2) 
        RETURNING *;
    `;
    const values = [teacherName, fkHouse];
    const result = await pool.query(query, values);
    return result.rows[0];
}