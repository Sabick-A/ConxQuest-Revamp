import React, { useState, useEffect, useMemo } from "react";
import logo2 from "../../assets/images/common/logo2.png";
import { Link, useNavigate } from "react-router-dom";
import {Link as ScrollLink} from 'react-scroll'
import Alert from "../common/Alert";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 20;
            if (scrolled !== isScrolled) {
                setIsScrolled(scrolled);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isScrolled]);

    const handleStartGameClick = async () => {
        await new Promise((resolve) => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            setTimeout(resolve, 500);
        });

        if(window.innerWidth<=768){
            setIsMenuOpen(false);
            setAlertVisible(true);
        }else{
            navigate("/map");
        }
    }

    const scrollLinkProps = useMemo(() => ({
        spy: true,
        smooth: true,
        duration: 500,
        className: "text-white hover:text-green-400 transition-colors cursor-pointer relative group",
        activeClass: "text-green-400"
    }), []);

    const navLinks = useMemo(() => [
        { to: "home", label: "Home" },
        { to: "about", label: "About" },
        { to: "features", label: "Features" },
        { to: "howtoplay", label: "How To Play" },
        { to: "faq", label: "FAQ" },
        { to: "contact", label: "Contact" }
    ], []);

    return (
        <>
            {alertVisible && <Alert setVisible={setAlertVisible}/>}
            <nav 
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                    isScrolled ? 'bg-[rgba(5,46,22,0.65)] backdrop-blur-[8px] shadow-lg py-2' : 'bg-transparent py-4'
                }`} 
                role="navigation" 
                aria-label="Main navigation"
            >
            <div className="ml-14 my-5 px-2">
                <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-green-500 transition-transform hover:scale-105 duration-300">
                        <Link to="/" aria-label="Home">
                            <img src={logo2} className="h-10" alt="ConxQuest Logo" />
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button 
                        className="xl:hidden p-2 text-white hover:text-green-400 transition-colors"
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
                    <div className="hidden xl:flex xl:space-x-16 2xl:space-x-28 font-bold font-main">
                        {navLinks.map(({ to, label }) => (
                            <ScrollLink key={to} to={to} {...scrollLinkProps}>
                                {label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"/>
                            </ScrollLink>
                        ))}
                    </div>

                    {/* Play button */}
                    <div className="hidden xl:block">
                        <button 
                            className="mr-10 relative cursor-pointer group overflow-hidden p-[2px] bg-black rounded-[16px] bg-gradient-to-t from-[#2e5b19] to-[#4e8b2a] active:scale-95 transition-transform duration-200"
                            aria-label="Start playing"
                            onClick={handleStartGameClick}
                        >
                            <span className="absolute inset-[-2px] bg-gradient-to-r from-transparent via-green-400/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"/>
                            <span className="relative w-full h-full flex items-center gap-2 px-8 py-3 bg-[#3b7322] text-white rounded-[14px] bg-gradient-to-t from-[#2e5b19] to-[#5aa636]">
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
                    className={`xl:hidden fixed left-0 right-0 transition-all duration-300 ease-in-out ${
                        isMenuOpen 
                            ? 'opacity-100 translate-y-0 pointer-events-auto' 
                            : 'opacity-0 -translate-y-4 pointer-events-none'
                    } mt-4 mx-4`}
                    style={{ top: "calc(100% - 1rem)" }}
                >
                    <div className="bg-[rgba(0,0,0,0.85)] backdrop-blur-md rounded-lg p-4">
                        <div className="flex flex-col space-y-4 font-bold font-main">
                            {navLinks.map(({ to, label }) => (
                                <ScrollLink 
                                    key={to} 
                                    to={to} 
                                    {...scrollLinkProps}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {label}
                                </ScrollLink>
                            ))}
                            <button 
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    handleStartGameClick();
                                }} 
                                className="text-white text-start hover:text-green-400 transition-colors"
                            >
                                Play Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        </>
    );
};

export default Navbar;
