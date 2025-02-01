import React from 'react'
import Navbar from '../components/Home/Navbar'
import Hero from '../components/Home/Hero'
import About from '../components/Home/About'
import Features from '../components/Home/Features'
import HowToPlay from '../components/Home/HowToPlay'
import FAQ from '../components/Home/FAQ'
import Footer from '../components/Home/Footer'
import SplashCursor from '../components/common/SplashCursor'

function Home() {
  return (
    <div className='min-h-screen'>
      <SplashCursor/>
      <Navbar/>
      <Hero/>
      <About/>
      <Features/>
      <HowToPlay/>
      <FAQ/>
      <Footer/>
    </div>
  )
}

export default Home