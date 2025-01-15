import React from 'react'
import Navbar from '../components/Home/Navbar'
import Hero from '../components/Home/Hero'
import About from '../components/Home/About'

function Home() {
  return (
    <div className='min-h-screen'>
      <Navbar/>
      <Hero/>
      <About/>
    </div>
  )
}

export default Home