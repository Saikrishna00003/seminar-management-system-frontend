import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './SeminarList.module.css';
import MenuBar from './MenuBar';

function SeminarList() {
  const [seminars, setSeminars] = useState([]);
  const [newSeminarData, setNewSeminarData] = useState({
    date: '',
    location: '',
    mentorName: '',
    fee: '',
    seminarId: 6,
  });
  const [isAddSeminarFormVisible, setIsAddSeminarFormVisible] = useState(false);
  const userRole = localStorage.getItem('role');
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

  const handleEnrollClick = (seminarId) => {
    const email = localStorage.getItem('email');
    const selectedSeminar = seminars.find((seminar) => seminar.seminarId === seminarId);

    axios
      .post('http://localhost:8080/seminar/enroll', {
        email: email,
        seminarId: selectedSeminar.seminarId,
        date: selectedSeminar.date,
        fee: selectedSeminar.fee,
        location: selectedSeminar.location,
        mentorName: selectedSeminar.mentorName,
      })
      .then((response) => {
        alert('You have successfully enrolled for a seminar');
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteClick = (id) => {
    axios
      .delete(`http://localhost:8080/seminar/AdminDelete/${id}`)
      .then((response) => {
        if (response.status === 200) {
          alert('You have successfully dropped one seminar');
          const updatedSeminars = seminars.filter((seminar) => seminar.id !== id);
          setSeminars(updatedSeminars);
        } else {
          alert('Failed to delete seminar. Please try again.');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('An error occurred while deleting the seminar. Please try again.');
      });
  };

  const handleAddSeminarClick = () => {
    // Set the state variable to show the seminar form
    setIsAddSeminarFormVisible(!isAddSeminarFormVisible);
  };

  const handleAddSeminarSubmit = () => {
    if (
      !newSeminarData.date ||
      !newSeminarData.location ||
      !newSeminarData.mentorName ||
      !newSeminarData.fee
    ) {
      alert('Please fill in all required fields.');
      return; // Prevent form submission if any required fields are empty
    }
    
    // Increment the seminarId for the new seminar
    const newSeminarId = newSeminarData.seminarId + 1;
    
    axios
      .post('http://localhost:8080/seminar/add', {
        ...newSeminarData,
        seminarId: newSeminarId, // Use the new seminarId
      })
      .then((response) => {
        if (response.status === 200) {
          alert('Seminar added successfully');
          axios
            .get('http://localhost:8080/seminar/list')
            .then((response) => setSeminars(response.data))
            .catch((error) => console.log(error));
        } else {
          alert('Failed to add seminar. Please try again.');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('An error occurred while adding the seminar. Please try again.');
      });

    // Clear the form fields and update the seminarId in state
    setNewSeminarData({
      date: '',
      location: '',
      mentorName: '',
      fee: '',
      seminarId: newSeminarId, // Update the seminarId in state
    });
    setIsAddSeminarFormVisible(false);
  };

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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {seminars.map((seminar) => (
              <tr key={seminar.id}>
                <td>{seminar.seminarId}</td>
                <td>{seminar.date}</td>
                <td>{seminar.location}</td>
                <td>{seminar.mentorName}</td>
                <td>{seminar.fee}</td>
                <td>
                  {userRole === 'admin' ? (
                    <button onClick={() => handleDeleteClick(seminar.id)}>Delete</button>
                  ) : (
                    <button onClick={() => handleEnrollClick(seminar.seminarId)}>Enroll</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {userRole === 'admin' && (
          <button className={styles.addSeminarButton} onClick={handleAddSeminarClick}>
            Add Seminar
          </button>
        )}
      </div>

      {isAddSeminarFormVisible && userRole === 'admin' && (
        <div className="modal-overlay">
          <div className="add-seminar-form">
            <h2>Add a New Seminar</h2>
            <form>
              <div>
                <label>Date:</label>
                <input
                  type="text"
                  name="date"
                  value={newSeminarData.date}
                  onChange={(e) =>
                    setNewSeminarData({ ...newSeminarData, date: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Location:</label>
                <input
                  type="text"
                  name="location"
                  value={newSeminarData.location}
                  onChange={(e) =>
                    setNewSeminarData({ ...newSeminarData, location: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Project Guide Name:</label>
                <input
                  type="text"
                  name="mentorName"
                  value={newSeminarData.mentorName}
                  onChange={(e) =>
                    setNewSeminarData({ ...newSeminarData, mentorName: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Fee:</label>
                <input
                  type="text"
                  name="fee"
                  value={newSeminarData.fee}
                  onChange={(e) =>
                    setNewSeminarData({ ...newSeminarData, fee: e.target.value })
                  }
                />
              </div>
            </form>
            <button onClick={handleAddSeminarSubmit}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SeminarList;
