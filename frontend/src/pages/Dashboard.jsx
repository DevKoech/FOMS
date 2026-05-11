import { useEffect, useState, useContext } from 'react';
import { API } from '../api/api.js';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import Navbar from '../components/Navbar.jsx';
import CreateFarm from '../components/CreateFarm.jsx';
import './Dashboard.css';

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log('[Dashboard] Token from context:', token ? 'TOKEN EXISTS' : 'NO TOKEN', token);
  
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Redirect to login if no token
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchFarms = async () => {
      try {
        setLoading(true);
        const res = await API.get('/farms');
        setFarms(res.data);
        setError('');
      } catch (err) {
        console.error('Error fetching farms:', err);
        if (err.response?.status === 401) {
          setError('Authentication expired. Please log in again.');
          navigate('/login');
        } else {
          setError(err.response?.data?.error || 'Failed to load farms');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFarms();
  }, [token, navigate]);

  if (loading) return <div className="dashboard-loading">Loading farms...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="dashboard-inner">
        <h1 className="dashboard-title">Your Farms</h1>
        {farms.length > 0 && (
          <Link to="/farm" className="dashboard-create-button">
            + Create New Farm
          </Link>
        )}
      </div>
      {farms.length === 0 ? (
        <CreateFarm />
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

export default Dashboard;