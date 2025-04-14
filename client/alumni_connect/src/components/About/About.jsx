import React from 'react';
import './About.css';
import { FaUserGraduate, FaComments, FaBookOpen } from 'react-icons/fa';

const About = () => {
  return (
    <section className="about">
      <h2>
        ABOUT <span className="highlight">PICT CONNECT</span>
      </h2>
      <div className="about-cards">
        <div className="card">
          <div className="icon-circle"><FaUserGraduate className="icon" /></div>
          <h3>Mentorship Match</h3>
          <p>
            Connect with alumni based on shared interests, career goals, or specific criteria like industry or company.
            Learn from their experiences, ask for advice, and gain insights that can guide your career journey.
          </p>
          <a href="/connect" className="btn">Find a Mentor</a>
        </div>

        <div className="card">
          <div className="icon-circle"><FaComments className="icon" /></div>
          <h3>Discussion Circles</h3>
          <p>
            Join topic-based communities where students and alumni connect over shared interests like tech, design, research, and more.
            These circles act as mini-communities to ask questions, share insights, and collaborate on ideas or opportunities.
          </p>
          <a href="/community" className="btn">Join Discussions</a>
        </div>

        <div className="card">
          <div className="icon-circle"><FaBookOpen className="icon" /></div>
          <h3>Alumni Blogs</h3>
          <p>
            Through Alumni Blogs, students gain valuable insights into career paths, industry trends, and personal success stories.
            It's a chance to learn from alumni experiences, get practical advice, and stay inspired as they navigate their own journeys.
          </p>
          <a href="/blogs" className="btn">Read Blogs</a>
        </div>
      </div>
    </section>
  );
};

export default About;
