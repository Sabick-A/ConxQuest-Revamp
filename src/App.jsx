
import About from './components/About'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Image from './components/Image'
import Features from './components/Features'
function App() {
  return (
    <div className='min-h-screen'>
      <Navbar/>
      <Hero/>
      <About/>
      <Image/>
      <Features/>
    </div>
  )
}

export default App