import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const AuthDebug = () => {
  const { user, isAuthenticated, loading, error } = useAuth();

  // Clear localStorage function for debugging
  const clearAuth = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('corvex_user');
    localStorage.removeItem('corvex_token');
    window.location.reload();
  };

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'white',
      border: '2px solid #000',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      maxWidth: '300px',
      zIndex: 9999
    }}>
      <h4>Auth Debug Info:</h4>
      <p><strong>Loading:</strong> {loading ? 'true' : 'false'}</p>
      <p><strong>Authenticated:</strong> {isAuthenticated ? 'true' : 'false'}</p>
      <p><strong>User:</strong> {user ? JSON.stringify(user, null, 2) : 'null'}</p>
      <p><strong>Error:</strong> {error || 'none'}</p>
      <p><strong>Token in localStorage:</strong> {localStorage.getItem('token') ? 'exists' : 'none'}</p>
      <p><strong>Old token in localStorage:</strong> {localStorage.getItem('corvex_token') ? 'exists' : 'none'}</p>
      <button onClick={clearAuth} style={{
        background: 'red',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        cursor: 'pointer',
        marginTop: '10px'
      }}>
        Clear Auth & Reload
      </button>
    </div>
  );
};

export default AuthDebug;