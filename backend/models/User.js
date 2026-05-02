const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  phone: { type: String, unique: true },
  password_hash: String,
  role: { type: String, default: 'farmer' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);