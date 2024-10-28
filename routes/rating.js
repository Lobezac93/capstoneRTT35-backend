import express from 'express';
import Professor from '../models/Professor.js';
import Rating from '../models/Rating.js';
import mongoose from 'mongoose';

const router = express.Router();

// POST /api/ratings - Add a new rating for a professor
router.post('/', async (req, res) => {
  const { professor, rating, difficulty, wouldTakeAgain, comment } = req.body;

  if (!mongoose.Types.ObjectId.isValid(professor)) {
    return res.status(400).json({ error: 'Invalid professor ID' });
  }

  try {
    // Create a new Rating document
    const newRating = new Rating({
      rating,
      difficulty,
      wouldTakeAgain,
      comment,
    });
    
    // Save the new rating to the database
    const savedRating = await newRating.save();

    // Add the rating to the professor's ratings array
    const updatedProfessor = await Professor.findByIdAndUpdate(
      professor,
      { $push: { ratings: savedRating._id } },
      { new: true }
    );

    res.status(201).json(updatedProfessor);
  } catch (error) {
    console.error('Error adding rating:', error);
    res.status(500).json({ error: 'Error adding rating' });
  }
});

export default router;
