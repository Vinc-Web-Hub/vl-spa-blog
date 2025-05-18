import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Define the schema for a user
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

// Static method to register a new user with hashed password
userSchema.statics.register = async function (username, password) {
  const existingUser = await this.findOne({ username });
  if (existingUser) {
    throw new Error('Username already exists');
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new this({ username, passwordHash });
  return user.save();
};

// Method to validate login credentials
userSchema.statics.validateLogin = async function (username, password) {
  const user = await this.findOne({ username });
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.passwordHash);
  return isValid ? user : null;
};

// Create and export the model
const User = mongoose.model('User', userSchema);
export default User;
