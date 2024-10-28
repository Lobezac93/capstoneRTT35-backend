import express from 'express';
import Professor from '../models/Professor.js';
import { Router } from 'express';
import { professorData } from '../data/professorData.js';
import mongoose from 'mongoose';

const router = Router();

// Function to insert mockup professor data into MongoDB
const insertProfessorData = async () => {
  try {
    await Professor.insertMany(professorData);
    console.log('Professor data inserted successfully');
  } catch (error) {
    console.error('Error inserting professors:', error);
  }
};

// Only call insertProfessorData if you want to populate the database initially.
// You might want to remove this line after the first run to avoid duplicate entries.
// insertProfessorData();


// GET /api/professors - Get all professors
router.get('/', async (req, res) => {
  try {
    const professors = await Professor.find(); // Fetch all professors
    res.status(200).json(professors); // Respond with the data
  } catch (error) {
    console.error('Error fetching professors:', error);
    res.status(500).json({ error: 'Error fetching professors' }); // Error handling
  }
});



// POST /api/professors - Create a new professor
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid professor ID' });
  }

  try {
    const professor = await Professor.findById(id).populate('ratings');
    if (!professor) {
      return res.status(404).json({ error: 'Professor not found' });
    }
    res.status(200).json(professor);
  } catch (error) {
    console.error('Error fetching professor details:', error);
    res.status(500).json({ error: 'Error fetching professor details' });
  }
});

export default router;