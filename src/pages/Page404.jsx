import React, { useState, useEffect } from "react";
import Navbar from "../components/Home/Navbar";
import Image from "../assets/images/common/page404.webp";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const BackgroundContainer = styled.div`
    min-height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: start;
    padding-top: 16rem;
    background-image: url(${props => props.image});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: ${props => props.loaded ? 1 : 0};
    transition: opacity 0.5s ease-in-out;
    position: relative;
`;

function Page404() {
    const [imageLoaded, setImageLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loadImage = async () => {
            try {
                await new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = Image;
                    img.onload = resolve;
                    img.onerror = reject;
                });
                setImageLoaded(true);
            } catch (error) {
                console.error('Error loading image:', error);
                // Still show the content even if image loading fails
                setImageLoaded(true);
            }
        };

        loadImage();
    }, []);

    return (
        <>
            <Navbar />
            <BackgroundContainer image={Image} loaded={imageLoaded}>
                {/* Text Container */}
                <div className={`w-1/2 mx-auto animate-bounce bg-white bg-opacity-70 text-black shadow-xl shadow-slate-900 rounded-lg px-10 py-12 text-center max-w-max transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
                    <p className="font-bold text-sm mb-4 font-game">
                        "It seems you've stumbled upon a lost island... Don't
                        worry, your way back home is just a click away!"
                    </p>
                    {/* Back to Home Button */}
                    <button
                        onClick={() => navigate('/')}
                        style={{
                            WebkitBoxReflect:
                                "below 0px linear-gradient(to bottom, rgba(0,0,0,0.0), rgba(0,0,0,0.4))",
                        }}
                        className="px-10 py-3 bg-gradient-to-r from-[#2e5b19] to-[#4e8b2a] rounded-full shadow-md group-hover:shadow-2xl group-hover:shadow-[#4e8b2a] shadow-[#2e5b19] uppercase font-serif tracking-widest relative overflow-hidden group text-transparent cursor-pointer z-10 after:absolute after:rounded-full after:bg-[#3b7322] after:h-[85%] after:w-[95%] after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 hover:saturate-[1.15] active:saturate-[1.4]"
                    >
                        Button
                        <p className="absolute z-40 font-semibold bg-gradient-to-r from-[#94e66e] to-[#346419] bg-clip-text text-transparent top-1/2 left-1/2 -translate-x-1/2 group-hover:-translate-y-full h-full w-full transition-all duration-300 -translate-y-[30%] tracking-widest">
                            Go
                        </p>
                        <p className="absolute z-40 top-1/2 left-1/2 bg-gradient-to-r from-[#1d3d12] to-[#2e5b19] bg-clip-text text-transparent -translate-x-1/2 translate-y-full h-full w-full transition-all duration-300 group-hover:-translate-y-[40%] tracking-widest font-extrabold">
                            Home
                        </p>
                        <svg
                            className="absolute w-full h-full scale-x-125 rotate-180 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 group-hover:animate-none animate-pulse group-hover:-translate-y-[45%] transition-all duration-300"
                            viewBox="0 0 2400 800"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs>
                                <linearGradient
                                    id="green-gradient"
                                    y2="100%"
                                    x2="50%"
                                    y1="0%"
                                    x1="50%"
                                >
                                    <stop
                                        offset="0%"
                                        stopOpacity={1}
                                        stopColor="#4e8b2a"
                                    />
                                    <stop
                                        offset="100%"
                                        stopOpacity={1}
                                        stopColor="#2e5b19"
                                    />
                                </linearGradient>
                            </defs>
                            <g fill="url(#green-gradient)">
                                <path
                                    opacity="0.05"
                                    transform="matrix(1,0,0,1,0,35)"
                                    d="M 0 305.9828838196134 Q 227.6031525693441 450 600 302.17553022897005 Q 1010.7738828515054 450 1200 343.3024459932802 Q 1379.4406250195766 450 1800 320.38902780838214 Q 2153.573162029817 450 2400 314.38564046970816 L 2400 800 L 0 800 L 0 340.3112176762882 Z"
                                />
                                <path
                                    opacity="0.21"
                                    transform="matrix(1,0,0,1,0,70)"
                                    d="M 0 305.9828838196134 Q 227.6031525693441 450 600 302.17553022897005 Q 1010.7738828515054 450 1200 343.3024459932802 Q 1379.4406250195766 450 1800 320.38902780838214 Q 2153.573162029817 450 2400 314.38564046970816 L 2400 800 L 0 800 L 0 340.3112176762882 Z"
                                />
                                <path
                                    opacity="0.37"
                                    transform="matrix(1,0,0,1,0,105)"
                                    d="M 0 305.9828838196134 Q 227.6031525693441 450 600 302.17553022897005 Q 1010.7738828515054 450 1200 343.3024459932802 Q 1379.4406250195766 450 1800 320.38902780838214 Q 2153.573162029817 450 2400 314.38564046970816 L 2400 800 L 0 800 L 0 340.3112176762882 Z"
                                />
                            </g>
                        </svg>
                        <svg
                            className="absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-[30%] group-hover:-translate-y-[33%] group-hover:scale-95 transition-all duration-500 z-40 fill-[#4e8b2a]"
                            viewBox="0 0 1440 320"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M0,288L9.2,250.7C18.5,213,37,139,55,133.3C73.8,128,92,192,111,224C129.2,256,148,256,166,256C184.6,256,203,256,222,250.7C240,245,258,235,277,213.3C295.4,192,314,160,332,170.7C350.8,181,369,235,388,229.3C406.2,224,425,160,443,122.7C461.5,85,480,75,498,74.7C516.9,75,535,85,554,101.3C572.3,117,591,139,609,170.7C627.7,203,646,245,665,256C683.1,267,702,245,720,245.3C738.5,245,757,267,775,266.7C793.8,267,812,245,831,234.7C849.2,224,868,224,886,218.7C904.6,213,923,203,942,170.7C960,139,978,85,997,53.3C1015.4,21,1034,11,1052,48C1070.8,85,1089,171,1108,197.3C1126.2,224,1145,192,1163,197.3C1181.5,203,1200,245,1218,224C1236.9,203,1255,117,1274,106.7C1292.3,96,1311,160,1329,170.7C1347.7,181,1366,139,1385,128C1403.1,117,1422,139,1431,149.3L1440,160L1440,320L1430.8,320C1421.5,320,1403,320,1385,320C1366.2,320,1348,320,1329,320C1310.8,320,1292,320,1274,320C1255.4,320,1237,320,1218,320C1200,320,1182,320,1163,320C1144.6,320,1126,320,1108,320C1089.2,320,1071,320,1052,320C1033.8,320,1015,320,997,320C978.5,320,960,320,942,320C923.1,320,905,320,886,320C867.7,320,849,320,831,320C812.3,320,794,320,775,320C756.9,320,738,320,720,320C701.5,320,683,320,665,320C646.2,320,628,320,609,320C590.8,320,572,320,554,320C535.4,320,517,320,498,320C480,320,462,320,443,320C424.6,320,406,320,388,320C369.2,320,351,320,332,320C313.8,320,295,320,277,320C258.5,320,240,320,222,320C203.1,320,185,320,166,320C147.7,320,129,320,111,320C92.3,320,74,320,55,320C36.9,320,18,320,9,320L0,320Z"
                                fillOpacity={1}
                            />
                        </svg>
                    </button>
                </div>
            </BackgroundContainer>
        </>
    );
}

export default Page404;
