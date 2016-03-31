var socket = io();

var canvas, ctx;
var canW, canH;

// frequency of update call
var updateFreq = 50;

var myPerson = new Person();
var allPeople = {};

function init() {
    can = document.getElementById("gamecanvas");
    can.width = $(window).width();
    can.height = $(window).height();
    canW = can.width;
    canH = can.height;

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
    ctx.clearRect(0, 0, can.width, can.height);
    renderPeople();
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
