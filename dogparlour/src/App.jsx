import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Services from './components/Services';
import Login from './components/Login';
import Home from './components/Home';
import { AuthService } from './services/AuthService';
import AdminDashboard from './components/AdminDashboard';
import AddService from './components/AddServices';
import ParlourServices from './components/ParlourServices';
import BookAppointment from './components/BookService';
import Appointments from './components/Appointments';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import ContactUs from './components/Contact';
import About from './components/About';
import UserAppointments from './components/UserAppointments';

function App() {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      setLoading(true);
      try {
        const currentUser = await AuthService.getCurrentUser();
        setUser(currentUser); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []); 

  return (
    <div>
      <Navbar user={user} />
      <div className='mt-5 p-4'>
        {loading && <p>Loading...</p>}
        {/* {error && <p className="alert alert-danger">{error}</p>} */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login setUser={setUser} />} /> 
          <Route path="/register" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/add-services" element={<AddService />} />
          <Route path="/admin/list-services" element={<ParlourServices />} />
          <Route path="/book-appointment/:serviceId" element={<BookAppointment />} />
          <Route path="/admin/appointments" element={<Appointments />} />
          <Route path="/appointments" element={<UserAppointments />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />

        </Routes>
      </div>
    </div>
  );
}

export default App;
