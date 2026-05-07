const Farm  = require('../models/Farm');
const {generateRecommendations} = require('../utils/recommendationEngine');

const getRecommendations = async (req, res) => {
    try{
        const { farmId} = req.params;
        // Fetch farm data
        const farm = await Farm.findById(farmId);

        if (!farm) {
            return res.status(404).json({ message: 'Farm not found' });
        }
        // Generate recommendations based on farm data
        const recommendations = await generateRecommendations(farm);

        farm.recommendations = recommendations;
        await farm.save();

        res.json({
            success: true,
            recommendations
        });
    } catch (error) {
        console.error('Error generating recommendations:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getRecommendations };