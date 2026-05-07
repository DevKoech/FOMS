const mongoose = require('mongoose');

const marketDataSchema = new mongoose.Schema({
    crop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Crop',
        required: true
    },
    region: String,
    price: Number,
    recorded_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('MarketData', marketDataSchema);