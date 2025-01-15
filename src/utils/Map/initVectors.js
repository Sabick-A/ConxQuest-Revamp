import { Boundary } from "./classes";
import { collisions, teleport,interact } from "../../assets/data/Map";
export const initiVectors = (offset) => {
    // collision vector
    const collisionMap = []; //2d array representing the grid
    for (let i = 0; i < collisions.length; i += 70) {
        collisionMap.push(collisions.slice(i, i + 70));
    }

    // creating a arr with all the boundary positions with height and width
    const boundaries = [];
    collisionMap.forEach((row, i) => {
        row.forEach((column, j) => {
            if (column != 0) {
                boundaries.push(
                    new Boundary({
                        position: {
                            x: j * Boundary.width + offset.x,
                            y: i * Boundary.height + offset.y,
                        },
                    })
                );
            }
        });
    });

    const teleportMap = [];
    for (let i = 0; i < teleport.length; i += 70) {
        teleportMap.push(teleport.slice(i, i + 70));
    }
    const teleports = [];
    teleportMap.forEach((row, i) => {
        row.forEach((column, j) => {
            if (column != 0) {
                teleports.push(
                    new Boundary(
                        {
                            position: {
                                x: j * Boundary.width + offset.x,
                                y: i * Boundary.height + offset.y,
                            },
                        },
                        column
                    )
                );
            }
        });
    });

    const interactMap = [];
    for (let i = 0; i < interact.length; i += 70) {
        interactMap.push(interact.slice(i, i + 70));
    }
    const interacts = [];
    interactMap.forEach((row, i) => {
        row.forEach((column, j) => {
            if (column != 0) {
                interacts.push(
                    new Boundary(
                        {
                            position: {
                                x: j * Boundary.width + offset.x,
                                y: i * Boundary.height + offset.y,
                            },
                        },
                        column
                    )
                );
            }
        });
    });

    return { teleports, boundaries,interacts };
};
