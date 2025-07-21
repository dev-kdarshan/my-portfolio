import React, { useState, useEffect } from 'react';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';



const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) setAuthenticated(true);
  }, []);

  return authenticated ? (
    <AdminDashboard />
  ) : (
    <Login setAuthenticated={setAuthenticated} />
  );
};

export default App;
