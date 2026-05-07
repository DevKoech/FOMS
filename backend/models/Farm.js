const mongoose = require('mongoose');

const soilSchema = new mongoose.Schema({
  ph: Number,
  nitrogen: Number,
  phosphorus: Number,
  potassium: Number,
  sample_date: {
    type: Date,
    default: Date.now
  },
});
const cropHistorySchema = new mongoose.Schema({
  crop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crop'
  },
  season: String,
  yield_kg_per_ha: Number,
  profit: Number
});

/*const cropSchema = new mongoose.Schema({
  crop_id: String,
  crop_name: String,
  costPerAcre: Number,
  score: Number,
  expected_yield_kg_per_ha: Number,
  marketPrice:Number,
  estimated_roi: Number,
  created_at: {
    type: Date,
    default: Date.now
  },
});
*/
const farmSchema = new mongoose.Schema({
  owner_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  name: String,
  location: String,
  size_ha: Number,
  irrigation_type: {
    type: String,
    enum: ['drip', 'sprinkler', 'rain-fed', 'none']
  },
  soil_records: [soilSchema],
  crop_history: [cropHistorySchema],
  recommendations: [recommendationSchema],
}, { timestamps: true });

module.exports = mongoose.model('Farm', farmSchema);