import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './InfoDistribution.module.css';
import MenuBar from './MenuBar';

const InfoDistribution = () => {
  const [table1Data, setTable1Data] = useState([]);
  const [table2Data, setTable2Data] = useState([]);

  const [projectGuides, setProjectGuides] = useState([]);
  useEffect(() => {
    fetchProjectGuides(); // Fetch project guides when the component mounts
  }, []);
  const fetchProjectGuides = () => {
    axios
      .get("http://localhost:8080/projectGuides") 
      .then((response) => {
        const guides = response.data;
        setProjectGuides(guides);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      const response1 = await axios.get('http://localhost:8080/emails');
      const response2 = await axios.get('http://localhost:8080/seminar/list');
      setTable1Data(response1.data);
      setTable2Data(response2.data);
    };
    fetchData();
  }, []);

  const renderTableRows = () => {
    return table1Data.map((email, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{email}</td>
      </tr>
    ));
  };  
  
  return (
    <div className={styles.bg}>
      <MenuBar/><br/><br/>
    <div className={styles.infoDistribution}>
      <h2>List of all the Students</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Serial No</th>
            <th>Students in this Programme</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>

      <h2>List of Seminars</h2>
      <table className={styles.table}>
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
          {table2Data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.date}</td>
              <td>{row.location}</td>
              <td>{row.mentorName}</td>
              <td>{row.fee}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>List of Guides</h2>
      <ul className={styles.projectGuideList}>
          {projectGuides.map((guide) => (
            <li key={guide.id}>
              <strong>{guide.name}</strong> - {guide.email}<br />
              {guide.about}
            </li>
          ))}
        </ul>
    </div>
    </div>
  );
};
export default InfoDistribution;
