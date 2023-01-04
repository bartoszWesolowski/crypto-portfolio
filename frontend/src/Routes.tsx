import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BusinessHome from './containers/business/BusinessHome';
import RegisterBusinessForm from './containers/business/forms/register/RegisterBusinessForm';
import Home from './containers/Home';
import { Login } from './containers/Login';
import Profile from './containers/Profile';
import { Signup } from './containers/Singup';

export const LINKS = {
  REGISTER_BUSINESS: '/business/register',
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/business" element={<BusinessHome />} />
      <Route
        path={LINKS.REGISTER_BUSINESS}
        element={<RegisterBusinessForm />}
      />
    </Routes>
  );
}
