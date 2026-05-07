const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: { 
    type: String,
    unique: true,
    required: true 
  },
  password_hash: {
    type: String,
    required: true
  },
  role: { 
    type: String,
    enum: ['farmer', 'admin'],
    default: 'farmer'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);