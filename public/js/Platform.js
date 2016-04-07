

var Platform = function (x, y, width, height) {
    this.x = x;
    this.y = y;

    this.width = width;
    this.height = height;

}

function drawPlatform(ctx, plat) {
    ctx.fillStyle = "black";

    ctx.fillRect(plat.x, plat.y, plat.width, plat.height);
}
