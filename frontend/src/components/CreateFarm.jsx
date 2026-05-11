import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../api/api.js';
import { AuthContext } from '../context/AuthContext.jsx';

export default function CreateFarm() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/farms', { name, location });
      navigate(`/farm/${res.data._id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create farm');
    }
  };

  return (
    <div className="create-farm">
      <h2>Create Your First Farm</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
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
  );
}