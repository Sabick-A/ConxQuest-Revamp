import foregroundObjects from "./foregroundObjects.png";
import mapImage from "./map.png";
import playerDown from "./playerDown.png";
import playerLeft from "./playerLeft.png";
import playerRight from "./playerRight.png";
import playerUp from "./playerUp.png";
import genie from "./genie.png";
import npc from "./npc.png"
import resource from "./resource.png"
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

const genieImage = new Image();
genieImage.src = genie;

const npcImage=new Image();
npcImage.src=npc;

const resourceImage=new Image();
resourceImage.src=resource;

export {
    backgroundImage,
    foregroundImage,
    playerDownImage,
    playerUpImage,
    playerLeftImage,
    playerRightImage,
    genieImage,
    npcImage,
    resourceImage,
};
