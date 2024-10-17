import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
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

function App() {

  return (
    <div>
      <Navbar />
      <div className='mt-5 p-4'>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/add-services" element={<AddService />} />
          <Route path="/admin/list-services" element={<ParlourServices />} />
          <Route path="/book-appointment/:serviceId" element={<BookAppointment/>} />
          <Route path="/admin/appointments" element={<Appointments />} />
        </Routes>
      </div>
       
      </div>
  );
}

export default App;
