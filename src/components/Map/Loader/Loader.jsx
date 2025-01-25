import React from "react";
import "./Loader.css";

function Loader({ fadeOut }) {
    return (
        <div className={`loading-container z-20 ${fadeOut ? 'fade-out' : ''}`}>
            <h1 className="text-3xl font-main">Building The World</h1>
            <div className="tree mt-10">
                <div className="branch" style={{ "--x": "0" }}>
                    <span style={{ "--i": "0" }}></span>
                    <span style={{ "--i": "1" }}></span>
                    <span style={{ "--i": "2" }}></span>
                    <span style={{ "--i": "3" }}></span>
                </div>
                <div className="branch" style={{ "--x": "1" }}>
                    <span style={{ "--i": "0" }}></span>
                    <span style={{ "--i": "1" }}></span>
                    <span style={{ "--i": "2" }}></span>
                    <span style={{ "--i": "3" }}></span>
                </div>
                <div className="branch" style={{ "--x": "2" }}>
                    <span style={{ "--i": "0" }}></span>
                    <span style={{ "--i": "1" }}></span>
                    <span style={{ "--i": "2" }}></span>
                    <span style={{ "--i": "3" }}></span>
                </div>
                <div className="branch" style={{ "--x": "3" }}>
                    <span style={{ "--i": "0" }}></span>
                    <span style={{ "--i": "1" }}></span>
                    <span style={{ "--i": "2" }}></span>
                    <span style={{ "--i": "3" }}></span>
                </div>
                <div className="stem">
                    <span style={{ "--i": "0" }}></span>
                    <span style={{ "--i": "1" }}></span>
                    <span style={{ "--i": "2" }}></span>
                    <span style={{ "--i": "3" }}></span>
                </div>
                <span className="shadow"></span>
            </div>
            <h1 className="font-game text-sm">Loading...</h1>
        </div>
    );
}

export default Loader;
