var isDown = false;
var mStart, mEnd;
var builderRect;

function setupBuilder() {
    can.addEventListener("mousedown", function(e) {
        isDown = true;
        mStart = e;
    });
    can.addEventListener("mouseup", function(e) {
        isDown = false;
        if (builderRect) {
            socket.emit('requestPlatform', builderRect);
        }
    });
    can.addEventListener("mousemove", function(e) {
        eEnd = e;
        if (isDown) {
            potentialPlatform(mStart, e);
        }
    });
}

function potentialPlatform(start, end) {
    if (start.pageX > end.pageX) {
        builderRect = {
            x: end.pageX + myWorld.offsetX,
            y: end.pageY + myWorld.offsetY,
            width: (start.pageX + myWorld.offsetX) - (end.pageX + myWorld.offsetX),
            height: (start.pageY + myWorld.offsetY) - (end.pageY + myWorld.offsetY)
        };
    } else {
        builderRect = {
            x: start.pageX + myWorld.offsetX,
            y: start.pageY + myWorld.offsetY,
            width: (end.pageX + myWorld.offsetX)- (start.pageX  + myWorld.offsetX),
            height: (end.pageY + myWorld.offsetY) - (start.pageY + myWorld.offsetY)
        };
    }
}
