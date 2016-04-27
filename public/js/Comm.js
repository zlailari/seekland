
if (!socket) {
    console.log("Socket not defined");
}

socket.on('socket id', function(id) {
    myPerson.id = id;

    socket.emit('connection established', myPerson);
});

socket.on('server update',
    function(updatePeople, updatePlatforms, updateSpaces, updateCoins) {
        if (myPerson.id && updatePeople[myPerson.id]) {
            allPeople = updatePeople;

            myPerson = allPeople[myPerson.id];
        }

        myWorld.spaces = updateSpaces;
        myWorld.platforms = updatePlatforms;
        myWorld.allCoins = updateCoins;
    }
);

socket.on('spaceResponse', function(space, spot) {
    if (space) {
        mySpace = space;
        mySpace.spot = spot;
        editSpace(spot);
    }
});

function requestSpace() {
    socket.emit("requestSpace");
}

function sendSpaceUpdate(data) {
    socket.emit("requestSpaceUpdate", data);
}
