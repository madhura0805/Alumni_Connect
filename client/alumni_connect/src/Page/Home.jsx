import React from 'react'
import TopAlumni from '../components/TopAlumni/TopAlumni.jsx'
import Welcome from '../components/Welcome/Welcome'
import WhyUs from '../components/WhyUs/WhyUs'
import AboutUs from '../components/AboutUs/AboutUs'
import Footer from '../components/Footer/Footer'

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
