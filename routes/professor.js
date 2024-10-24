import express from 'express'
import Professor from '../models/Professor.js'
import { Router } from 'express';

const router = Router()
router.get('/', async (req, res) => {
    try {
      const professors = await Professor.find().populate('ratings');
      res.json(professors);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching professors' });
    }
  });
  
  router.post('/', async (req, res) => {
    const { name, department, school } = req.body;
    try {
      const professor = new Professor({ name, department, school });
      await professor.save();
      res.status(201).json(professor);
    } catch (error) {
      res.status(400).json({ error: 'Error creating professor' });
    }
  });

  export default router;