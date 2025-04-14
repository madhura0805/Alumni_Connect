import React from 'react';
import About from '../components/About/About.jsx';
import TopAlumni from '../components/TopAlumni/TopAlumni.jsx';
import Welcome from '../components/Welcome/Welcome';
import WhyUs from '../components/WhyUs/WhyUs';
import AboutUs from '../components/AboutUs/AboutUs';
import Footer from '../components/Footer/Footer';
import AlumniChart from '../components/AlumniChart'; 

const Home = () => {
  return (
    <div>
      <Welcome />
      <About />
      <AlumniChart /> 
      <WhyUs />
      <TopAlumni />
      <AboutUs />
      <Footer />
    </div>
  );
};

export default Home;
