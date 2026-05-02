import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API } from '../api/api.js';


export default function FarmDetails() {
const { id } = useParams();
const [farm, setFarm] = useState(null);
const [ph, setPh] = useState('');
const [budget, setBudget] = useState('');
const [recommendation, setRecommendation] = useState(null);


useEffect(() => { API.get('/farms').then(res => setFarm(res.data.find(f => f._id === id))); }, [id]);


const handleRecommend = async () => {
const res = await API.post(`/farms/${id}/recommend`, { budget_ksh: Number(budget) });
setRecommendation(res.data);
};


if (!farm) return <div>Loading...</div>;


return (
<div className="p-4">
<h1>{farm.name}</h1>
<div>
<h2>Add Soil Sample</h2>
<input placeholder="pH" value={ph} onChange={e => setPh(e.target.value)} />
<button onClick={handleRecommend}>Get Recommendation</button>
</div>
{recommendation && <pre>{JSON.stringify(recommendation, null, 2)}</pre>}
</div>
);
}