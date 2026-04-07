import React, { useContext } from 'react';
import { BookOpen, LogOut, Moon, Sun, User } from 'lucide-react';
import { ThemeContext } from '../App';

const Navbar = ({ user, onLogout }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="navbar fade-in">
      <div className="navbar-content">
        <div className="navbar-brand">
          <BookOpen strokeWidth={2} size={28} />
          <span>Attendance Analyzer</span>
        </div>

        <div className="navbar-user">
          <button className="btn btn-icon" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <div className="user-info">
            <span className="user-role">
              {user.role === 'admin' ? 'Administrator' : user.role === 'student' ? 'Student' : 'Faculty'}
            </span>
            <span className="user-name">{user.name}</span>
          </div>
          <button className="btn btn-logout" onClick={onLogout}>
            <LogOut size={16} strokeWidth={2} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
