// src/components/Navbar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // go back to landing
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px', background: '#f5f5f5', borderBottom: '1px solid #ddd' }}>
      <div><Link to="/">Expense Tracker</Link></div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        {user ? (
          <>
            <span>Hi, {user.name}</span>
            <button onClick={() => navigate('/dashboard')}>Dashboard</button>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/">Login / Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
