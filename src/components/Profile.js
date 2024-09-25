import React from 'react';
import { Link } from "react-router-dom";
import styles from './ProfilePage.module.css';
import MenuBar from './MenuBar';

function ProfilePage() {
  // Retrieve the email and role from localStorage
  const userEmail = localStorage.getItem('email');
  const userRole = localStorage.getItem('role');

  return (
    <div className={styles.profile}>
      <MenuBar />
      <h2 className={styles.heading}>Profile</h2>
      <div className={styles.container}>
        <div className={styles.card}>
          <p>Email: {userEmail}</p>
          <p>Role: {userRole}</p> 
        </div>
        <div className={styles.card}>
          <p>We would like to know your more!</p>
        </div>
      </div>
      <div className={styles.actions}>
        <Link className={styles.link} to="/edit-profile">Edit Profile</Link>
        <Link className={styles.link} to="/change-password">Change Password</Link>
      </div>
    </div>
  );
}

export default ProfilePage;
