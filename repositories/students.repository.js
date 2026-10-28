import { pool } from '../db.js';

// Get all students
export async function getAllStudents() {
    const result = await pool.query('SELECT * FROM students');
    return result.rows;
}

// Get a single student by ID
  export async function getSingleStudentById(id) {
    const result = await pool.query('SELECT * FROM students WHERE id = $1', [id]);
    return result.rows[0];
  }

// Create a new student
  export async function insertStudent(studentName, fkHouse, studentYear) {
    const query = `
        INSERT INTO students (student_name, fk_house, student_year) 
        VALUES ($1, $2, $3) 
        RETURNING *;
    `;
    const values = [studentName, fkHouse, studentYear];
    const result = await pool.query(query, values);
    return result.rows[0];
}

// Update student by ID
    export async function updateStudent(id, studentName, fkHouse, studentYear) {
    const query = `
        UPDATE students
        SET student_name = $1, fk_house = $2, student_year = $3
        WHERE id = $4
        RETURNING *;
    `;
    const values = [studentName, fkHouse, studentYear, id];
    const result = await pool.query(query, values);
    return result.rows[0];
}

// Delete a student by ID
export async function deleteStudent(id) {
    const query = `
        DELETE FROM students
        WHERE id = $1
        RETURNING *;
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
}
