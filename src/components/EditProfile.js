// EditProfilePage.js

import React, { useState } from 'react';
import styles from './EditProfilePage.module.css';
import MenuBar from './MenuBar';

function EditProfilePage() {
  // Initialize state for user information
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [degree, setDegree] = useState('');
  const [college, setCollege] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to update user information in your backend here
  };

  return (
    <div className={styles.editProfile}>
      <MenuBar />
      <h2 className={styles.heading}>Edit Profile</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="text"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="degree">Degree:</label>
          <input
            type="text"
            id="degree"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="college">College:</label>
          <input
            type="text"
            id="college"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProfilePage;
