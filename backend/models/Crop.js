const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    suitable_soil: [{
        type: String,
        enum: ['clay', 'loam', 'sand', 'silt', 'peat'],
    }],
    suitable_season: [{
        type: String,
        enum: ['long-rains', 'short-rains', 'dry-season'],
    }],
    cost_per_ha: Number,
    expected_yield_per_ha: Number,
    market_price_per_kg: Number,
    water_requirements:{
        type: Number, 
        enum:['low', 'medium', 'high']
    },

    risk_level: {
        type: String,
        enum: ['low', 'medium', 'high']
    }
}, { timestamps: true });

module.exports = mongoose.model('Crop', cropSchema);