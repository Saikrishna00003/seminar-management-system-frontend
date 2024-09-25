import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Login.module.css';
import MenuBar from './MenuBar';
import gifImage from './giphy.gif';

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    role: '',
  });
  const navigate = useNavigate();

  const onInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  

  const { email, password } = userData;

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email && !password) {
      handleCustomAlert('Please enter email and password.', false); 
      return;
    }
    if(!email){
      handleCustomAlert('Please enter email', false);
      return;
    }
    if(!password){
      handleCustomAlert('Please enter password', false); 
      return;
    }
    if (!validateEmail(email)) {
      handleCustomAlert('Invalid email format', false);
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post('http://localhost:8080/login', data);
      console.log(response);
      localStorage.setItem('email', email);
      localStorage.setItem('role', response.data.role);
      handleCustomAlert('Login successful', true);

      const userRole = localStorage.getItem('role');

      setTimeout(() => {
        if (userRole === 'user') {
          navigate('/home');
        } else if (userRole === 'admin') {
          navigate('/admin-home');
        } else {
          handleCustomAlert('Invalid role.', false);
        }
      }, 2000);
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

      alertBox.style.opacity = '1';
    

    setTimeout(() => {
      alertBox.style.opacity = '0';
      setTimeout(() => {
        alertBox.remove();
      }, 1000);
    }, 2000);
  };

  return (
    <div className={styles.log}>
      <MenuBar />
      <br />
      <div className={styles.split}>
        <div className={styles.main}>
          <h2>Project Management System</h2>
          <img src={gifImage} alt="Welcome GIF" />
        </div>
        <div className={styles.rightpanel}></div>
        <div className={styles.container}>
          <form onSubmit={handleSubmit} className={`${styles.form} ${styles.addGuideForm}`}>
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
              <button type="submit" className={`${styles.submitButton} ${styles['addGuideForm button']}`}>
              Login
            </button>
            {/* <div className={styles.adminLoginLink}>
                <Link to="/admin-login">Admin Login</Link>
              </div> */}
            <div className={styles.registerLink}>
              New User? <Link to="/register" className={styles.createAccountLink}>Create Account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;