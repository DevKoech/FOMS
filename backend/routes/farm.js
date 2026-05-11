const express = require('express');
const Farm = require('../models/Farm');
const { generateRecommendation } = require('../utils/recommendation');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const farm = await Farm.create({ owner_id: req.user.id, ...req.body });
    res.json(farm);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create farm' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const farms = await Farm.find({ owner_id: req.user.id });
    res.json(farms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch farms' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.id);
    if (!farm) return res.status(404).json({ error: 'Farm not found' });

    // Verify ownership
    if (farm.owner_id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json(farm);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch farm' });
  }
});

router.post('/:id/soil', auth, async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.id);
    if (!farm) return res.status(404).json({ error: 'Farm not found' });

    farm.soil_records.push({ ...req.body, sample_date: new Date() });
    await farm.save();

    res.json(farm);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add soil record' });
  }
});

router.post('/:id/recommend', auth, async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.id);
    if (!farm) return res.status(404).json({ error: 'Farm not found' });

    const soil = farm.soil_records[farm.soil_records.length - 1] ?? { ph: 6.5 };

    const result = generateRecommendation({
      soil,
      irrigation: farm.irrigation_type,
      size_ha: farm.size_ha,
      historical_yields: farm.crop_history,
      budget_ksh: req.body.budget_ksh,
    });

    farm.recommendations.push({ ...result[0], model_version: 'v1', created_at: new Date() });
    await farm.save();

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate recommendation' });
  }
});

module.exports = router;