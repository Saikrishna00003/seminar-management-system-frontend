import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ChangePasswordPage.module.css';
import MenuBar from './MenuBar';

function ChangePasswordPage() {
  // Initialize state for input fields
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      setError('New password and confirm password must match.');
      return;
    }

    // Send a request to your backend to change the password
    try {
      const response = await fetch('/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      if (response.ok) {
        setSuccessMessage('Password changed successfully.');
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to change password.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An error occurred. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className={styles.changePassword}>
      <MenuBar />
      <h2 className={styles.heading}>Change Password</h2>
      <div className={styles.container}>
        {error && <div className={styles.error}>{error}</div>}
        {successMessage && <div className={styles.success}>{successMessage}</div>}
        <form onSubmit={handlePasswordChange}>
          <div className={styles.formGroup}>
            <label htmlFor="oldPassword">Old Password:</label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Change Password
          </button>
        </form>
      </div>
      <div className={styles.actions}>
        <Link className={styles.link} to="/profile">Back to Profile</Link>
      </div>
    </div>
  );
}

export default ChangePasswordPage;
