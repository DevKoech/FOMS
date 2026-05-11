import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import FarmDetails from './pages/FarmDetails';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route 
        path="/dashboard" 
        element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
      />
      <Route 
        path="/farm/:id" 
        element={<ProtectedRoute><FarmDetails /></ProtectedRoute>}
      />
      <Route 
        path="/farm" 
        element={<ProtectedRoute><FarmDetails /></ProtectedRoute>}
      />
    </Routes>
  );
}
export default App;