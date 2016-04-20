

var Space = function (x, y, width, height, ownerID) {
    this.x = x;
    this.y = y;

    this.width = width;
    this.height = height;

    // 0 means it has not owner, otherwise had playerID
    this.ownerID = ownerID || 0;

    // Player defined stuff
    this.color = "#000000";

    this.text = "This is my space";

    this.link = "http://stick.gg/";
};
