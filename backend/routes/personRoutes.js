import express from 'express';
import Person from '../models/Person.js';
import mongoose from 'mongoose'

const router = express.Router();// POST /api/person - Create a new person
router.post('/', async (req, res) => {
  try {
    console.log('personRoutes.js - Created person...:', req.body);  // Add this!
    const { id, name, firstname, birthDate, sex, registrationDate } = req.body;
    const newPerson = new Person({ id, name, firstname, birthDate, sex, registrationDate });
    const savedPerson = await newPerson.save();
    res.status(201).json(savedPerson);
  } catch (err) {
    console.error('Error creating person:', err);
    res.status(500).json({ error: 'Failed to create person' });
  }
});

// ✅ GET /api/person - Fetch all person
router.get('/', async (req, res) => {
  try {
    const person = await Person.find();
    res.status(200).json(person);
  } catch (err) {
    console.error('Error fetching person:', err);
    res.status(500).json({ error: 'Failed to fetch person' });
  }
});

// GET /api/person/:id
router.get('/:id', async (req, res) => {
  try {
    const person = await Person.findById(req.params.id)
    if (!person) {
      return res.status(404).json({ error: 'Person not found' })
    }
    res.json(person)
  } catch (err) {
    console.error('Error fetching person by ID:', err)
    res.status(500).json({ error: 'Failed to fetch person' })
  }
})

export default router;
