import React, { useState } from 'react';
import styles from './Help.module.css';
import MenuBar from './MenuBar';

const Help = () => {
  // Define an array of objects containing titles and corresponding content
  const helpItems = [
    {
      title: 'How do I reset my password?',
      content: 'To reset your password, go to the "Change Password" in your profile page and follow the instructions there.',
    },
    {
      title: 'What is the cancellation policy?',
      content: 'Our cancellation policy allows you to cancel your booking up to 24 hours before the scheduled time without any charges.',
    },
    {
      title: 'Where can I find the user manual?',
      content: 'You can find the user manual in the "Resources" section of our website. It contains detailed instructions for using our products.',
    },
  ];

  // State to track which item is currently selected
  const [selectedItem, setSelectedItem] = useState(null);

  // Function to handle item click
  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  return (
    <div className={styles.bg}>
      <div className={styles.help}>
        <MenuBar />
        <br />
        <br />
        <h1 className={styles.title}>How can we help you?</h1>
        <p className={styles.text}>
          Here you can find some helpful resources and frequently asked questions.
        </p>
        <ul className={styles.list}>
          {helpItems.map((item, index) => (
            <li
              key={index}
              className={`${styles.item} ${selectedItem === index ? styles.selected : ''}`}
              onClick={() => handleItemClick(index)}
            >
              {item.title}
            </li>
          ))}
        </ul>
        {selectedItem !== null && (
          <div className={styles.content}>
            <p>{helpItems[selectedItem].content}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Help;
