// canvasHelpers.js
import { checkCollision } from "./"; 
import {
    playerDownImage,
    playerUpImage,
    playerLeftImage,
    playerRightImage,
} from "../../assets/images/Map";

// Base speed in pixels per second
const BASE_SPEED = 300; // Adjusted from 3 to 180 pixels per second

// Directions configuration
const directions = {
    w: {
        axis: "y",
        delta: 1,
        image: playerUpImage,
        offset: { x: 0, y: 1 },
    },
    a: {
        axis: "x",
        delta: 1,
        image: playerLeftImage,
        offset: { x: 1, y: 0 },
    },
    s: {
        axis: "y",
        delta: -1,
        image: playerDownImage,
        offset: { x: 0, y: -1 },
    },
    d: {
        axis: "x",
        delta: -1,
        image: playerRightImage,
        offset: { x: -1, y: 0 },
    },
};

export const drawElements = (context, elements) => {
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
            interactionActivated = true;
            console.log('Interaction detected:', inter.val);
            
            if (inter.val == 1) {
                window.dispatchEvent(new CustomEvent('openKnowledgeBook'));
            } else if (inter.val == 2) {
                const botpress = window.botpress;
                botpress.open();
            } else if (inter.val >= 5 && inter.val <= 20) {
                // NPC dialog interactions (IDs 5-20 reserved for NPCs)
                const npcId = inter.val - 4; // Convert 5 to 1, 6 to 2, etc.
                console.log('Triggering dialog for NPC:', npcId);
                window.dispatchEvent(new CustomEvent('openDialog', { 
                    detail: { npcId } 
                }));
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
    movables,
    deltaTime = 1/60 // Default to 60 FPS if not provided
) => {
    player.moving = false;
    if (!lastKey || !directions[lastKey]) return;
    
    if (keys[lastKey]?.pressed) {
        player.moving = true;
        const direction = directions[lastKey];
        player.image = direction.image;
        
        // Calculate frame-rate independent speed
        const currentSpeed = BASE_SPEED * deltaTime;
        
        const moving = !boundaries.some((boundary) =>
            checkCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x + direction.offset.x * currentSpeed,
                        y: boundary.position.y + direction.offset.y * currentSpeed,
                    },
                },
            })
        );

        if (moving) {
            movables.forEach((movable) => {
                movable.position[direction.axis] += direction.delta * currentSpeed;
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
    movables,
    deltaTime
) => {
    drawElements(context, [background,player,foreground]);
    const teleportActivated = checkTeleportation(
        context,
        player,
        teleports,
        keys
    );
    
    checkInteraction(
        context,
        player,
        interacts,
        keys
    );
    updatePlayerMovement(keys, lastKey, boundaries, player, movables, deltaTime);
    return teleportActivated;
};
