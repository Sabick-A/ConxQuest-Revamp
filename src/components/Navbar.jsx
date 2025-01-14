import React from "react";
import logo2 from "../public/logo2.png";
const Navbar = () => {
    return (
        <nav className="fixed top-0 w-full z-50 bg-transparent py-4">
            <div className="ml-14 my-5 px-2">
                <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-green-500">
                        <a href="/">
                            <img src={logo2} className="h-10" alt="" />
                        </a>
                    </div>

                    <div className="hidden md:flex md:space-x-6 lg:space-x-12 xl:space-x-24 font-bold font-main">
                        <a href="#" className="text-white hover:text-green-400">
                            About
                        </a>
                        <a href="#" className="text-white hover:text-green-400">
                            How to Play
                        </a>
                        <a href="#" className="text-white hover:text-green-400">
                            Features
                        </a>
                        <a href="#" className="text-white hover:text-green-400">
                            FAQ
                        </a>
                        <a href="#" className="text-white hover:text-green-400">
                            Contact
                        </a>
                    </div>

                    <div className="">
                        <button class="mr-10 relative cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[2px] bg-black rounded-[16px] bg-gradient-to-t from-[#2e5b19] to-[#4e8b2a] active:scale-95">
                            <span class="w-full h-full flex items-center gap-2 px-8 py-3 bg-[#3b7322] text-white rounded-[14px] bg-gradient-to-t from-[#2e5b19] to-[#5aa636]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    class="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                >
                                    <path d="M8 13V9m-2 2h4m5-2v.001M18 12v.001m4-.334v5.243a3.09 3.09 0 0 1-5.854 1.382L16 18a3.618 3.618 0 0 0-3.236-2h-1.528c-1.37 0-2.623.774-3.236 2l-.146.292A3.09 3.09 0 0 1 2 16.91v-5.243A6.667 6.667 0 0 1 8.667 5h6.666A6.667 6.667 0 0 1 22 11.667Z"></path>
                                </svg>
                                Start Game
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
