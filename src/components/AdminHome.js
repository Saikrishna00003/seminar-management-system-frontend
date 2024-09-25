
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css'; // Use the same CSS file as HomePage.js
import MenuBar from './MenuBar';

function AdminHome() {
  const [showMore, setShowMore] = useState(false);

  const toggleContent = () => {
    setShowMore(!showMore);
  };

  return (
    <div className={styles.split}>
      <div className={styles.main}>
        <div className={styles.home}>
          <MenuBar />
          <br />
          <br />
          <div className={styles.logoContainer}></div>
          <div className={styles.navbar}>
            <Link className={styles.navLink} to="/enroll">
              Seminar Control
            </Link>
            <Link className={styles.navLink} to="/info">
              Information Distribution Centre
            </Link>
            <Link className={styles.navLink} to="/showlist">
              Seminar List
            </Link>
            <Link className={styles.navLink} to="/guide-add">
              Project Guide
            </Link>
            <Link className={styles.navLink} to="/guide-info">
              Project Guide Information
            </Link>
          </div>
          <div className={styles.Info}>
            <h2>About us</h2>
            <div className={styles.content}>
              <p>
                Introducing our cutting-edge Project Management System – the one-stop solution for all your project management needs! 🚀
              </p>
              {showMore && (
                <div className={styles.additionalContent}>
                  {/* Add the complete list here */}
                  <p>
                    Are you tired of juggling multiple tools and spreadsheets to manage your projects efficiently? Do you want a seamless, user-friendly platform that streamlines every aspect of your project lifecycle? Look no further!
                  </p>
                  <p>
                    Why Choose Us?
                  </p>
                  <ul>
                    <li>🌟 Effortless Enrollment: Say goodbye to paperwork and tedious enrollment processes. With just a few clicks, you can enroll in seminars and workshops that are relevant to your projects.</li>
                    <li>📊 Dashboard Delight: Visualize your project progress like never before! Our intuitive dashboard provides real-time insights, helping you make informed decisions and stay ahead of the curve.</li>
                    <li>📝 Interactive Seminar Lists: Explore a diverse range of seminars tailored to your interests and expertise. With detailed descriptions and schedules, you'll never miss an opportunity to expand your knowledge.</li>
                    <li>🌐 User-Friendly Experience: We believe that managing projects should be stress-free. Our platform is designed with you in mind, ensuring a smooth and enjoyable experience.</li>
                    <li>👥 Community and Collaboration: Connect with like-minded professionals, share experiences, and foster collaborations. We're not just a platform; we're a community.</li>
                    <li>💡 Constant Innovation: We're committed to staying at the forefront of project management trends. Our system evolves with you, ensuring you always have access to the latest tools and techniques.</li>
                    <li>📧 Seamless Communication: Communication is key in project management. Our system facilitates easy and efficient communication between team members, ensuring everyone is on the same page.</li>
                    <li>🔒 Security First: We take your data seriously. Our state-of-the-art security measures guarantee the safety of your information.</li>
                    <li>📈 Future-Proof Your Success: With our Project Management System, you're not just managing projects; you're setting the stage for your future success.</li>
                  </ul>
                </div>
              )}
              {!showMore && (
                <button onClick={toggleContent} className={styles.readMoreBtn}>
                  Read More
                </button>
              )}
            </div>
          </div>
        </div>
        <footer className={styles.footer}>
          <p>Contact Information: mishalkulung@gmail.com</p>
          <p>&copy; 2023 Project Management System. All rights reserved.</p>
        </footer>
      </div>
      <div className={styles.rightpanel}>
      <div className={styles.testimonials}>
    <h3>Testimonials </h3>
    <div className={styles.testimonial}>
      <p>"This project management system has made my work so much easier. I love it!"</p>
      <p>- John Doe</p>
    </div>
    <div className={styles.testimonial}>
      <p>"I can't believe I used to manage projects without this tool. It's a game-changer!"</p>
      <p>- Jane Smith</p>
    </div>
    {/* Add more testimonials as needed */}
  </div>
  <div className={styles.helpCenter}>
  <h3 className={`${styles.yellowText} !important`}>Help Center</h3>
  <p>
    Need assistance? Visit our <Link to="/help">Help Center</Link> for answers to common questions and support.
  </p>
</div>
      </div>
    </div>
  );
}
export default AdminHome;
