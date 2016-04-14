

var Platform = function (x, y, width, height, color) {
    this.x = x;
    this.y = y;

    this.width = width;
    this.height = height;

    this.color = color || "black";

}

function drawPlatform(ctx, plat) {
    ctx.fillStyle = plat.color;

    ctx.fillRect(plat.x, plat.y, plat.width, plat.height);
}
