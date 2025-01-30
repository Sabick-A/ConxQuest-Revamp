import foregroundObjects from "./foregroundObjects.png";
import mapImage from "./map.png";
import playerDown from "./playerDown.png";
import playerLeft from "./playerLeft.png";
import playerRight from "./playerRight.png";
import playerUp from "./playerUp.png";

const backgroundImage = new Image();
backgroundImage.src = mapImage;
const foregroundImage = new Image();
foregroundImage.src = foregroundObjects;

const playerDownImage = new Image();
playerDownImage.src = playerDown;

const playerUpImage = new Image();
playerUpImage.src = playerUp;

const playerLeftImage = new Image();
playerLeftImage.src = playerLeft;

const playerRightImage = new Image();
playerRightImage.src = playerRight;


export {
    backgroundImage,
    foregroundImage,
    playerDownImage,
    playerUpImage,
    playerLeftImage,
    playerRightImage
};
