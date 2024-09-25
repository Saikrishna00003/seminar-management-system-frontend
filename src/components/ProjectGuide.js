import React, { useState, useEffect } from 'react';
import styles from './ProjectGuide.module.css';
import axios from 'axios';
import MenuBar from './MenuBar';

function ProjectGuide() {
  const userRole = localStorage.getItem('role');

  const [newGuide, setNewGuide] = useState({
    title: 'Mr',
    name: '',
    email: '',
    about: '',
    degree: '', // Change degrees to a single text field
    experience: '',
    specialization: '', // New field: Specialization
    skills: '', // New field: Skills
  });

  const [projectGuides, setProjectGuides] = useState([]);

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    degrees: '', // Rename degrees to match the new structure
  });

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

  useEffect(() => {
    fetchProjectGuides();
  }, []);

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      degrees: '', // Rename degrees to match the new structure
    };

    if (!newGuide.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!newGuide.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else {
      // Check email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newGuide.email.trim())) {
        newErrors.email = 'Invalid email format';
        valid = false;
      }
    }

    if (!newGuide.degree.trim()) { // Check if the degree field is empty
      newErrors.degrees = 'Degree is required'; // Update the error message
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const addGuide = () => {
    if (!validateForm()) {
      return;
    }

    axios
      .post('http://localhost:8080/projectGuides/add', newGuide)
      .then((response) => {
        const addedGuide = response.data;
        setProjectGuides([...projectGuides, addedGuide]);
        setNewGuide({
          title: 'Mr',
          name: '',
          email: '',
          about: '',
          degree: '', // Reset the degree field
          experience: '',
          specialization: '', // Reset the specialization field
          skills: '', // Reset the skills field
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const removeGuide = (guideId) => {
    axios
      .delete(`http://localhost:8080/projectGuides/${guideId}`)
      .then(() => {
        const updatedGuides = projectGuides.filter((guide) => guide.id !== guideId);
        setProjectGuides(updatedGuides);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={styles.Bg}>
      <MenuBar />
      <h2>Guides</h2>
      {userRole === 'admin' && (
        <div>
          <h3>Add a New Project Guide</h3>
          <div className={styles.addGuideForm}>
            <label>
              Title:
              <select
                value={newGuide.title}
                onChange={(e) => setNewGuide({ ...newGuide, title: e.target.value })}
              >
                <option value="Mr">Mr.</option>
                <option value="Mrs">Mrs.</option>
              </select>
            </label>
            <label>
              Name*:
              <input
                type="text"
                value={newGuide.name}
                onChange={(e) => setNewGuide({ ...newGuide, name: e.target.value })}
              />
              <span className={styles.error}>{errors.name}</span>
            </label>
            <label>
              Email*:
              <input
                type="text"
                value={newGuide.email}
                onChange={(e) => setNewGuide({ ...newGuide, email: e.target.value })}
              />
              <span className={styles.error}>{errors.email}</span>
            </label>
            <label>
              About:
              <textarea
                value={newGuide.about}
                onChange={(e) => setNewGuide({ ...newGuide, about: e.target.value })}
              />
            </label>
            <label>
              Degree*:
              <input
                type="text"
                value={newGuide.degree}
                onChange={(e) => setNewGuide({ ...newGuide, degree: e.target.value })}
              />
              <span className={styles.error}>{errors.degrees}</span>
            </label>
            <label>
              Years of Experience:
              <input
                type="text"
                value={newGuide.experience}
                onChange={(e) => setNewGuide({ ...newGuide, experience: e.target.value })}
              />
            </label>
            <label>
              Specialization:
              <input
                type="text"
                value={newGuide.specialization}
                onChange={(e) => setNewGuide({ ...newGuide, specialization: e.target.value })}
              />
            </label>
            <label>
              Skills:
              <input
                type="text"
                value={newGuide.skills}
                onChange={(e) => setNewGuide({ ...newGuide, skills: e.target.value })}
              />
            </label>
            <button onClick={addGuide}>Add</button>
          </div>
        </div>
      )}

      <div>
        <h3>Project Guides List</h3>
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
                  <strong>Degree:</strong> {guide.degree}
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
                {userRole === 'admin' && (
                  <div>
                    <button onClick={() => removeGuide(guide.id)}>Remove</button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProjectGuide;
