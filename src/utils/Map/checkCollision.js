const softedge = {
    x: 25,
    y: 25,
};
export function checkCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle1.width >=
            rectangle2.position.x + softedge.x &&
        rectangle1.position.x <=
            rectangle2.position.x + rectangle2.width - softedge.x &&
        rectangle1.position.y <=
            rectangle2.position.y + rectangle2.height - softedge.y &&
        rectangle1.position.y + rectangle1.height >=
            rectangle2.position.y + softedge.y
    );
}