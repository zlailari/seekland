
var defaultWidth = 3000;
var defaultHeight = 2000;

var tempPlatforms = [];
for (var i = 0; i < 40; i++) {

    var plat = new Platform(Math.random() * defaultWidth,
                            Math.random() * defaultHeight,
                            Math.random() * 400,
                            Math.random() * 400,
                            getRandomColor());
    tempPlatforms.push(plat);
}

var tempSpaces = [];

var World = function (width, height, platforms, spaces) {
    this.width = width || defaultWidth;
    this.height = height || defaultHeight;

    this.offsetX = 0;
    this.offsetY = 0;

    this.platforms = platforms || tempPlatforms;

    this.spaceWidth = 1200;
    this.spaceHeight = 800;
    if (spaces) {
        this.spaces = spaces;
    } else {
        this.spaces = [];
        for (var i = 0; i < Math.floor(this.width/this.spaceWidth); i++) {
            var s = new Space(this.spaceWidth * i, this.spaceHeight * i,
                this.spaceWidth, this.spaceHeight, 0);
            this.spaces.push(s);
        }
    }

    this.allCoins = [];
    this.allCoins.push(generateRandomCoin(this));
}

function generateRandomCoin(world) {
    return new Coin(
        Math.random() * world.width - 100,
        Math.random() * world.height - 100
    );
}

