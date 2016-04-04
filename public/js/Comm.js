
if (!socket) {
    console.log("Socket not defined");
}

socket.on('socket id', function(id) {
    myPerson.id = id;

    socket.emit('connection established', myPerson);
});

socket.on('server update', function(updatePeople) {
    if (myPerson.id && updatePeople[myPerson.id]) {
        allPeople = updatePeople;

        myPerson = allPeople[myPerson.id];
    }
});


