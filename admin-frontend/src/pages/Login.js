import React, { useState } from 'react';
import axios from 'axios';
import '../styles/login.css';


const apiBase = process.env.REACT_APP_API_BASE;

const Login = ({ setAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${apiBase}/admin/login`, { email, password });
      sessionStorage.setItem('adminToken', res.data.token);
      setAuthenticated(true);
    } catch (err) {
      alert('Invalid Credentials');
      console.error(err);
    }
  };

  return (
    <div className='login-holder'>
      <div className="login-container">
        <h2><i className="bi bi-door-open"></i> Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-send" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
