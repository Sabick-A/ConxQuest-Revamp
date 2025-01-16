import React from "react";
import styled from "styled-components";
import { House } from "lucide-react";
import { Link } from "react-router-dom";

const HomeBtnWrapper = styled.div`
    button {
        display: flex;
        height: 3em;
        width: 100px;
        align-items: center;
        justify-content: center;
        background-color: #eeeeee4b;
        border-radius: 10px;
        letter-spacing: 1px;
        padding:5px;
        transition: all 0.2s linear;
        cursor: pointer;
        border: solid 1px  black;
        background: #fff;
    }

    button > svg {
        margin-right: 5px;
        margin-left: 5px;
        font-size: 20px;
        transition: all 0.4s ease-in;
    }

    button:hover > svg {
        font-size: 1.2em;
        transform: translateX(-5px);
    }

    button:hover {
        box-shadow: 6px 6px 25px #d1d1d1, -6px -6px 25px #ffffff;
        transform: translateY(-2px);
    }
`;

function HomeBtn() {
    return (
        <Link to="/" className="absolute top-10 left-5">
            <HomeBtnWrapper>
                <button>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 107.27"><path d="M22.48 0h77.92c6.15 0 11.75 2.53 15.82 6.6 4.11 4.11 6.67 9.8 6.67 16.06v61.96c0 6.26-2.55 11.94-6.67 16.06-4.07 4.07-9.67 6.6-15.82 6.6H22.48c-6.15 0-11.75-2.53-15.82-6.6C2.55 96.56 0 90.88 0 84.62V22.65C0 16.39 2.55 10.7 6.66 6.59 10.73 2.53 16.33 0 22.48 0zm20.86 28.62h11.68v13.21h12.79V28.62h11.73v37.84H67.81V51.13H55.02v15.33H43.34V28.62zm-38.8 47.6c.79 3.18 2.34 6.02 4.44 8.29 3.09 3.33 7.35 5.4 12.05 5.4h80.83c.19 0 .38 0 .57-.01l1.15-.08c4.01-.44 7.62-2.39 10.33-5.31 2.1-2.26 3.65-5.1 4.44-8.28V22.65c0-4.85-2-9.28-5.21-12.49a17.95 17.95 0 00-12.73-5.28H22.48c-4.97 0-9.48 2.02-12.73 5.28-3.22 3.22-5.21 7.64-5.21 12.49v53.57z"/></svg>
                    <span className="font-bold">Home</span>
                </button>
            </HomeBtnWrapper>
        </Link>
    );
}

export default HomeBtn;
