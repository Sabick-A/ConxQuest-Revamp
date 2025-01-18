import React, { useState } from "react";
import logo2 from "../../assets/images/common/logo2.png";
import { Link, useLocation } from "react-router-dom";
import {Link as ScrollLink} from 'react-scroll'
import { useNavigate } from "react-router-dom";
import Alert from "../common/Alert";

const NavLink = ({ to, children }) => {
    const location = useLocation();
    const isActive = location.hash === to;
    
    return (
        <Link 
            to={to} 
            className={`text-white hover:text-green-400 transition-colors ${isActive ? 'text-green-400' : ''}`}
            aria-current={isActive ? 'page' : undefined}
        >
            {children}
        </Link>
    );
};

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const navigate = useNavigate();
    const handleStartGameClick =()=>{
        if(window.innerWidth<=768){
            setIsMenuOpen(false);
            setAlertVisible(true);
        }else{
            navigate("/map");
        }
    }
    return (
        <>
            {alertVisible && <Alert setVisible={setAlertVisible}/>}
            <nav className="fixed top-0 w-full z-50 bg-transparent py-4" role="navigation" aria-label="Main navigation">
            <div className="ml-14 my-5 px-2">
                <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-green-500">
                        <Link to="/" aria-label="Home">
                            <img src={logo2} className="h-10" alt="ConxQuest Logo" />
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button 
                        className="xl:hidden p-2 text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>

                    {/* Desktop menu */}
                    <div className="hidden xl:flex md:space-x-6 lg:space-x-12 xl:space-x-24 font-bold font-main">
                    <ScrollLink to="home" smooth={true} duration={500} className="text-white hover:text-green-400 transition-colors cursor-pointer">Home</ScrollLink>

                        <ScrollLink to="about" smooth={true} duration={500} className="text-white hover:text-green-400 transition-colors cursor-pointer">About</ScrollLink>
                        <ScrollLink to="features" smooth={true} duration={500} className="text-white hover:text-green-400 transition-colors cursor-pointer">Features</ScrollLink>
                        <ScrollLink to="howtoplay" smooth={true} duration={500} className="text-white hover:text-green-400 transition-colors cursor-pointer">How To Play</ScrollLink>
                        <NavLink to="#faq">FAQ</NavLink>
                        <NavLink to="#contact">Contact</NavLink>
                    </div>

                    {/* Play button */}
                    <div className="hidden xl:block">
                            <button 
                                className="mr-10 relative cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[2px] bg-black rounded-[16px] bg-gradient-to-t from-[#2e5b19] to-[#4e8b2a] active:scale-95"
                                aria-label="Start playing"
                                onClick={handleStartGameClick}
                            >
                                <span className="w-full h-full flex items-center gap-2 px-8 py-3 bg-[#3b7322] text-white rounded-[14px] bg-gradient-to-t from-[#2e5b19] to-[#5aa636]">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        aria-hidden="true"
                                    >
                                        <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Play Now
                                </span>
                            </button>
                    </div>
                </div>

                {/* Mobile menu */}
                <div 
                    id="mobile-menu"
                    className={`xl:hidden ${isMenuOpen ? 'block' : 'hidden'} mt-4 bg-black bg-opacity-90 rounded-lg p-4`}
                >
                    <div className="flex flex-col space-y-4 font-bold font-main">
                    <ScrollLink to="home" smooth={true} duration={500} className="text-white hover:text-green-400 transition-colors cursor-pointer">Home</ScrollLink>
                    <ScrollLink to="about" smooth={true} duration={500} className="text-white hover:text-green-400 transition-colors cursor-pointer">About</ScrollLink>
                    <ScrollLink to="features" smooth={true} duration={500} className="text-white hover:text-green-400 transition-colors cursor-pointer">Features</ScrollLink>
                    <ScrollLink to="howtoplay" smooth={true} duration={500} className="text-white hover:text-green-400 transition-colors cursor-pointer">How To Play</ScrollLink>
                        
                        <NavLink to="#faq">FAQ</NavLink>
                        <NavLink to="#contact">Contact</NavLink>
                        <button  onClick={handleStartGameClick} className="text-white text-start hover:text-green-400">
                            Play Now
                        </button>
                    </div>
                </div>
            </div>
        </nav>
        </>
        
    );
};

export default Navbar;
