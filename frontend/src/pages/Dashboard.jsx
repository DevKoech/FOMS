import { useEffect, useState } from 'react';
import { API } from '../api/api.js';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import FarmDetails from './FarmDetails.jsx';
import './Dashboard.css';
//import FarmDetails from '../components/FarmDetails.jsx';

export default function Dashboard() {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    API.get('/farms')
      .then(res => {
        setFarms(res.data);
        setLoading(true);
      })
      
  }, []);

  //if (loading) return <div className="dashboard-loading">Loading farms...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="dashboard-inner">
        <h1 className="dashboard-title">Your Farms</h1>
        <h1 className="dashboard-link-title">
          <Link to="/farm" className="dashboard-link">
            <FarmDetails />
          </Link>
        </h1>
      </div>
      {farms.length === 0 ? (
        <p className="dashboard-empty">No farms yet. Create one to get started!</p>
      ) : (
        <div className="farm-grid">
          {farms.map(f => (
            <div key={f._id} className="farm-card">
              <h2 className="farm-card-title">{f.name}</h2>
              <p className="farm-card-location">{f.location || 'Location not set'}</p>
              <Link
                to={`/farm/${f._id}`}
                className="farm-card-button"
              >
                Open Farm
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}