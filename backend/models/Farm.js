const mongoose = require('mongoose');

const soilSchema = new mongoose.Schema({
  ph: Number,
  nitrogen: Number,
  phosphorus: Number,
  potassium: Number,
  sample_date: Date,
});

const recommendationSchema = new mongoose.Schema({
  crop_id: String,
  crop_name: String,
  score: Number,
  expected_yield_kg_per_ha: Number,
  estimated_roi: Number,
  model_version: String,
  created_at: Date,
});

const farmSchema = new mongoose.Schema({
  owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  location: String,
  size_ha: Number,
  irrigation_type: String,
  soil_records: [soilSchema],
  crop_history: [Object],
  recommendations: [recommendationSchema],
}, { timestamps: true });

module.exports = mongoose.model('Farm', farmSchema);