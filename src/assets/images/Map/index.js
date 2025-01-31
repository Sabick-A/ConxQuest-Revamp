import foregroundObjects from "./foregroundObjects.png";
import mapImage from "./map.png";
import playerDown from "./playerDown.png";
import playerLeft from "./playerLeft.png";
import playerRight from "./playerRight.png";
import playerUp from "./playerUp.png";
import genie from "./genie.png";
import npc from "./npc.png"
import resource from "./resource.png"
import preambleTitle from "./preamble_title.png";
import fundamentalRightsTitle from "./fundamental_rights_title.png";
import fundamentalDutiesTitle from "./fundamental_duties_title.png";
import dspTitle from "./DSP_title.png";
import boy1 from "./Boy1.svg";
import boy2 from "./Boy2.svg";
import boy3 from "./Boy3.svg";
import police from "./police.png";

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

// Knowledge Book Images
const preambleTitleImage = new Image();
preambleTitleImage.src = preambleTitle;

const fundamentalRightsTitleImage = new Image();
fundamentalRightsTitleImage.src = fundamentalRightsTitle;

const fundamentalDutiesTitleImage = new Image();
fundamentalDutiesTitleImage.src = fundamentalDutiesTitle;

const dspTitleImage = new Image();
dspTitleImage.src = dspTitle;

const boy1Image = new Image();
boy1Image.src = boy1;

const boy2Image = new Image();
boy2Image.src = boy2;

const boy3Image = new Image();
boy3Image.src = boy3;

const policeImage = new Image();
policeImage.src = police;

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
    preambleTitleImage,
    fundamentalRightsTitleImage,
    fundamentalDutiesTitleImage,
    dspTitleImage,
    boy1Image,
    boy2Image,
    boy3Image,
    policeImage,
};
