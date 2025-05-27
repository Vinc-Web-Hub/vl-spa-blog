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

// ✅ GET /api/person - Fetch all persons
router.get('/', async (req, res) => {
  try {
    const persons = await Person.find();
    res.status(200).json(persons);
  } catch (err) {
    console.error('Error fetching persons:', err);
    res.status(500).json({ error: 'Failed to fetch persons' });
  }
});


export default router;
