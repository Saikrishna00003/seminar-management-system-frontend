import React, { useState, useEffect } from 'react';
import styles from './UserGuideList.module.css'; // Import the CSS specific to this component
import axios from 'axios';

function UserGuideList() {
  const [projectGuides, setProjectGuides] = useState([]);
  const userRole = localStorage.getItem('role'); // Retrieve the user's role from localStorage

  useEffect(() => {
    const fetchProjectGuides = () => {
      axios
        .get('http://localhost:8080/projectGuides')
        .then((response) => {
          const guides = response.data;
          setProjectGuides(guides);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchProjectGuides();
  }, []);

  // Function to remove a guide by guideId
  const removeGuide = (guideId) => {
    axios
      .delete(`http://localhost:8080/projectGuides/${guideId}`)
      .then(() => {
        // Update the UI by filtering out the removed guide
        const updatedGuides = projectGuides.filter((guide) => guide.id !== guideId);
        setProjectGuides(updatedGuides);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={styles.Bg}>
      <h2>Guides List</h2>
      <ul className={styles.projectGuideList}>
        {projectGuides.map((guide) => (
          <li key={guide.id}>
            <div className={styles.guideContainer}>
              <div>
                <strong>{guide.title} {guide.name}</strong> - {guide.email}
              </div>
              <div>
                <strong>About:</strong> {guide.about}
              </div>
              <div>
                <strong>Degrees:</strong> {guide.degrees ? guide.degrees.join(', ') : ''}
              </div>
              <div>
                <strong>Experience:</strong> {guide.experience} years
              </div>
              <div>
                <strong>Specialization:</strong> {guide.specialization}
              </div>
              <div>
                <strong>Skills:</strong> {guide.skills}
              </div>
              {userRole === 'admin' && ( // Conditionally render the button for admin
                <button onClick={() => removeGuide(guide.id)}>Remove Guide</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserGuideList;
