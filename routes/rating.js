import express from 'express'
import { Router } from 'express'
import Rating from '../models/Rating.js'
import Professor from '../models/Professor.js'

const router = Router()

router.post('/:professorId', async (req, res) => {
  const { professorId } = req.params;
  const { userId, comment, rating } = req.body;
  try {
    const newRating = new Rating({ user: userId, professor: professorId, comment, rating });
    await newRating.save();
    const professor = await Professor.findById(professorId);
    professor.ratings.push(newRating._id);
    await professor.save();
    res.status(201).json(newRating);
  } catch (error) {
    res.status(500).json({ error: 'Error adding rating' });
  }
});


export default router;