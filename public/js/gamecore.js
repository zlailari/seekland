var socket = io();

var canvas, ctx;
var canW, canH;

// frequency of update call
var updateFreq = 50;

var myPerson = new Person();
var allPeople = {};

var myWorld = new World();
var scrollBoundsX, scrollBoundsY;

function init() {
    can = document.getElementById("gamecanvas");

    var canW = $(window).width() > myWorld.width ? myWorld.width : $(window).width();
    var canH = $(window).height() > myWorld.height ? myWorld.height: $(window).height();

    can.width = canW;
    can.height = canH;

    scrollBoundsX = canW / 2;
    scrollBoundsY = canH / 2;

    ctx = can.getContext('2d');

    if (!ctx) {
        console.log("Error, couldn't make context");
    }

    socket.emit('new person', myPerson);
    setInterval(run, updateFreq);
}

function run() {
    render();
}

function render() {
    ctx.save();

    // Horizontal side scroll
    if (myPerson.x < scrollBoundsX) {
        myWorld.offsetX = 0;
    } else if (myPerson.x > myWorld.width - scrollBoundsX) {
        myWorld.offsetX = myWorld.width - 2 * scrollBoundsX;
    } else {
        myWorld.offsetX = myPerson.x - scrollBoundsX;
    }

    // Vertical side scroll
    if (myPerson.y < scrollBoundsY) {
        myWorld.offsetY = 0;
    } else if (myPerson.y > myWorld.height - scrollBoundsY) {
        myWorld.offsetY = myWorld.height - 2 * scrollBoundsY;
    } else {
        myWorld.offsetY = myPerson.y - scrollBoundsY;
    }


    ctx.translate(-myWorld.offsetX, -myWorld.offsetY);

    ctx.clearRect(0, 0, can.width, can.height);

    // Check if sidescrolling working
    var grd = ctx.createLinearGradient(0,0,myWorld.width,myWorld.height);
    grd.addColorStop(0,"black");
    grd.addColorStop(1,"white");
    ctx.fillStyle=grd;
    ctx.fillRect(0,0, myWorld.width, myWorld.height);

    renderPeople();
    renderPlatform();

    ctx.restore();
}

function renderPlatform() {
    for (var plat in myWorld.platforms) {
        drawPlatform(ctx, myWorld.platforms[plat]);
    }
}

function renderPeople() {
    for (var person in allPeople) {
        drawPerson(ctx, allPeople[person]);
    }
}

$(document).bind('keydown', function(e) {
    var code = e.keyCode || e.which;

    // Just send key input to server
    var message = JSON.stringify({
        'event': 'input',
        'body': {
            'pressType': 'd',
            'keyCode': code}
        }
    );
    socket.emit('keydown', message);
});

$(document).bind('keyup', function(e) {
    var code = e.keyCode || e.which;

    // Just send key input to server (formatted above)
    var message = JSON.stringify({'event': 'input', 'body': {'pressType': 'u', 'keyCode': code}});
    socket.emit('keydown', message);
});

init();
