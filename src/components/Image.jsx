import React from "react";
import entryImage from "../public/Home/entryImage.jpg";
function Image() {
    return (
        <div
            className="min-h-screen w-full flex justify-center items-center"
            style={{
                backgroundImage: `url(${entryImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
        </div>
    );
}

export default Image;
