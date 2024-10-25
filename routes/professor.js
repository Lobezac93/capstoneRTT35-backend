import express from 'express'
import Professor from '../models/Professor.js'
import { Router } from 'express';
import {professorData} from '../data/professorData.js'
import mongoose from 'mongoose';

const router = Router()

// inserting my mockup professor data into mongodb
const insertProfessorData = async() => {
  try {
    await Professor.insertMany(professorData)
    console.log('Professor data inserted successfully')
  } catch (error) {
    console.error('Error inserting professors:', error)
  }
}
insertProfessorData()


//** POST /api/professors @description:creating a new professor */
router.post('/', async (req, res) => {
  const { name, department, school } = req.body;
  try {
    const professor = new Professor({ name, department, school });
    await professor.save();
    res.status(201).json(professor);
  } catch (error) {
    console.error('Detailed error creating professor:', error); // Log the exact error
    res.status(400).json({ error: 'Error creating professor', details: error.message }); // Add error details
  }
});

  //** GET/api/professors @description:get all the professors */
router.get('/', async (req, res) => {
  try {
    const professors = await Professor.find(); // Fetch all professors
    res.status(200).json(professors); // Respond with the data
  } catch (error) {
    res.status(500).json({ error: 'Error fetching professors' }); // Error handling
  }
});


  export default router;