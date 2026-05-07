import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { API } from '../api/api.js';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post('/auth/login', { phone, password });
    login(res.data.token, res.data.user);
    navigate('/');
  };

  return (
    <div className="auth-page">
      <h1 className="auth-title">Login</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          className="auth-input"
          placeholder="Phone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <input
          className="auth-input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="auth-button" type="submit">Login</button>
      </form>
    </div>
  );
}

