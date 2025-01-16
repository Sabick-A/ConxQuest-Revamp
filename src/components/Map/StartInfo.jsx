import React from "react";

function StartInfo() {
    return (
        <div id="start" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center border leading-loose border-black bg-whitesmoke py-16 w-1/2 text-xl leading- tracking-widest font-bold rounded-3xl opacity-70 transition-opacity duration-700 ease-out font-game">
            <p className="my-2"><span className="border border-black bg-gray-800 p-2 text-white rounded-xl">W A S D</span>for Movement</p>
            <p className="my-2 mt-10">Press <span className="border border-black bg-gray-800 p-2 text-white rounded-xl">X</span> to Interact</p>
            <p className="my-2 mt-5">Press <span className="border border-black bg-gray-800 p-2 text-white rounded-xl">H</span> to Go Home</p>
            <p className="my-2 mt-10">Press Any Button To Start</p>
        </div>
    );
}

export default StartInfo;