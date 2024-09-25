import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './menubar.module.css';

function MenuBar() {
  const location = useLocation();
  const isHomePage = location.pathname === '/home';
  const isAdminHomePage = location.pathname === '/admin-home';
  const isProfilePage = location.pathname === '/profile';
  const isLoginPage = location.pathname === '/';
  const isRegPage = location.pathname === '/register';
  const isHelpPage = location.pathname === '/help';

  // Retrieve the 'role' from localStorage
  const role = localStorage.getItem('role');

  return (
    <div className={styles['menu-bar']}>
      {role === 'user' && (
        <>
          {!isProfilePage && !isLoginPage && !isRegPage && <Link to="/profile">Profile</Link>}
          {isProfilePage && !isLoginPage && !isRegPage && <Link to="/">Logout</Link>}
          {!isHomePage && !isLoginPage && !isRegPage && <Link to="/home">Home</Link>}
          {!isHelpPage && <Link to="/help">Help</Link>}
        </>
      )}

      {role === 'admin' && (
        <>
          {!isProfilePage && !isLoginPage && !isRegPage && <Link to="/profile">Profile</Link>}
          {isProfilePage && !isLoginPage && !isRegPage && <Link to="/">Logout</Link>}
          {!isAdminHomePage && !isLoginPage && !isRegPage && <Link to="/admin-home">Home</Link>}
          {!isHelpPage && <Link to="/help">Help</Link>}
        </>
      )}
    </div>
  );
}

export default MenuBar;
