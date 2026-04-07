import React, { useState } from 'react';
import { GraduationCap, User, Lock, BookOpen, ShieldCheck } from 'lucide-react';
import { apiLogin } from '../services/api';

const Login = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState('student');
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await apiLogin(credentials.email, credentials.password);
      
      // Store token securely (localStorage for demo purposes)
      if (data.token) {
        localStorage.setItem('currentUser', JSON.stringify({ ...data, role: selectedRole }));
      }
      
      onLogin(data);
    } catch (error) {
      console.error('Login error:', error);
      alert(error.message || 'Error connecting to the server.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo fade-in">
            <BookOpen size={48} strokeWidth={1.5} />
          </div>
          <h1 className="login-title fade-in" style={{ animationDelay: '0.1s' }}>Attendance Analyzer</h1>
          <p className="login-subtitle fade-in" style={{ animationDelay: '0.2s' }}>Track, Analyze & Improve Attendance</p>
        </div>

        <form onSubmit={handleSubmit} className="fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="role-selector" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <div
              className={`role-option ${selectedRole === 'student' ? 'active' : ''}`}
              onClick={() => setSelectedRole('student')}
              style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
            >
              <User size={24} strokeWidth={1.5} />
              <span style={{ fontSize: '0.85rem' }}>Student</span>
            </div>
            <div
              className={`role-option ${selectedRole === 'faculty' ? 'active' : ''}`}
              onClick={() => setSelectedRole('faculty')}
              style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
            >
              <GraduationCap size={24} strokeWidth={1.5} />
              <span style={{ fontSize: '0.85rem' }}>Faculty</span>
            </div>
            <div
              className={`role-option ${selectedRole === 'admin' ? 'active' : ''}`}
              onClick={() => setSelectedRole('admin')}
              style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
            >
              <ShieldCheck size={24} strokeWidth={1.5} />
              <span style={{ fontSize: '0.85rem' }}>Admin</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              placeholder="Enter your email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '0.875rem' }}>
            <Lock size={18} />
            <span>Sign In</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
