import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../components/Home/Navbar'
import Hero from '../components/Home/Hero'
import About from '../components/Home/About'
import Features from '../components/Home/Features'
import HowToPlay from '../components/Home/HowToPlay'
import FAQ from '../components/Home/FAQ'
import Footer from '../components/Home/Footer'
import SplashCursor from '../components/common/SplashCursor'

function Home() {
  const [isLeaving, setIsLeaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = "rgb(5, 46, 22)";
    
    return () => {
      if (isLeaving) {
        document.body.style.backgroundColor = "#2A7299";
      }
    };
  }, [isLeaving]);

  const handleStartGame = () => {
    setIsLeaving(true);
    setTimeout(() => {
      navigate('/map');
    }, 500);
  };

  return (
    <div className={`min-h-screen transition-opacity duration-500 ${isLeaving ? 'opacity-0' : 'opacity-100'}`}>
      <SplashCursor/>
      <Navbar/>
      <Hero onStartGame={handleStartGame}/>
      <About/>
      <Features/>
      <HowToPlay/>
      <FAQ/>
      <Footer/>
    </div>
  )
}

export default Home