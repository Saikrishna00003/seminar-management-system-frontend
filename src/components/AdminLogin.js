import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './AdminLogin.module.css'; 

const AdminLogin = () => {
  const [adminData, setAdminData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const onInputChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const { email, password } = adminData;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email && !password) {
      handleCustomAlert('Please enter email and password.', false); // Use your custom error handling
      return;
    }
    if(!email){
      handleCustomAlert('Please enter email', false); // Use your custom error handling
      return;
    }
    if(!password){
      handleCustomAlert('Please enter password', false); // Use your custom error handling
      return;
    }
    
    const data = {
      email: email,
      password: password,
      role: 'admin', 
    };

    try {
      const response = await axios.post('http://localhost:8080/admin-login', data);
      console.log(response.data);
      localStorage.setItem('email', email);
      localStorage.setItem('role', 'admin');
      handleCustomAlert('Login successful', true);
      setTimeout(() => {
        navigate('/admin-home');
      }, 1000); 
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data === 'Invalid email or password.') {
        handleCustomAlert(error.response.data, false);
      } else {
        handleCustomAlert('Login failed. Please try again.', false);
      }
    }
  };
  const handleCustomAlert = (message, success) => {
    const alertBox = document.createElement('div');
    alertBox.textContent = message;
    alertBox.style.backgroundColor = success ? 'green' : 'red';
    alertBox.style.color = 'white';
    alertBox.style.position = 'fixed';
    alertBox.style.top = '10px';
    alertBox.style.left = '50%';
    alertBox.style.transform = 'translateX(-50%)';
    alertBox.style.padding = '10px 20px';
    alertBox.style.borderRadius = '5px';
    alertBox.style.opacity = '0';
    alertBox.style.transition = 'opacity 1s ease-in-out';
    document.body.appendChild(alertBox);

    setTimeout(() => {
      alertBox.style.opacity = '1';
    }, 100);

    setTimeout(() => {
      alertBox.style.opacity = '0';
      setTimeout(() => {
        alertBox.remove();
      }, 1000);
    }, 2000);
  };

  return (
    <div className={styles.log}>
    <div className={styles.adminLogin}>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <input
            className={`${styles.emailInput}`}
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={onInputChange}
          />

          <input
            className={`${styles.passwordInput}`}
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={onInputChange}
          />
        </div>
        <button type="submit" className={`${styles.submitButton}`}>
          Login
        </button>
        <div className={styles.backLink}>
          <Link to="/">Back to User Login</Link>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AdminLogin;
