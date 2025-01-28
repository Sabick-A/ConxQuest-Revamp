import React from "react";
import HomeBtn from "./HomeBtn";
import InfoBtn from "./InfoBtn";
import ProgressBar from "./ProgressBar";
import logo2 from "../../assets/images/common/logo2.png";

function Navbar() {
  return (
    <>
      <div >
        <span className="absolute top-12 left-10 hidden md:block">
          <img src={logo2} className="h-10" alt="ConxQuest Logo" />
        </span>
        <ProgressBar progress={40} />
        <InfoBtn />
      </div>
    </>
  );
}

export default Navbar;
