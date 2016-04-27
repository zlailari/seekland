var coinImage;

var Coin = function (x, y) {
    this.x = x;
    this.y = y;

    this.size = 200;
    this.imgIndex = 0;
    this.maxIndex = 13;
}

function drawCoin(ctx, c) {
    ctx.drawImage(coinImage, c.imgIndex * c.size, 0, c.size, c.size,
         c.x, c.y, c.size, c.size);
}

function updateCoin(c) {
    c.imgIndex += 1;
    c.imgIndex = c.imgIndex % c.maxIndex;
}
