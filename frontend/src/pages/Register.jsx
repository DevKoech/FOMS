import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { API } from '../api/api.js';
import { useNavigate } from 'react-router-dom';


export default function Register() {
const [phone, setPhone] = useState('');
const [name, setName] = useState('');
const [password, setPassword] = useState('');
const { login } = useContext(AuthContext);
const navigate = useNavigate();


const handleSubmit = async (e) => {
e.preventDefault();
const res = await API.post('/auth/register', { name, phone, password });
login(res.data.token, res.data.user);
navigate('/');
};


return (
<div className="p-4 max-w-md mx-auto">
<h1>Create Account</h1>
<form onSubmit={handleSubmit}>
<input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
<input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
<input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
<button type="submit">Register</button>
</form>
</div>
);
}