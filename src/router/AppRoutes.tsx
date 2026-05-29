import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../views/LandingPage';
import Dashboard from '../views/Dashboard';
import Customizer from '../views/Customizer';
import Deployer from '../views/Deploy';
import WishRender from '../views/WishRender';
import AdminDashboard from '../views/AdminDashboard';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/customizer" element={<Customizer />} />
      <Route path="/deploy" element={<Deployer />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/wish/:id" element={<WishRender />} />
      {/* Redirect fallback */}
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
};
export default AppRoutes;
