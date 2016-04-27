var coinImage;

var Coin = function (x, y) {
    this.x = x;
    this.y = y;

    this.size = 150;
    this.imgIndex = 0
}

function drawCoin(ctx, c) {
    ctx.drawImage(coinImage, c.imgIndex * c.size, 0, c.size, c.size,
         c.x, c.y, c.size, c.size);
    ctx.drawImage(coinImage, c.x, c.y, c.size, c.size);
}
