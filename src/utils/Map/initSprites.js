import { Sprite} from './classes';

import {playerDownImage,playerLeftImage,playerRightImage,playerUpImage,backgroundImage,foregroundImage} from  "../../assets/images/Map"

export const initSprites = (canvas, offset) => {
    const background = new Sprite({
        position: offset,
        image: backgroundImage,
        width: 4096,
        height: 4096,
    });

    const player = new Sprite({
        position: {
            x: canvas.width / 2 - (192 / 4),  
            y: canvas.height / 2 - 68 / 2, 
        },
        image: playerDownImage,
        frames: {
            max: 4,
            hold: 15,
        },
        width: 192,
        height: 68,
        sprites: {
            up: playerUpImage,
            left: playerLeftImage,
            right: playerRightImage,
            down: playerDownImage,
        },
    });

    const foreground = new Sprite({
        position: {
            x: offset.x,
            y: offset.y,
        },
        image: foregroundImage, 
        width: 4096,
        height: 4096,
    });

    return { background, player, foreground };
};