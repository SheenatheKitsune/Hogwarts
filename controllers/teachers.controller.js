import * as teachersRepository from '../repositories/teachers.repository.js';
import { insertTeacher } from '../repositories/teachers.repository.js';

// Get all teachers
export async function getAllTeachers(req, res) {
  try {
    const allTeachers = await teachersRepository.getAllTeachers();
    res.json(allTeachers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

// Get a single teacher by ID
export async function getTeacherById(req, res) {
  try {
    const { id } = req.params;
    const teacher = await teachersRepository.getSingleTeacherById(id);

    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    res.json(teacher);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

// Create a new teacher
export async function createNewTeacher(req, res) {
    try {
        const { teacher_name, fk_house } = req.body;

        // Validation: ensure both fields are provided
        if (!teacher_name || !fk_house) {
            return res.status(400).json({ error: "teacher_name and fk_house are required!" });
        }

        const newTeacher = await insertTeacher(teacher_name, fk_house);
        res.status(201).json(newTeacher);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}

// Update an existing teacher
export async function updateExistingTeacher(req, res) {
    try {
        const { id } = req.params;
        const { teacher_name, fk_house } = req.body;

        // Validation: ensure at least one field or both are provided (depending on your preference)
        if (!teacher_name || !fk_house) {
            return res.status(400).json({ error: "teacher_name and fk_house are required for update!" });
        }

        const updatedTeacher = await teachersRepository.updateTeacher(id, teacher_name, fk_house);

        if (!updatedTeacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }

        res.json(updatedTeacher);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}

// Delete a teacher
export async function removeTeacher(req, res) {
    try {
        const { id } = req.params;
        const deletedTeacher = await teachersRepository.deleteTeacher(id);

        if (!deletedTeacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }

        res.json({ message: 'Teacher deleted successfully', deletedTeacher });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}