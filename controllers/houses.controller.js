import * as housesRepository from '../repositories/houses.repository.js';

// Get all houses controller
export async function getAllHouses(req, res) {
  try {
    const allHouses = await housesRepository.getAllHouses();
    res.json(allHouses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

// Get a single house by ID controller
export async function getHouseById(req, res) {
  try {
    const { id } = req.params;
    const house = await housesRepository.getSingleHouseById(id);

    if (!house) {
      return res.status(404).json({ error: 'House not found' });
    }

    res.json(house);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}