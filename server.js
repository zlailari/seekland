"use strict";

// Import external lib stuff and set up server
var express = require('express');
var app = express();

var PORT = 3000;

var server = app.listen(PORT);
var io = require('socket.io').listen(server);
console.log("Listening on port " + PORT);

var fs = require('fs');
var vm = require('vm');

// Constants
var updateRate = 30; // in ms
// const screenWidth = 800;
// const screenHeight = 600;

var lastTime = Date.now();

var allPeople = {};

var includeInThisContext = function(path) {
    var code = fs.readFileSync(path);
    vm.runInThisContext(code, path);
}.bind(this);

includeInThisContext(__dirname+"/public/js/util.js");
includeInThisContext(__dirname+"/public/js/Person.js");
includeInThisContext(__dirname+"/public/js/Platform.js");
includeInThisContext(__dirname+"/public/js/Space.js");
includeInThisContext(__dirname+"/public/js/World.js");

app.use(express.static(__dirname + '/public'));

var myWorld = new World();

io.on('connection', function(socket) {
    // nice to know
    console.log('a user connected');

    socket.on('new person', function() {
        // store new cursor object in server array
        socket.emit('socket id', socket.id);
    });

    socket.on('connection established', function(newPerson) {
        allPeople[socket.id] = newPerson;
        allPeople[socket.id].owner = socket.id;
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
        delete allPeople[socket.id];
    });

    socket.on('requestPlatform', function(p) {
        var plat = new Platform(p.x, p.y, p.width, p.height, '#000000');
        myWorld.platforms.push(plat);
    });

    socket.on('requestSpace', function() {
        var available = [];
        for (var i = 0; i < myWorld.spaces.length; i++) {
            if (myWorld.spaces[i].ownerID == 0) {
                available.push(i);
            }
        }

        if (available.length) {
            var spot = Math.floor(Math.random()*available.length);
            var assignSpace = new Space(
                (spot * myWorld.spaceWidth) % (myWorld.width - myWorld.spaceWidth),
                (spot * myWorld.spaceHeight) % (myWorld.height - myWorld.spaceHeight),
                myWorld.spaceWidth, myWorld.spaceHeight, socket.id);
            myWorld.spaces[spot] = assignSpace;
            socket.emit('spaceResponse', assignSpace);
        } else {
            socket.emit('spaceResponse', false);
        }
    });

    socket.on('requestSpaceUpdate', function(data) {
        for (var s in myWorld.spaces) {
            if (myWorld.spaces[s].ownerID == socket.id) {
                myWorld.spaces[s].title = data.title;
                myWorld.spaces[s].content = data.content;
                myWorld.spaces[s].link = data.link;
                myWorld.spaces[s].color = data.color;
            }
        }
    });

    socket.on('keydown', function(input) {
        var msg = JSON.parse(input)
        var code = msg.body.keyCode;
        var type = msg.body.pressType;

        switch(code) {
            // left or a
            case 37:
            case 65:
                if (type == 'd') {
                    allPeople[socket.id].left = true;
                } else if (type == 'u') {
                    allPeople[socket.id].left = false;
                }
                break;
            // up or w
            case 38:
            case 87:
                if (type == 'd') {
                    allPeople[socket.id].up = true;
                } else if (type == 'u') {
                    allPeople[socket.id].up = false;
                }
                break;
            // right or d
            case 39:
            case 68:
                if (type == 'd') {
                    allPeople[socket.id].right = true;
                } else if (type == 'u') {
                    allPeople[socket.id].right = false;
                }
                break;
            // down or s
            case 40:
            case 83:
                break;
        }
    });

});

function update() {
    var currentTime = Date.now();

    // caculate time since last update
    var deltaTime = (currentTime - lastTime)/1000;
    lastTime = currentTime;

    updatePositions();

    io.emit('server update', allPeople, myWorld.platforms, myWorld.spaces);
}

function updatePositions() {
    for (var person in allPeople) {
        updatePerson(allPeople[person], myWorld);
    }
}


setInterval(update, updateRate);


