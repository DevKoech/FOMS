const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  crop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crop'
  },
  score: Number,
  expected_yield_kg_per_ha: Number,
  estimated_roi: Number,
  risk_Level: {
    type: String,
    enum: ['low', 'medium', 'high']
  },
  model_version: String,
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Recommendation', recommendationSchema);