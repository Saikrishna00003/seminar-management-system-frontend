import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import styles from './Registration.module.css';
import MenuBar from './MenuBar';

const Register = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessages, setErrorMessages] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordsDoNotMatchError, setPasswordsDoNotMatchError] = useState('');

  const onInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setErrorMessages({ ...errorMessages, [e.target.name]: '' });
    setPasswordsDoNotMatchError(''); // Clear the "Passwords do not match" error message
  }

  const { email, password, confirmPassword } = userData;

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const validateForm = () => {
    const errors = {};
    if (!email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      errors.email = 'Invalid email format';
    }
    if (!password) {
      errors.password = 'Password is required';
    }
    if (password !== confirmPassword) {
      setPasswordsDoNotMatchError('Passwords do not match');
    }
    return errors;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0 || passwordsDoNotMatchError) {
      setErrorMessages(errors);
      return;
    } else {
      const data = {
        email: email,
        password: password,
        role: 'user',
      }
      userDataToSend(data);
    }
  }

  const userDataToSend = (data) => {
    axios.post("http://localhost:8080/register", data)
      .then((response) => {
        console.log(response);
        alert("Registration successful");
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response.data === "User is already registered. Please login to the application.") {
          setErrorMessages({ ...errorMessages, email: error.response.data });
        } else {
          setErrorMessages({ ...errorMessages, email: "There was a problem with your request. Please try again later." });
        }
      });
  }

  return (
    <div className={styles.reg}>
      <MenuBar /><br></br>
      <h2>Welcome to Registration Page</h2>
      <div className={styles.scrollingTextContainer}>
        <p className={styles.scrollingText}>You are just a few steps away!</p>
      </div>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="text" name="email" value={email} onChange={onInputChange} />
            <div className={styles.error}>{errorMessages.email}</div>
          </div>
          <div>
            <label>Password: {errorMessages.password && <span className={styles.error}>{errorMessages.password}</span>}</label>
            <input type="password" name="password" value={password} onChange={onInputChange} />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input type="password" name="confirmPassword" value={confirmPassword} onChange={onInputChange} />
            {passwordsDoNotMatchError && <div className={styles.error}>{passwordsDoNotMatchError}</div>}
          </div>
          <button type="submit">Register</button>
          <div className={styles["login-link"]}>
            Already have an account?/Successfully registered?<br /><Link to="/">Log in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;