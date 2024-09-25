import React, { useState } from 'react';
import axios from 'axios';
import styles from './AdminGuideAdd.module.css'; // Import the CSS specific to this component

function AdminGuideAdd() {
  const [newGuide, setNewGuide] = useState({
    title: 'Mr',
    name: '',
    email: '',
    about: '',
    degrees: [],
    experience: '',
    specialization: '',
    skills: '',
  });

  const [predefinedDegrees, setPredefinedDegrees] = useState([
    'M.Tech',
    'MCA',
    'Ph.D',
    'B.Tech',
    'MS',
    'MBA',
    'BBA',
    'BCA',
    'BA',
    'B.Com',
    'M.Sc',
    'MA',
    'B.Sc',
    'BE',
    'M.E',
    'M.S',
    'Pharm.D',
    'Pharm.B',
    'Diploma',
    'Other',
  ]);

  const [customDegree, setCustomDegree] = useState(false);
  const [otherDegree, setOtherDegree] = useState('');
  const [selectedDegrees, setSelectedDegrees] = useState([]);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    degrees: '',
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      degrees: '',
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

    if (selectedDegrees.length === 0) { // Check the selectedDegrees array
      newErrors.degrees = 'At least one degree is required';
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
        alert("Succesfully added Guide");
        setNewGuide({
          title: 'Mr',
          name: '',
          email: '',
          about: '',
          degrees: [],
          experience: '',
          specialization: '',
          skills: '',
        });
        setSelectedDegrees([]);
        setCustomDegree(false);
        setOtherDegree('');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const toggleCustomDegree = () => {
    setCustomDegree(!customDegree);
    setOtherDegree('');
  };

  const selectOtherDegree = () => {
    if (otherDegree.trim() !== '') {
      setPredefinedDegrees([...predefinedDegrees, otherDegree]);
      setSelectedDegrees([...selectedDegrees, otherDegree]);
      setOtherDegree('');
    }
  };

  const deselectDegree = (degree) => {
    const updatedDegrees = selectedDegrees.filter((d) => d !== degree);
    setSelectedDegrees(updatedDegrees);
  };

  return (
    <div className={styles.Bg}>
      <h2>Add a New Project Guide</h2>
      <div className={styles.addGuideForm}>
  <label>
    Title:
    <select
      value={newGuide.title}
      onChange={(e) => setNewGuide({ ...newGuide, title: e.target.value })}
    >
      <option value="Mr">Mr</option>
      <option value="Mrs">Mrs</option>
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
    Degrees*:
    <div className={styles.degreeSelection}>
      <select
        multiple
        size="5"
        value={selectedDegrees}
        onChange={(e) =>
          setSelectedDegrees(Array.from(e.target.selectedOptions, (option) => option.value))
        }
      >
        {predefinedDegrees.map((degree) => (
          <option key={degree} value={degree}>
            {degree}
          </option>
        ))}
      </select>
      {customDegree && (
        <div className={styles.customDegree}>
          <input
            type="text"
            value={otherDegree}
            onChange={(e) => setOtherDegree(e.target.value)}
            placeholder="Enter custom degree"
          />
          <button onClick={selectOtherDegree}>Add</button>
        </div>
      )}
      <button className={styles.toggleCustomDegreeButton} onClick={toggleCustomDegree}>
        {customDegree ? 'Use Predefined Degrees' : 'Add Custom Degree'}
      </button>
      <div className={styles.selectedDegrees}>
        {selectedDegrees.length > 0 && (
          <div>
            <strong>Selected Degrees:</strong>
            {selectedDegrees.map((degree) => (
              <span key={degree} className={styles.selectedDegree}>
                {degree}
                <button onClick={() => deselectDegree(degree)}>X</button>
              </span>
            ))}
          </div>
        )}
      </div>
      <span className={styles.error}>{errors.degrees}</span>
    </div>
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
  );
}

export default AdminGuideAdd;
