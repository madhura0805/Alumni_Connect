import React from 'react';
import TopAlumni from './TopAlumni/TopAlumni';
import Welcome from './Welcome/Welcome';
import WhyUs from './WhyUs/WhyUs';
import AboutUs from './AboutUs/AboutUs';
import Footer from '../Footer/Footer';
const Home = () => {
  
  return (
    <div>
    <Welcome/>
    <WhyUs/>
    <TopAlumni/>
    <AboutUs />
    <Footer/>
    </div>
  )
}

export default Home
