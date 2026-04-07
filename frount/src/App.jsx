import React, { useState, useEffect, createContext } from 'react';
import Login from './components/Login';
import Navbar from './components/Navbar';
import StudentDashboard from './components/StudentDashboard';
import FacultyDashboard from './components/FacultyDashboard';
import AdminDashboard from './components/AdminDashboard';
import './styles.css';

export const ThemeContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // The Login component fetch now needs to return the full user profile data 
  // and pass it here instead of just the role string.
  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app-container ${theme}`}>
        <Navbar user={user} onLogout={handleLogout} />
        <main className="main-content">
          {user.role === 'admin' ? (
            <AdminDashboard />
          ) : user.role === 'student' ? (
            <StudentDashboard />
          ) : (
            <FacultyDashboard />
          )}
        </main>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
