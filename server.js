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

    io.emit('server update', allPeople, myWorld.platforms);
}

function updatePositions() {
    for (var person in allPeople) {
        updatePerson(allPeople[person], myWorld);
    }
}


setInterval(update, updateRate);


