import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { API } from '../api/api.js';
import Navbar from '../components/Navbar.jsx';
import './FarmDetails.css';

export default function FarmDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [farm, setFarm] = useState(null);
  const [ph, setPh] = useState('');
  const [budget, setBudget] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCreating, setIsCreating] = useState(!id);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchFarm = async () => {
      try {
        setLoading(true);
        if (id) {
          // Fetch specific farm
          const res = await API.get(`/farms/${id}`);
          setFarm(res.data);
        } else {
          // Creating new farm
          setFarm({ name: '', location: '' });
        }
        setError('');
      } catch (err) {
        console.error('Error fetching farm:', err);
        if (err.response?.status === 401) {
          setError('Authentication expired. Please log in again.');
        } else {
          setError(err.response?.data?.error || 'Failed to load farm');
        }
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchFarm();
    }
  }, [id, token]);

  const handleRecommend = async () => {
    try {
      const res = await API.post(`/farms/${id}/recommend`, { budget_ksh: Number(budget) });
      setRecommendation(res.data);
    } catch (err) {
      console.error('Error getting recommendation:', err);
      setError(err.response?.data?.error || 'Failed to get recommendation');
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/farms', { name, location });
      navigate(`/farm/${res.data._id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create farm');
    }
  };

  if (loading) return <div className="farm-details-loading">Loading...</div>;
  if (error) return <div className="farm-details-error">{error}</div>;
  if (!farm && !isCreating) return <div className="farm-details-error">Farm not found</div>;

  return (
    <div className="farm-details-page">
      <Navbar />
      <h1 className="farm-details-title">{farm?.name || 'New Farm'}</h1>
      
      {isCreating ? (
        <div className="farm-details-section">
          <h2 className="farm-details-heading">Create New Farm</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleCreate}>
            <input
              className="farm-input"
              type="text"
              placeholder="Farm Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <input
              className="farm-input"
              type="text"
              placeholder="Location"
              value={location}
              onChange={e => setLocation(e.target.value)}
              required
            />
            <button className="farm-button" type="submit">Create Farm</button>
          </form>
        </div>
      ) : (
        <>
          <div className="farm-details-section">
            <h2 className="farm-details-heading">Add Soil Sample</h2>
            <input
              className="farm-input"
              placeholder="pH"
              value={ph}
              onChange={e => setPh(e.target.value)}
            />
            <input
              className="farm-input"
              placeholder="Budget (KSH)"
              value={budget}
              onChange={e => setBudget(e.target.value)}
            />
            <button className="farm-button" onClick={handleRecommend}>Get Recommendation</button>
          </div>
          {recommendation && (
            <pre className="farm-recommendation">{JSON.stringify(recommendation, null, 2)}</pre>
          )}
        </>
      )}
    </div>
  );
}
