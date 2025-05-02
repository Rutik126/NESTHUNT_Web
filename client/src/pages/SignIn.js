import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/SignIn.css';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'https://animated-carnival-5wgp79rqjxj3445p-5000.app.github.dev',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const SignIn = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await api.post('/api/auth/login', {
        email,
        password,
        userType,
      });
  
      if (response.status === 200) {
        setIsLoggedIn(true);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userType', response.data.userType);
        navigate('/');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
        (userType === 'user' ? 'User not found!' : 'Roomowner not found!');
      setError(errorMessage);
      console.error('Login error:', err.response?.data || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='background'>
      <div className='form-box'>
        <div className='button-box'>
          <div id='btn' style={{ left: userType === 'user' ? '0' : '150px' }}></div>
          <button
            type='button'
            className='toggle-btn'
            onClick={() => setUserType('user')}
            disabled={isLoading}
          >
            User
          </button>
          <button
            type='button'
            className='toggle-btn'
            onClick={() => setUserType('roomowner')}
            disabled={isLoading}
          >
            RoomOwner
          </button>
        </div>
        {error && <p className='error'>{error}</p>}
        <form onSubmit={handleSubmit} className='input-group' id='login' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginTop: '10vh' }}>
          <input
            type='email'
            className='input-field'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
          <input
            type='password'
            className='input-field'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
          <button 
            type='submit' 
            className='submit-btn'
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
