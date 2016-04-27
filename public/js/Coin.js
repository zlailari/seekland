var coinImage;

var Coin = function (x, y) {
    this.x = x;
    this.y = y;

    this.size = 150;
}

function drawCoin(ctx, c) {
    ctx.drawImage(coinImage, c.x, c.y, c.size, c.size);
}
