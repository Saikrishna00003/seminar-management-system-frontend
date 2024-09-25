import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './SeminarList.module.css';
import MenuBar from './MenuBar';

function ShowList(){
    const [seminars, setSeminars] = useState([]);
  const userRole = localStorage.getItem('role'); // Retrieve user's role from local storage
const h1Text = userRole === 'admin' ? 'Admin Seminars' : 'Upcoming Seminars';
  const h2Text =
    userRole === 'admin'
      ? 'Manage and create seminars as an admin.'
      : 'Enroll for a Seminar of your choice! You can enroll for multiple seminars too!';
      useEffect(() => {
        axios
          .get('http://localhost:8080/seminar/list')
          .then((response) => setSeminars(response.data))
          .catch((error) => console.log(error));
      }, []);

      return (
        <div className={styles.bg}>
          <MenuBar />
          <br />
          <br />
          <div className={styles.container}>
            <h1 style={{ fontSize: '35px', color: '#345' }}>{h1Text}</h1>
            <h2 style={{ fontSize: '25px', color: '#FFA500' }}>{h2Text}</h2>
           <table className={styles.seminarTable}>
              <thead>
                <tr>
                  <th>Seminar ID</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Project Guide Name</th>
                  <th>Fee</th>
                </tr>
              </thead>
              <tbody>
                {seminars.map(seminar => (
                  <tr key={seminar.id}>
                    <td>{seminar.seminarId}</td>
                    <td>{seminar.date}</td>
                    <td>{seminar.location}</td>
                    <td>{seminar.mentorName}</td>
                    <td>{seminar.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            </div>
  );
}

export default ShowList;
