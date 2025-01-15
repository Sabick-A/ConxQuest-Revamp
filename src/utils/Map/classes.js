class Sprite {
    constructor({ position, image, width, height, frames = { max: 1, hold: 2 } }) {
        this.position = position;
        this.image = image;
        this.frames = { ...frames, val: 0, elapsed: 0 };
        this.width = width / this.frames.max;
        this.height = height;
        this.moving = false;
    }

    draw(c) {
        c.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );

        if (!this.moving) return;

        if (this.frames.max > 1) {
            this.frames.elapsed++;
        }

        if (this.frames.elapsed % this.frames.hold === 0) {
            this.frames.val = (this.frames.val + 1) % this.frames.max; // Cycles through frames
        }
    }
}

class Boundary {
    static width = 48;
    static height = 48;

    constructor({ position },val) {
        this.position = position;
        this.width = Boundary.width;
        this.height = Boundary.height;
        this.val = val
    }

    draw(c) {
        c.fillStyle = "rgba(255, 0, 0, 0.08)";
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

export { Sprite, Boundary };
