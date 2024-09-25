import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AttendSeminarForm.module.css";
import MenuBar from "./MenuBar";

function Attend() {
  const [email, setEmail] = useState('');
  const [seminar, setSeminar] = useState(null);
  const [teamsMeetLink, setTeamsMeetLink] = useState('');
  const localid = localStorage.getItem("AttendSeminar.id");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    setEmail(storedEmail);

    const fetchSeminar = (id) => {
      axios.get(`http://localhost:8080/seminar/attend/${id}`, {
        params: {
          id: id
        }
      })
      .then(response => {
        setSeminar(response.data);
        
        // Generate a random Teams meeting link (replace with your logic)
        const randomMeetLink = generateRandomTeamsMeetLink();
        setTeamsMeetLink(randomMeetLink);
      })
      .catch(error => {
        console.error("Error fetching seminar: ", error);
      });
    };

    fetchSeminar(localid);
  }, [localid]);

  // Replace this function with your logic to generate a random Teams meeting link
  const generateRandomTeamsMeetLink = () => {
    // Implement your logic here to generate a random Teams meeting link
    // For example, you can generate a link using a predefined format or retrieve it from a database.
    return "https://teams.microsoft.com/...";
  };

  return (
    <div className={styles.bg}>
      <MenuBar /><br /><br />
      <div className={styles.container}>
        {seminar ? (
          <div>
            <h2 className={styles.title}>Hi {email}, you are now attending:</h2>
            <div className={styles.details}>
              <p className={styles.subtitle}>Seminar Details:</p>
              <ul>
                <li>Date: {seminar.date}</li>
                <li>Location: {seminar.location}</li>
                <li>Project Guide Name: {seminar.mentorName}</li>
              </ul>
            </div>
            <a href={teamsMeetLink} target="_blank" rel="noopener noreferrer">Join Teams Meeting</a>
          </div>
        ) : (
          <p className={styles.loading}>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Attend;