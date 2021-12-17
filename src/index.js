import React from 'react';
import ReactDOM from 'react-dom';
import { Navigate, Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import UserContextProvider from './context/UserContextProvider';
import SignUp from './components/Signup';
import Dashboard from './components/Dashboard';
import './style/main.css'
import Booking from './components/Booking';
import Admin from './components/Admin';

ReactDOM.render(
  <BrowserRouter>
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/book" element={<Booking />} />
        <Route path="/docter" element={<Admin />} />
      </Routes>
    </UserContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

