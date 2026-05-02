import { useContext, useState } from 'react';
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
<div className="p-4 max-w-md mx-auto">
<h1>Login</h1>
<form onSubmit={handleSubmit}>
<input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
<input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
<button type="submit">Login</button>
</form>
</div>
);
}
