
// Migrate to use World.js instead
var worldX = 1000;
var worldY = 400;

var maxXDir = 5;
var maxYDir = 10;

var Person = function () {
    this.x = 200;
    this.y = 200;

    this.xDir = 0;
    this.yDir = 0;

    this.size = 60;

    this.left = false;
    this.right = false;
    this.up = false;

    this.jump = false;
    this.jumpHeight = -50;
    this.onGround = false;

    this.grav = 2;
}

function drawPerson(ctx, p) {
    ctx.fillStyle = "black";
    ctx.fillRect(p.x, p.y, p.size, p.size);
};

function updatePerson(p, world) {
    // Player input movement
    if (p.left && p.xDir >= -maxXDir) {
        p.xDir -= 2;
    }
    if (p.right && p.xDir <= maxXDir) {
        p.xDir += 2;
    }

    // World Contraints
    if (p.x >= (world.width - p.size) && p.xDir > 0) {
        p.xDir = 0;
        p.x = world.width - p.size;
    }
    if (p.x <= 0 && p.xDir < 0) {
        p.xDir = 0;
        p.x = 0;
    }

    if (p.y >= (world.height - p.size) && !p.onGround) {
        p.yDir = 0;
        p.y = world.height - p.size;
        p.jump = false;
        p.onGround = true;
    }

    if (p.y < (world.height - p.size)) {
        p.yDir += p.grav;
    }

    // Platforms
    for (var i = 0; i < world.platforms.length; i++) {
        if (p.y > world.platforms[i].y &&
             p.y < world.platforms[i].y + world.platforms[i].height &&
             p.x > world.platforms[i].x &&
             p.x < world.platforms[i].x + world.platforms[i].width) {
            p.yDir = 0;
            p.y = world.platforms[i].y - p.size;
            p.jump = false;
            p.onGround = true;
        }
    }

    // Ground and up overrides
    if (p.up && !p.jump) {
        console.log('jump');
        p.yDir += p.jumpHeight;
        p.jump = true;
        p.onGround = false;
    }

    console.log(JSON.stringify(p));
    if (p.xDir > 0) { p.xDir--; }
    if (p.xDir < 0) { p.xDir++; }

    p.y += p.yDir;
    p.x += p.xDir;
}
