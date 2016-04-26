

var Space = function (x, y, width, height, ownerID) {
    this.x = x;
    this.y = y;

    this.width = width;
    this.height = height;

    // 0 means it has not owner, otherwise had playerID
    this.ownerID = ownerID || 0;

    // Player defined stuff
    this.color = "#000000";
    this.title = "Title!";
    this.content = "This is my space";

    this.link = "http://stick.gg/";
};

function drawSpace(space) {
    if (space.ownerID !== 0) {
        ctx.strokeStyle = space.color;
        ctx.strokeRect(space.x, space.y, space.width, space.height);

        ctx.fillText(space.title, space.x, space.y, space.width);
        ctx.fillText(space.content, space.x, space.y + 50, space.width);
    }
}
