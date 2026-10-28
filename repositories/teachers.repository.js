import { pool } from '../db.js';

// Get all teachers
export async function getAllTeachers() {
    const result = await pool.query('SELECT * FROM teachers');
    return result.rows;
}

// Get a single teacher by ID
  export async function getSingleTeacherById(id) {
    const result = await pool.query('SELECT * FROM teachers WHERE id = $1', [id]);
    return result.rows[0];
  }

// Create a new teacher
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

// Update teacher by ID
    export async function updateTeacher(id, teacherName, fkHouse) {
    const query = `
        UPDATE teachers
        SET teacher_name = $1, fk_house = $2
        WHERE id = $3
        RETURNING *;
    `;
    const values = [teacherName, fkHouse, id];
    const result = await pool.query(query, values);
    return result.rows[0];
}

// Delete a teacher by ID
export async function deleteTeacher(id) {
    const query = `
        DELETE FROM teachers
        WHERE id = $1
        RETURNING *;
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
}
