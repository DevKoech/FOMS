import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { API } from '../api/api.js';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Handle OAuth callback with token in URL
  useEffect(() => {
    console.log('[Login] Full URL:', window.location.href);
    console.log('[Login] Full search string:', window.location.search);
    const token = new URLSearchParams(window.location.search).get('token');
    console.log('[Login] OAuth callback token:', token ? 'TOKEN EXISTS' : 'NO TOKEN', token ? token.slice(0, 20) + '...' : '');

    if (token) {
      console.log('[Login] Calling login with OAuth token');
      login(token, { provider: 'google'});
      navigate('/dashboard');
    }
    const authError = searchParams.get('error');
    if (authError) {
      setError('Authentication failed. Please try again.');
    }
  }, [searchParams, login, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { phone, password });
      console.log('[Login.handleSubmit] Response received:', res.data.token ? 'TOKEN EXISTS' : 'NO TOKEN');
      if (res.data.token) {
        console.log('[Login.handleSubmit] Calling login with token');
        login(res.data.token, res.data.user);
        navigate('/dashboard');
      } else {
        setError('Login failed: No token received');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  const handleGoogleLogin = () => {
    // Redirect to backend Google OAuth endpoint
    window.location.href = `${API.defaults.baseURL}/auth/google`;
  };

  return (
    <div className="auth-page">
      <h1 className="auth-title">Login</h1>
      {error && <div className="auth-error">{error}</div>}
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
      
      <div className="auth-divider">OR</div>
      
      <button 
        className="auth-button google-button" 
        type="button"
        onClick={handleGoogleLogin}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" style={{ marginRight: '8px' }}>
          <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 c0-3.331,2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.461,2.268,15.365,1.501,12.545,1.501 C6.561,1.501,1.822,6.24,1.822,12.224c0,5.983,4.739,10.722,10.723,10.722c6.243,0,10.327-4.545,10.327-10.722 c0-0.737-0.051-1.638-0.256-2.441H12.545z"/>
        </svg>
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;