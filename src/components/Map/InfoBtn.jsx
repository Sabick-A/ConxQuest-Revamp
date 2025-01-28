import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function InfoBtn() {
  return (
    <Link to="/" className="absolute top-12 right-10 hidden md:block">
      <button className="group font-game text-[9px] opacity-70 hover:opacity-90 relative bg-whitesmoke hover:bg-blue-50 border-2 border-gray-900 rounded-lg px-4 py-2.5 font-medium transition-all duration-150 ease-[cubic-bezier(0.34,1.56,0.64,1)]  active:translate-y-1 active:shadow-none focus:outline-none focus:ring-4 focus:ring-gray-300 inline-flex items-center gap-2">
        Press
        <span className="border-2 border-gray-900 text-[9px] bg-white rounded-[4px] px-2.5 py-1 font-bold shadow-[0_3px_0_rgba(0,0,0,0.9)] group-hover:shadow-[0_4px_0_rgba(0,0,0,0.9)] group-active:shadow-[0_1px_0_rgba(0,0,0,0.9)] transition-all duration-150">
          M
        </span>
        for Menu
      </button>
    </Link>
  );
}

export default InfoBtn;
