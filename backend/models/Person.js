import mongoose from 'mongoose'

const personSchema = new mongoose.Schema({
  name: { type: String },
  firstname: { type: String },
  birthDate: { type: Date },
  sex: { type: String, enum: ['Male', 'Female'] },
  registrationDate: { type: Date, default: Date.now }
})

const Person = mongoose.model('Person', personSchema)
export default Person;


