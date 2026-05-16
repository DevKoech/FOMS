const mongoose = require('mongoose');

const cropTrainingSchema = new mongoose.Schema({
    N: Number,
    P: Number,
    K: Number,
    temperature: Number,
    humidity: Number,
    ph: Number,
    rainfall: Number,
    label: String
});

module.exports = mongoose.model('CropTraining', cropTrainingSchema);