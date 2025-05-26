import express from 'express';
import VitalSigns from '../models/VitalSigns.js';
import mongoose from 'mongoose'

const router = express.Router();// POST /api/vital-signs - Create a new Vital Sign
router.post('/', async (req, res) => {
  try {
    console.log('Created VS:', req.body);  // Add this!
    const { id, name, date, time,Temp, SPB, DPB,HR, RespRate, SpO2 } = req.body;
    const newVitalSigns = new VitalSigns({ id, name, date, time,Temp, SPB, DPB,HR, RespRate, SpO2 });
    const savedVitalSigns = await newVitalSigns.save();
    res.status(201).json(savedVitalSigns);
  } catch (err) {
    console.error('Error creating Vital Sign record:', err);
    res.status(500).json({ error: 'Failed to create Vital Sign record' });
  }
});

export default router;
