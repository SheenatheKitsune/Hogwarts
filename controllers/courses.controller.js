import * as coursesRepository from '../repositories/courses.repository.js';

// Get all courses
export async function getAllCourses(req, res) {
  try {
    const allCourses = await coursesRepository.getAllCourses();
    res.json(allCourses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

// Get a single course by ID
export async function getSingleCourseById(req, res) {
  try {
    const { id } = req.params;
    const course = await coursesRepository.getSingleCourseById(id);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}