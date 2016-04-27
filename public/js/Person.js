
// Migrate to use World.js instead
var worldX = 1000;
var worldY = 400;

var maxXDir = 5;
var maxYDir = 10;

var fallThroughBuffer = 15;

var pupsPic;
var spriteImage;

var Person = function () {
    this.x = 200;
    this.y = 200;

    this.xDir = 0;
    this.yDir = 0;

    this.size = 150;
    this.width = 76;
    this.height = 150;

    this.left = false;
    this.right = false;
    this.up = false;

    this.jump = false;
    this.jumpHeight = -50;
    this.onGround = false;

    this.grav = 2;

    this.currentRunImage = 0;

    this.facingRight = true;

    this.score = 0;
}

function drawPerson(ctx, p) {
    if (p.facingRight) {
        if (p.jump) {
            if (p.yDir > 0) {
                // Falling
                ctx.drawImage(spriteImage, p.width * 6, 0, p.width, p.height,
                    p.x, p.y, p.width, p.height);
            } else {
                // Jumping
                ctx.drawImage(spriteImage, p.width * 5, 0, p.width, p.height,
                    p.x, p.y, p.width, p.height);
            }
        } else if (p.xDir == 0) {
            ctx.drawImage(spriteImage, 0, 0, p.width, p.height,
                p.x, p.y, p.width, p.height);
        } else {
            // Running
            ctx.drawImage(spriteImage, p.width * p.currentRunImage, 0, p.width, p.height,
                p.x, p.y, p.width, p.height);
        }
    } else {
        if (p.jump) {
            if (p.yDir > 0) {
                // Falling
                ctx.drawImage(spriteImage, p.width * 6, 170, p.width, p.height,
                    p.x, p.y, p.width, p.height);
            } else {
                // Jumping
                ctx.drawImage(spriteImage, p.width * 5, 170, p.width, p.height,
                    p.x, p.y, p.width, p.height);
            }
        } else if (p.xDir == 0) {
            ctx.drawImage(spriteImage, 0, 170, p.width, p.height,
                p.x, p.y, p.width, p.height);
        } else {
            // Running
            ctx.drawImage(spriteImage, p.width * p.currentRunImage, 170, p.width, p.height,
                p.x, p.y, p.width, p.height);
        }
    }
};

function updatePerson(p, world) {
    // Running into coin
    for (var c in world.allCoins) {
        if (p.x + p.width > world.allCoins[c].x &&
            p.x < world.allCoins[c].x + world.allCoins[c].size &&
            p.y + p.height > world.allCoins[c].y &&
            p.y < world.allCoins[c].y + world.allCoins[c].size) {
            p.score++;
            world.allCoins = [generateRandomCoin(world)];
        }
    }

    // Player input movement
    if (p.left && p.xDir >= -maxXDir) {
        p.xDir -= 2;
    }
    if (p.right && p.xDir <= maxXDir) {
        p.xDir += 2;
    }

    if (p.yDir > maxYDir) {
        p.yDir = maxYDir;
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

    if (p.y + p.size >= world.height) {
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
        if (p.y + p.height >= world.platforms[i].y &&
             p.y + p.height < world.platforms[i].y + fallThroughBuffer &&
             p.x + p.width > world.platforms[i].x &&
             p.x < world.platforms[i].x + world.platforms[i].width &&
             p.yDir > 0) {
            p.yDir = 0;
            p.y = world.platforms[i].y - p.height;
            p.jump = false;
            p.onGround = true;
        }
    }

    // Ground and up overrides
    if (p.up && !p.jump) {
        p.yDir += p.jumpHeight;
        p.jump = true;
        p.onGround = false;
    }

    if (p.xDir > 0) {
        p.xDir--;
        p.facingRight = true;
        p.currentRunImage++;
        if (p.currentRunImage > 4) {
            p.currentRunImage = 1;
        }
    }
    if (p.xDir < 0) {
        p.xDir++;
        p.facingRight = false;
        p.currentRunImage++;
        if (p.currentRunImage > 4) {
            p.currentRunImage = 1;
        }
    }

    p.y += p.yDir;
    p.x += p.xDir;
}
