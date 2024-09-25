import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './dashboard.module.css';
import { useNavigate } from "react-router-dom";
import MenuBar from './MenuBar';

function DashboardPage() {
  const [seminars, setSeminars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('email');
    axios.get(`http://localhost:8080/seminar?email=${email}`)
      .then(response => setSeminars(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleDrop = (seminarId) => {
    axios.delete(`http://localhost:8080/seminar/${seminarId}`)
      .then(response => {
        alert("You have successfully dropped one seminar")
        const updatedSeminars = seminars.filter(seminar => seminar.id !== seminarId);
        setSeminars(updatedSeminars);
      })
      .catch(error => console.error(error));
  };
  

  const handleAttend = (seminarId) => {
    localStorage.setItem('AttendSeminar.id',seminarId);
   navigate("/attend");
  };

  return (
    <div className={styles.profilebg}>
      <MenuBar/><br/><br/>
    <div className={styles.container}>
      <h1>My Seminars</h1>
      <table className={styles.seminarTable}>
        <thead>
          <tr>
            <th>Seminar ID</th>
            <th>Date</th>
            <th>Location</th>
            <th>Project Guide Name</th>
            <th>Fee</th>
            <th>Actions</th>
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
              <td>
                <button onClick={() => handleDrop(seminar.id)}>Drop</button>
                <button onClick={() => handleAttend(seminar.id)}>Attend</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default DashboardPage;
