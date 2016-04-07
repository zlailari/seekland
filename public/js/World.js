
var defaultWidth = 3000;
var defaultHeight = 2000;

var tempPlatforms = [];
for (var i = 0; i < 100; i++) {

    var plat = new Platform(Math.random() * defaultWidth,
                            Math.random() * defaultHeight,
                            Math.random() * 400,
                            Math.random() * 400);
    tempPlatforms.push(plat);
}

var World = function (width, height, platforms) {
    this.width = width || defaultWidth;
    this.height = height || defaultHeight;

    this.offsetX = 0;
    this.offsetY = 0;

    this.platforms = platforms || tempPlatforms;
}
