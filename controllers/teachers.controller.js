import * as teachersRepository from '../repositories/teachers.repository.js';

// Get all teachers controller
export async function getAllTeachers(req, res) {
  try {
    const allTeachers = await teachersRepository.getAllTeachers();
    res.json(allTeachers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

// Get a single teacher by ID controller
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