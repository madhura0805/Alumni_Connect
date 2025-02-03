import './Home.css'
import Navbar from './components/Navbar/Navbar'
import TopAlumni from './components/TopAlumni/TopAlumni'
import Welcome from './components/Welcome/Welcome'
import WhyUs from './components/WhyUs/WhyUs'
import AboutUs from './components/AboutUs/AboutUs'

function App() {

  return (
   <div>
    <Navbar/>
    <Welcome/>
    <WhyUs/>
    <TopAlumni/>
    <AboutUs />
   </div>
  )
}

export default App
