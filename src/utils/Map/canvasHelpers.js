// canvasHelpers.js
import { checkCollision } from "./"; 
import {
    playerDownImage,
    playerUpImage,
    playerLeftImage,
    playerRightImage,
} from "../../assets/images/Map";


const speed = 3;
// Directions configuration
const directions = {
    w: {
        axis: "y",
        delta: speed,
        image: playerUpImage,
        offset: { x: 0, y: speed },
    },
    a: {
        axis: "x",
        delta: speed,
        image: playerLeftImage,
        offset: { x: speed, y: 0 },
    },
    s: {
        axis: "y",
        delta: -speed,
        image: playerDownImage,
        offset: { x: 0, y: -speed },
    },
    d: {
        axis: "x",
        delta: -speed,
        image: playerRightImage,
        offset: { x: -speed, y: 0 },
    },
};

 const drawElements = (context, elements) => {
    elements.forEach((element) => element.draw(context));
};

 const checkTeleportation = (context, player, teleports, keys) => {
    let teleportActivated = false;
    teleports.forEach((pad) => {
        if (
            checkCollision({ rectangle1: player, rectangle2: pad }) &&
            keys.x.pressed
        ) {
            console.log("teleportation activated");
            teleportActivated = true;
            if (pad.val == 1) {
                console.log("redirecting to cardGame");
                location.href = '/cardgame';
            } else if (pad.val == 2) {
                console.log("redirecting to quizGame");
                location.href = '/quizgame';
            } else if(pad.val==3){
                console.log("redirecting to situation game");
                location.href= '/situationgame';
            } else if(pad.val==4){
                console.log("redirecting to drag'n'drop game");
                location.href= '/matchup';
            } else if(pad.val==5){
                console.log("redirecting to spin wheel");
                location.href= '/spin';
            }
            else {
                console.log("X key is not pressed")
            }
        }
    });
    return teleportActivated;
};

const checkInteraction = (context, player, interacts, keys) => {
    let interactionActivated = false;
    interacts.forEach((inter) => {
        if (
            checkCollision({ rectangle1: player, rectangle2: inter }) &&
            keys.x.pressed
        ) {
            console.log("interaction activated");
            interactionActivated = true;
            if (inter.val == 1) {
                console.log("redirecting to cardGame");
                location.href = '/cardgame';
            } else if (inter.val == 2) {
                const botpress = window.botpress;
                // Pause the game state before opening bot
                if (window.onBotOpen) {
                    window.onBotOpen();
                }
                botpress.open();
            } else if(inter.val==3){
                console.log("redirecting to situation game");
                location.href= '/situationgame';
            }
        }
    });
    return interactionActivated;
};


export function checkXButtonStatus(player,teleports,interacts){
    const inTeleportZone = teleports.some(pad => checkCollision({ rectangle1: player, rectangle2: pad }));
    const inInteractZone = interacts.some(pad => checkCollision({ rectangle1: player, rectangle2: pad }));
    return (inTeleportZone || inInteractZone)
}


 const updatePlayerMovement = (
    keys,
    lastKey,
    boundaries,
    player,
    movables
) => {
    player.moving = false;
    if (keys[lastKey]?.pressed) {
        player.moving = true;
        const { axis, delta, image, offset } = directions[lastKey];
        player.image = image;
        player.moving = true; // Set moving state to true
        const moving = !boundaries.some((boundary) =>
            checkCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x + offset.x,
                        y: boundary.position.y + offset.y,
                    },
                },
            })
        );

        if (moving) {
            movables.forEach((movable) => {
                movable.position[axis] += delta;
            });
        }
    }
};

export const updateGameLogic = (
    context,
    player,
    background,
    foreground,
    boundaries,
    teleports,
    interacts,
    keys,
    lastKey,
    movables
) => {
    drawElements(context, [background,player,foreground]); // add foreground here
    const teleportActivated = checkTeleportation(
        context,
        player,
        teleports,
        keys
    );
    
    const interactionActivated= checkInteraction(
        context,
        player,
        interacts,
        keys
    );
    updatePlayerMovement(keys, lastKey, boundaries, player, movables);
    return teleportActivated || interactionActivated;
};
