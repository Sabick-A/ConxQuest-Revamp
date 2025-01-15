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
        transition: all 0.2s linear;
        cursor: pointer;
        border: none;
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
                    <House strokeWidth={1.1} />
                    <span>Home</span>
                </button>
            </HomeBtnWrapper>
        </Link>
    );
}

export default HomeBtn;
