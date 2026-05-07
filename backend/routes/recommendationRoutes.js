const express = require('express');
const router = express.Router();
const { getRecommendations} = require('../controllers/recommndationController');

router.get('/:farmId', getRecommendations);

module.exports = router;