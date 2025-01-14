import React from "react";
import backgroundImage from "../public/Home/image.jpg";
import logo from "../public/logo.png";
import Button from "./Button";

function Hero() {
    return (
        <div
            className="min-h-screen w-full flex justify-center items-center"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 flex flex-col items-center -translate-y-1/2 z-10">
                <img src={logo} alt="Logo" className="animate-bounce mb-5" />
                <Button/>
            </div>
        </div>
    );
}

export default Hero;
