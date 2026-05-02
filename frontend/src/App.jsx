import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import FarmDetails from './pages/FarmDetails';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={ <Dashboard/>}/>
        <Route path="/farm/:id" element={<FarmDetails />}/>
      </Routes>
  );
}
