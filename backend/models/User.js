const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    sparse: true,
    unique: true
  },
  phone: { 
    type: String,
    sparse: true,
    unique: true
  },
  password_hash: {
    type: String
  },
  googleId: {
    type: String,
    sparse: true,
    unique: true
  },
  profilePicture: {
    type: String
  },
  authProvider: {
    type: String,
    enum: ['phone', 'google'],
    default: 'phone'
  },
  role: { 
    type: String,
    enum: ['farmer', 'admin'],
    default: 'farmer'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);