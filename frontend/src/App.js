import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import LoginSignup from './pages/LoginSignup';
import Home from './pages/Home';
import Appointments from './pages/Appointments';
import DoctorDetail from './pages/DoctorDetail';
import NotFound from './pages/NotFound';


const App = () => { 
    
  return (
    
  <Routes>
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }
    />
    <Route path="/login" element={<LoginSignup />} />
    <Route
      path="/appointments"
      element={
        <ProtectedRoute>
          <Appointments />
        </ProtectedRoute>
      }
    />
    <Route
      path="/doctor/:id"
      element={
        <ProtectedRoute>
          <DoctorDetail />
        </ProtectedRoute>
      }
    />
    <Route path="*" element={<NotFound />} />
  </Routes>
 
)};

export default App;
