import React from 'react'
import Navbar from '../components/Home/Navbar'
import Hero from '../components/Home/Hero'

function Home() {
  return (
    <div className='min-h-screen'>
      <Navbar/>
      <Hero/>
    </div>
  )
}

export default Home