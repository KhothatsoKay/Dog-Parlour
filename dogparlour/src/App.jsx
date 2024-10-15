import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Services from './components/Services';
import Login from './components/Login';
import Home from './components/Home';
import { AuthService } from './services/AuthService';
import AdminDashboard from './components/AdminDashboard';
import AddService from './components/AddServices';

function App() {

  return (
    <div>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/add-services" element={<AddService />} />
        </Routes>
      </div>
  );
}

export default App;
