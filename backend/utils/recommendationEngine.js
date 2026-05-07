const crop = require( '../models/Crop')

//Normalize the data
const normalize = (value, min, max) => {
    if (max ===min) return 0; //prevent 0-division
    return(value - min) / (max - min);
};

//Convert risk level to numeric score
const riskToScore = (risk) => {
    switch (risk) {
        case 'Low': return 1;   
        case 'medium': return 0.6;   
        case 'High': return 0.2;   
        default: return 0.5;   
    }
};

//Generate recommendations based on farm data and crop database
const generateRecommendations = async (farm) => {
    const crops = await Crop.find();

    if (!crops.length) throw new Error('No crops in db')

    //Extract Soil records
    const latestSoil = farm.soil_records[farm.soil_records.length - 1];

    let results = [];

    //Compute raw metricx
    for (let crop of crops) {
        //Soil-compatibility
        const soilScore = crop.suitable_soil_types.includes(farm.soil_type) ? 1 : 0.3;
        
        //Seasonality
        const seasonScore = crop.seasonality.includes(farm.season) ? 1 : 0.4;
        
        //Profitability
        const revenue = crop.expected_yield_kg_per_ha * crop.market_price_per_kg * farm.size_ha;
        const cost = crop.cost_per_ha * farm.size_ha;

        const profit = revenue - cost;

        //Risk
        const riskScore = riskToScore(crop.risk_level);
        results.push({ 
            crop,
            soilScore, 
            seasonScore,
            profit,
            riskScore
         });
    }
    //Normalize profit
    const profits = results.map(r => r.profit);
    const minProfit = Math.min(...profits);
    const maxProfit = Math.max(...profits);

    //Normalize all scores
    results = results.map(r => ({
        ...r,
        profitScore: normalize(r.profit, minProfit, maxProfit)
    }));
    //Compute final score (weighted sum)
    results = results.map(r => {
        const finalScore =
            (r.profitScore*0.4) +
            (r.soilScore*0.25) +
            (r.seasonScore*0.2) +
            (r.riskScore*0.15);

    
    return {
        crop: r.crop._id,
        crop_name: r.crop.name,
        score: finalScore,
        expected_yield_kg_per_ha: r.crop.expected_yield_kg_per_ha,
        estimated_roi: r.profit,
        risk_level: r.crop.risk_level 

    };
});

results.sort((a, b) => b.score - a.score);
return results.slice(0, 5);
};
module.exports = { generateRecommendations }