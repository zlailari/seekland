
var Person = function () {
    this.x = 200;
    this.y = 200;

    this.xDir = 0;
    this.yDir = 0;

    this.size = 60;

    this.left = false;
    this.right = false;
    this.up = false;
}

function drawPerson(ctx, p) {
    ctx.fillRect(p.x, p.y, p.size, p.size);
};

function updatePerson(p) {
    if (p.left) {
        p.x -= 2;
    }
    if (p.right) {
        p.x += 2;
    }
    if (p.up) {
        p.y -= 1;
    }
}
