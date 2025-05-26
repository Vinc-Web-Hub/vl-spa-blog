import express from 'express';
import Person from '../models/Person.js';
import mongoose from 'mongoose'

const router = express.Router();// POST /api/person - Create a new person
router.post('/', async (req, res) => {
  try {
    console.log('Created person...:', req.body);  // Add this!
    const { id, name, firstname, birthdate, sex, registrationDate } = req.body;
    const newPerson = new Person({ id, name, firstname, birthdate, sex, registrationDate });
    const savedPerson = await newPerson.save();
    res.status(201).json(savedPerson);
  } catch (err) {
    console.error('Error creating person:', err);
    res.status(500).json({ error: 'Failed to create person' });
  }
});

export default router;
