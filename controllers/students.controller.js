import * as studentsRepository from '../repositories/students.repository.js';
import { insertStudent } from '../repositories/students.repository.js';

// Get all students
export async function getAllStudents(req, res) {
  try {
    const allStudents = await studentsRepository.getAllStudents();
    res.json(allStudents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

// Get a single student by ID
export async function getStudentById(req, res) {
  try {
    const { id } = req.params;
    const student = await studentsRepository.getSingleStudentById(id);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

// Create a new student
export async function createNewStudent(req, res) {
    try {
        const { student_name, fk_house, student_year } = req.body;

        // Validation: ensure both fields are provided
        if (!student_name || !fk_house || !student_year) {
            return res.status(400).json({ error: "student_name, fk_house, and student_year are required!" });
        }

        const newStudent = await insertStudent(student_name, fk_house, student_year);
        res.status(201).json(newStudent );
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}

// Update an existing student
export async function updateExistingStudent(req, res) {
    try {
        const { id } = req.params;
        const { student_name, fk_house, student_year } = req.body;

        // Validation: ensure at least one field or both are provided (depending on your preference)
        if (!student_name || !fk_house || !student_year) {
            return res.status(400).json({ error: "student_name, fk_house, and student_year are required for update!" });
        }

        const updatedStudent = await studentsRepository.updateStudent(id, student_name, fk_house, student_year);

        if (!updatedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json(updatedStudent);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}

// Delete a student
export async function removeStudent(req, res) {
    try {
        const { id } = req.params;
        const deletedStudent = await studentsRepository.deleteStudent(id);

        if (!deletedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json({ message: 'Student deleted successfully', deletedStudent });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}