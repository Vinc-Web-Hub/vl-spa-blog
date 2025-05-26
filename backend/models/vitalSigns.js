import mongoose from 'mongoose'

const VitalSignsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String // or remove if not needed, or combine with date
  },
  Temp: {
    type: Number
  },
  SPB: {
    type: Number
  },
  DPB: {
    type: Number
  },
  HR: {
    type: Number
  },
  RespRate: {
    type: Number
  },
  SpO2: {
    type: Number
  }
})

const VitalSigns = mongoose.model('VitalSigns', VitalSignsSchema)
export default VitalSigns
