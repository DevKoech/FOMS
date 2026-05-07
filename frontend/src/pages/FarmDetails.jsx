import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API } from '../api/api.js';
import './FarmDetails.css';

export default function FarmDetails() {
  const { id } = useParams();
  const [farm, setFarm] = useState(null);
  const [ph, setPh] = useState('');
  const [budget, setBudget] = useState('');
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    API.get('/farms').then(res => setFarm(res.data.find(f => f._id === id)));
  }, [id]);

  const handleRecommend = async () => {
    const res = await API.post(`/farms/${id}/recommend`, { budget_ksh: Number(budget) });
    setRecommendation(res.data);
  };

  if (!farm) return <div className="farm-details-loading">Loading...</div>;

  return (
    <div className="farm-details-page">
      <h1 className="farm-details-title">{farm.name}</h1>
      <div className="farm-details-section">
        <h2 className="farm-details-heading">Add Soil Sample</h2>
        <input
          className="farm-input"
          placeholder="pH"
          value={ph}
          onChange={e => setPh(e.target.value)}
        />
        <button className="farm-button" onClick={handleRecommend}>Get Recommendation</button>
      </div>
      {recommendation && (
        <pre className="farm-recommendation">{JSON.stringify(recommendation, null, 2)}</pre>
      )}
    </div>
  );
}
