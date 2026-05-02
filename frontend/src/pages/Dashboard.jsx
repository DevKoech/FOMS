import { useEffect, useState } from 'react';
import { API } from '../api/api.js';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import FarmDetails from './FarmDetails.jsx';
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

  //if (loading) return <div className="p-4">Loading farms...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-4xl text-center font-bold mb-6">Your Farms</h1>
        <h1 className="text-4xl font-bold mb-6">
          <Link to="/farm" className="inline-block">
            <FarmDetails />
          </Link>
        </h1>
      </div>
      {farms.length === 0 ? (
        <p className="text-gray-600 text-lg">No farms yet. Create one to get started!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {farms.map(f => (
            <div key={f._id} className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition border">
              <h2 className="text-xl font-semibold mb-2">{f.name}</h2>
              <p className="text-sm text-gray-600 mb-3">{f.location || 'Location not set'}</p>
              <Link
                to={`/farm/${f._id}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
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