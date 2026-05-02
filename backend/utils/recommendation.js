function generateRecommendation({ soil, irrigation, size_ha, historical_yields, budget_ksh }) {
  // simple heuristic-based recommender (replace with your real model)
  const ph = (soil && typeof soil.ph === 'number') ? soil.ph : 6.5;

  const candidates = [
    { crop_id: 'maize', crop_name: 'Maize', base_score: 80, base_yield: 2500 },
    { crop_id: 'beans', crop_name: 'Beans', base_score: 70, base_yield: 1200 },
    { crop_id: 'potato', crop_name: 'Potato', base_score: 65, base_yield: 3000 },
  ];

  const budgetBoost = budget_ksh ? Math.min(10, Math.floor(budget_ksh / 10000)) : 0;
  const phAdjustment = ph < 5.5 ? -15 : ph < 6.5 ? -5 : ph <= 7.5 ? 0 : -5;

  const results = candidates.map(c => {
    const score = Math.max(0, c.base_score + phAdjustment + budgetBoost);
    const expected_yield_kg_per_ha = Math.round(c.base_yield * (score / 100));
    const estimated_roi = Math.round((expected_yield_kg_per_ha * 50) / (size_ha || 1));
    return {
      crop_id: c.crop_id,
      crop_name: c.crop_name,
      score,
      expected_yield_kg_per_ha,
      estimated_roi,
    };
  }).sort((a, b) => b.score - a.score);

  return results;
}

module.exports = { generateRecommendation };